"""Proxy for geocoding addresses and places via OpenStreetMap Nominatim.

Nominatim's usage policy asks that browser apps not hit the public server
directly. Proxying through this endpoint lets us set a proper User-Agent,
keep results scoped to Vienna, and cache responses to stay within the
service's rate limits.
"""
import hashlib
import time

import requests
from django.http import JsonResponse
from django.views.decorators.http import require_GET

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

# Identify the app as required by the Nominatim usage policy.
USER_AGENT = "mapofvienna/1.0 (https://mapofvienna.com; admin@mapofvienna.com)"

# Vienna-area bounding box as `left,top,right,bottom` (lng,lat,lng,lat).
VIEWBOX = "16.00,48.40,16.75,48.05"

_CACHE_TTL_SECONDS = 60 * 60  # 1 hour
_cache: dict[str, dict] = {}


def _nominatim_search(query: str) -> list[dict]:
    params = {
        "q": query,
        "format": "json",
        "limit": 6,
        "addressdetails": 0,
        "viewbox": VIEWBOX,
        "bounded": 1,
    }
    headers = {
        "User-Agent": USER_AGENT,
        "Accept-Language": "en",
    }
    response = requests.get(NOMINATIM_URL, params=params, headers=headers, timeout=8)
    response.raise_for_status()

    results = []
    for item in response.json():
        try:
            lat = float(item["lat"])
            lng = float(item["lon"])
        except (KeyError, TypeError, ValueError):
            continue
        results.append({
            "name": item.get("name") or query,
            "label": item.get("display_name") or query,
            "lat": lat,
            "lng": lng,
            "type": item.get("type", ""),
            "category": item.get("category", ""),
        })
    return results


def _cached_geocode(query: str) -> list[dict]:
    key = hashlib.sha256(query.encode("utf-8")).hexdigest()
    now = time.time()
    hit = _cache.get(key)
    if hit and now - hit["ts"] < _CACHE_TTL_SECONDS:
        return hit["results"]

    results = _nominatim_search(query)
    _cache[key] = {"ts": now, "results": results}
    return results


@require_GET
def geocode_view(request):
    query = (request.GET.get("q") or "").strip()
    if not query:
        return JsonResponse({"error": "q is required"}, status=400)
    if len(query) > 200:
        return JsonResponse({"error": "query too long"}, status=400)

    try:
        results = _cached_geocode(query)
    except requests.RequestException:
        return JsonResponse({"error": "geocoding service unavailable"}, status=502)

    return JsonResponse({"results": results})
