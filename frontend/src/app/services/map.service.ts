import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapStateService } from './map-state.service';
import { locationKeyFor } from './comment.service';
import type { LocationSelection, LocationMarker } from './comment.service';
import { environment } from '../../environments/environment';
import { MAP_OF_VIENNA_MAP_API_KEY } from '../../generated/map-api-key';
import * as L from 'leaflet';
import {
  LINE_STYLES, LINE_ROUTES, TRAM_CORRIDORS, MAIN_ROUTES,
  FOOD_SCENE, FOOD_DENSITY, COST_STYLE, SAFETY_DATA, SAFETY_LEVELS, SAFETY_SPOTS,
  DISTRICT_PALETTE
} from './transport-data';

const BASE_VIEW = { lat: 48.2082, lng: 16.3738, zoom: 11 };
const LABEL_PANE = 'districtLabelsPane';
const BADGE_PANE = 'districtBadgesPane';
const COMMENT_PANE = 'districtCommentsPane';

const AIRPORT_STATION = {
  id: 'vienna-airport', name: 'Vienna International Airport',
  lat: 48.1103, lng: 16.5697, districtId: 11,
  lines: ['S7', 'CAT'], modes: ['sbahn', 'rail'], importance: 5, specialKind: 'airport'
};
const HBF_TOKENS = ['wien hauptbahnhof', 'hauptbahnhof', 'wien hbf'];
const HBF_LINES = ['U1', 'S1', 'S2', 'S3', 'S4', 'S80', 'D', 'O', '18'];

function esc(v: string): string {
  return String(v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function normalizeText(v: string): string {
  return String(v || '').toLowerCase().replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeLineToken(v: string): string {
  return String(v || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function colorForId(id: number): string {
  return DISTRICT_PALETTE[(id - 1) % DISTRICT_PALETTE.length];
}

function centroidFor(geometry: any): { lat: number; lng: number } {
  let outerRing: number[][] | null = null;

  if (geometry.type === 'Polygon') {
    outerRing = geometry.coordinates[0];
  } else if (geometry.type === 'MultiPolygon') {
    let bestArea = 0;
    geometry.coordinates.forEach((poly: number[][][]) => {
      const a = Math.abs(ringArea(poly[0]));
      if (a > bestArea) { bestArea = a; outerRing = poly[0]; }
    });
  }

  if (!outerRing || outerRing.length < 3) return { lat: BASE_VIEW.lat, lng: BASE_VIEW.lng };

  const area = ringArea(outerRing);
  if (Math.abs(area) < 1e-12) return { lat: outerRing[0][1], lng: outerRing[0][0] };

  let cx = 0; let cy = 0;
  for (let i = 0; i < outerRing.length - 1; i++) {
    const x0 = outerRing[i][0]; const y0 = outerRing[i][1];
    const x1 = outerRing[i + 1][0]; const y1 = outerRing[i + 1][1];
    const cross = x0 * y1 - x1 * y0;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  const f = 1 / (6 * area);
  return { lat: cy * f, lng: cx * f };
}

function ringArea(ring: number[][]): number {
  let a = 0;
  for (let i = 0; i < ring.length-1; i++) {
    a += ring[i][0]*ring[i+1][1] - ring[i+1][0]*ring[i][1];
  }
  return a/2;
}

function createAutoDivIcon(className: string, html: string): L.DivIcon {
  return L.divIcon({ className, html, iconSize: [0, 0], iconAnchor: [0, 0] });
}

@Injectable({ providedIn: 'root' })
export class MapService {
  /** Flips to true once GeoJSON data is loaded and all Leaflet layers are ready. */
  readonly mapReady = signal(false);

  private map: any;
  private canvasRenderer: any;
  private districtLayerById = new Map<number, any>();
  private districtLayer: any;
  private dataset: any[] = [];
  private districtById = new Map<number, any>();
  private districtConnections = new Map<number, Map<number, { rawModes: Set<string> }>>();
  private stations: any[] = [];
  private bubbleStackRegistry = new Map<number, number>();
  private hoverDistrictId: number | null = null;
  private resizeTimer: any;

  // Layers
  private labelLayer: any;
  private keywordLayer: any;
  private landmarkLayer: any;
  private costIndicatorLayer: any;
  private costLayer: any;
  private stationLayer: any;
  private connectionLineLayer: any;
  private hubConnectionLayer: any;
  private ubahnLayer: any;
  private sbahnLayer: any;
  private tramLayer: any;
  private mainRoadsLayer: any;
  private safetySpotLayer: any;
  private commentCountLayer: any;
  private searchMarkerLayer: any;
  private locationCommentMarkerLayer: any;

  /** Total comment count per district id. */
  readonly commentCounts = signal<Map<number, number>>(new Map());

  /** Comment markers for searched (non-district) locations. */
  readonly locationCommentMarkers = signal<LocationMarker[]>([]);

  private onDistrictClickCb: ((id: number, ctrl?: boolean) => void) | null = null;
  private onHubClickCb: ((station: any) => void) | null = null;
  private onSearchLocationClickCb: ((location: LocationSelection) => void) | null = null;

  constructor(private http: HttpClient, private mapState: MapStateService) {}

  async initializeMap(el: HTMLElement): Promise<void> {
    if (this.map) return;

    this.map = L.map(el, {
      preferCanvas: true, zoomControl: false, minZoom: 10, maxZoom: 15, attributionControl: false
    });
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    // Create overlay panes
    for (const name of [LABEL_PANE, BADGE_PANE, COMMENT_PANE]) {
      if (!this.map.getPane(name)) this.map.createPane(name);
    }
    (this.map.getPane(LABEL_PANE) as HTMLElement).style.zIndex = '650';
    (this.map.getPane(BADGE_PANE) as HTMLElement).style.zIndex = '640';
    (this.map.getPane(COMMENT_PANE) as HTMLElement).style.zIndex = '660';

    const mapApiKey = MAP_OF_VIENNA_MAP_API_KEY;
    const keyParam = mapApiKey ? `?key=${encodeURIComponent(mapApiKey)}` : '';
    const tileUrl = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png${keyParam}`;
    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 20
    }).addTo(this.map);

    this.canvasRenderer = L.canvas({ padding: 0.2 });

    // Layer groups (order = z-index)
    this.safetySpotLayer = L.layerGroup().addTo(this.map);
    this.mainRoadsLayer = L.layerGroup().addTo(this.map);
    this.ubahnLayer = L.layerGroup().addTo(this.map);
    this.sbahnLayer = L.layerGroup().addTo(this.map);
    this.tramLayer = L.layerGroup().addTo(this.map);
    this.connectionLineLayer = L.layerGroup().addTo(this.map);
    this.hubConnectionLayer = L.layerGroup().addTo(this.map);
    this.costLayer = L.layerGroup().addTo(this.map);
    this.landmarkLayer = L.layerGroup().addTo(this.map);
    this.stationLayer = L.layerGroup().addTo(this.map);
    this.costIndicatorLayer = L.layerGroup().addTo(this.map);
    this.keywordLayer = L.layerGroup().addTo(this.map);
    this.labelLayer = L.layerGroup().addTo(this.map);
    this.commentCountLayer = L.layerGroup().addTo(this.map);
    this.searchMarkerLayer = L.layerGroup().addTo(this.map);
    this.locationCommentMarkerLayer = L.layerGroup().addTo(this.map);

    // ESC handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.mapState.clearSelection();
        this.mapState.clearHubSelection();
      }
    });

    // Resize handling
    let viewInitialized = false;
    const ro = new ResizeObserver(() => {
      if (!this.map) return;
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        if (!viewInitialized) {
          viewInitialized = true;
          this.fitDistrictBounds();
        } else {
          this.map.invalidateSize({ animate: false });
        }
      }
    });
    ro.observe(el);
    window.addEventListener('resize', () => this.invalidateSize());

    // Load data
    try {
      const response: any = await this.http.get<any>('/assets/data.json').toPromise();
      if (response?.features) {
        this.dataset = response.features;
        this.prepareData();
        this.renderDistricts();
        if (!viewInitialized) { viewInitialized = true; this.fitDistrictBounds(); }
        // Signal readiness — this triggers the component's effect() to call renderAll()
        // with all layers now initialized.
        this.mapReady.set(true);
      }
    } catch (e) { console.error('Failed to load data.json', e); }
  }

  private fitDistrictBounds(): void {
    if (this.map && this.districtLayer) {
      this.map.fitBounds(this.districtLayer.getBounds(), { padding: [24, 24] });
    } else if (this.map) {
      this.map.setView([BASE_VIEW.lat, BASE_VIEW.lng], BASE_VIEW.zoom);
    }
  }

  private prepareData(): void {
    this.dataset.forEach(f => {
      const id = Number(f.properties?.id);
      if (!Number.isFinite(id)) return;
      f.properties._districtId = id;
      f.properties._centroid = centroidFor(f.geometry);
      f.properties._color = colorForId(id);
      f.properties._searchBlob = this.buildSearchBlob(f.properties);
      this.districtById.set(id, f);
      this.districtConnections.set(id, new Map());
    });
    this.buildConnectionIndex();
    this.collectStations();
  }

  private buildSearchBlob(props: any): string {
    const bits: string[] = [
      String(props.id||''), String(props.name||''), String(props.name_de||''),
      String(props.costOfLiving?.tier||''), String(props.costOfLiving?.description||'')
    ];
    (props.keywords||[]).forEach((k: string) => bits.push(k));
    (props.landmarks||[]).forEach((l: any) => bits.push(l.name||''));
    (props.majorStations||[]).forEach((s: any) => bits.push(s.name||''));
    (props.directConnections||[]).forEach((c: any) => {
      bits.push(String(c.districtId||''));
      (c.modes||[]).forEach((m: string) => bits.push(m));
    });
    const t = props.transport||{};
    ['ubahn','sbahn','tram','bus'].forEach(k => (t[k]||[]).forEach((l: string) => bits.push(l)));
    return bits.join(' ').toLowerCase();
  }

  private buildConnectionIndex(): void {
    // Shared transit lines between districts
    for (let ai = 0; ai < this.dataset.length; ai++) {
      const fa = this.dataset[ai];
      const ida = fa.properties._districtId;
      for (let bi = ai+1; bi < this.dataset.length; bi++) {
        const fb = this.dataset[bi];
        const idb = fb.properties._districtId;
        const shared = this.getSharedLines(fa, fb);
        if (shared.length) this.addConnection(ida, idb, shared);
      }
      // Explicit directConnections
      (fa.properties.directConnections||[]).forEach((conn: any) => {
        const toId = Number(conn.districtId);
        if (this.districtById.has(toId)) {
          this.addConnection(ida, toId, (conn.modes||[]).map(String));
        }
      });
    }
  }

  private getSharedLines(a: any, b: any): string[] {
    const shared: string[] = [];
    const ta = a.properties?.transport||{};
    const tb = b.properties?.transport||{};
    ['ubahn','sbahn','tram','bus'].forEach(mode => {
      const al: string[] = ta[mode]||[];
      const bl: string[] = tb[mode]||[];
      const bSet = new Set(bl.map(normalizeLineToken));
      al.forEach(line => { if (bSet.has(normalizeLineToken(line))) shared.push(line); });
    });
    return [...new Set(shared)];
  }

  private addConnection(from: number, to: number, modes: string[]): void {
    if (!this.districtConnections.has(from)) this.districtConnections.set(from, new Map());
    if (!this.districtConnections.has(to)) this.districtConnections.set(to, new Map());
    const fm = this.districtConnections.get(from)!;
    if (!fm.has(to)) fm.set(to, { rawModes: new Set() });
    modes.forEach(m => fm.get(to)!.rawModes.add(m));
    const tm = this.districtConnections.get(to)!;
    if (!tm.has(from)) tm.set(from, { rawModes: new Set() });
    modes.forEach(m => tm.get(from)!.rawModes.add(m));
  }

  private collectStations(): void {
    const byKey = new Map<string, any>();
    const majorHubs = new Set(['wien hauptbahnhof','hauptbahnhof','wien meidling','wien mitte','wien westbahnhof','wien praterstern','wien floridsdorf']);
    this.dataset.forEach(f => {
      const districtId = f.properties._districtId;
      (f.properties.majorStations||[]).forEach((s: any) => {
        const name = String(s.name||'').trim();
        if (!name) return;
        const key = normalizeText(name);
        const lines: string[] = (s.lines||[]).map(String);
        const isMajor = majorHubs.has(key);
        const importance = isMajor ? 5 : Math.min(5, Math.max(1, Math.ceil(lines.length/2)));
        if (!byKey.has(key)) {
          byKey.set(key, { id: key.replace(/\s+/g,'-'), name, lat: Number(s.lat), lng: Number(s.lng),
            districtId, lines: new Set(lines), importance,
            specialKind: HBF_TOKENS.some(t => key.includes(t)) ? 'hbf' : undefined });
        } else {
          const ex = byKey.get(key)!;
          lines.forEach(l => ex.lines.add(l));
          ex.importance = Math.max(ex.importance, importance);
        }
      });
    });
    this.stations = Array.from(byKey.values())
      .filter(s => Number.isFinite(s.lat) && Number.isFinite(s.lng))
      .map(s => ({ ...s, lines: Array.from(s.lines) }));
    this.stations.forEach(s => {
      if (s.specialKind === 'hbf') {
        s.lines = Array.from(new Set([...s.lines, ...HBF_LINES]));
      }
    });
    if (!this.stations.some(s => normalizeText(s.name) === normalizeText(AIRPORT_STATION.name))) {
      this.stations.push({ ...AIRPORT_STATION });
    }
  }

  // ---- District rendering ----

  private renderDistricts(): void {
    this.districtLayer = (L.geoJSON as any)({ type: 'FeatureCollection', features: this.dataset }, {
      renderer: this.canvasRenderer,
      style: (f: any) => this.districtStyle(f),
      onEachFeature: (f: any, layer: any) => {
        const id = f.properties._districtId;
        this.districtLayerById.set(id, layer);
        layer.bindTooltip(`${id}. ${esc(f.properties.name||'')}`, { className: 'station-tooltip', direction: 'top', sticky: true });
        layer.on('click', (e: any) => {
          if (this.onDistrictClickCb) this.onDistrictClickCb(id, e.originalEvent?.ctrlKey || e.originalEvent?.metaKey);
        });
        layer.on('mouseover', () => { this.hoverDistrictId = id; this.refreshDistrictStyles(); });
        layer.on('mouseout', () => { this.hoverDistrictId = null; this.refreshDistrictStyles(); });
      }
    }).addTo(this.map);
  }

  private districtStyle(f: any): any {
    const id = f.properties._districtId;
    const sel = this.mapState.selectedDistrictId();
    const cmp = this.mapState.comparisonDistrictIds();
    const showColors = this.mapState.showDistrictColors();
    const showFill = this.mapState.showDistrictFill();
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();

    const isSelected = sel === id || cmp.has(id);
    const connectedIds = sel ? this.getConnectedIds(sel) : new Set<number>();
    const isConnected = sel && sel !== id && !cmp.has(id) && connectedIds.has(id);
    const isMatch = !hasFilters || matchSet.has(id);
    const isHovered = this.hoverDistrictId === id;

    // Determine fill color
    let fillColor: string;
    const showSafety = this.mapState.showSafety();
    const showFood = this.mapState.showFood();
    if (showSafety) {
      const safety = SAFETY_DATA[id];
      fillColor = safety ? (SAFETY_LEVELS[safety.level]?.color || f.properties._color) : f.properties._color;
    } else if (showFood) {
      const scene = FOOD_SCENE[id];
      fillColor = scene ? (FOOD_DENSITY[scene.cafeDensity]?.color || f.properties._color) : f.properties._color;
    } else if (showColors) {
      fillColor = f.properties._color;
    } else {
      fillColor = '#c8bfb0';
    }

    let fillOpacity = showFill ? 0.65 : 0;
    let color = '#39342e';
    let weight = 1.5;
    let opacity = 1;

    if (isSelected) {
      fillOpacity = showFill ? 0.88 : 0.15;
      weight = 3;
      color = '#2d2a26';
    } else if (isConnected) {
      fillOpacity = showFill ? 0.55 : 0.2;
      weight = 2;
    } else if (sel !== null && !hasFilters) {
      fillOpacity = showFill ? 0.25 : 0;
      opacity = 0.4;
    } else if (hasFilters && !isMatch) {
      fillOpacity = showFill ? 0.2 : 0;
      opacity = 0.35;
    }

    if (isHovered) { weight = Math.max(weight, 2.5); }

    return { fillColor, fillOpacity, color, weight, opacity };
  }

  private refreshDistrictStyles(): void {
    this.districtLayerById.forEach((layer, id) => {
      const f = this.districtById.get(id);
      if (f) layer.setStyle(this.districtStyle(f));
    });
  }

  // ---- Full render ----

  renderAll(): void {
    this.bubbleStackRegistry.clear();
    this.refreshDistrictStyles();
    this.updateTooltipMode();
    this.renderLabels();
    this.renderKeywords();
    this.renderLandmarks();
    this.renderCostIndicators();
    this.renderCostBadges();
    this.renderStations();
    this.renderConnectionLines();
    this.renderHubConnections();
    this.renderUbahnLines();
    this.renderSbahnLines();
    this.renderTramLines();
    this.renderMainRoads();
    this.renderSafetySpots();
    this.renderCommentCounts();
    this.renderLocationCommentMarkers();
  }

  private updateTooltipMode(): void {
    const showSafety = this.mapState.showSafety();
    const showFood = this.mapState.showFood();
    this.districtLayerById.forEach((layer) => {
      layer.unbindTooltip();
      const f = layer.feature;
      if (!f) return;
      const id = f.properties._districtId;
      if (showSafety) {
        layer.bindTooltip(this.buildSafetyTooltip(f), { className: 'safety-tooltip', direction: 'top', sticky: true });
      } else if (showFood) {
        layer.bindTooltip(this.buildFoodTooltip(f), { className: 'food-tooltip', direction: 'top', sticky: true });
      } else {
        layer.bindTooltip(`${id}. ${esc(f.properties.name||'')}`, { className: 'station-tooltip', direction: 'top', sticky: true });
      }
    });
  }

  private buildSafetyTooltip(f: any): string {
    const id = f.properties._districtId;
    const safety = SAFETY_DATA[id];
    if (!safety) return `${id}. ${esc(f.properties.name||'')}`;
    const level = SAFETY_LEVELS[safety.level] || SAFETY_LEVELS['moderate'];
    return `<div class="safety-tooltip-title">${id}. ${esc(f.properties.name)}</div>` +
      `<div class="safety-tooltip-level" style="background:${level.color}">${esc(level.label)}</div>` +
      `<div class="safety-tooltip-text">${esc(safety.text)}</div>`;
  }

  private buildFoodTooltip(f: any): string {
    const id = f.properties._districtId;
    const scene = FOOD_SCENE[id];
    if (!scene) return `${id}. ${esc(f.properties.name||'')}`;
    const density = FOOD_DENSITY[scene.cafeDensity] || FOOD_DENSITY['medium'];
    const tags = (scene.cuisines||[]).map(c => `<span class="food-tooltip-tag">${esc(c)}</span>`).join('');
    return `<div class="food-tooltip-title">${id}. ${esc(f.properties.name)}</div>` +
      `<div class="food-tooltip-type" style="background:${density.color}">${esc(density.label)}</div>` +
      `<div class="food-tooltip-tags">${tags}</div>` +
      `<div class="food-tooltip-text">${esc(scene.text)}</div>`;
  }

  // ---- Labels ----

  private renderLabels(): void {
    this.labelLayer.clearLayers();
    const showName = this.mapState.showDistrictLabels();
    const showNum = this.mapState.showDistrictNumbers();
    if (!showName && !showNum) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();

    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      const c = f.properties._centroid;
      if (!c) return;
      let text = '';
      if (showName && showNum) text = `${id}. ${f.properties.name}`;
      else if (showName) text = f.properties.name;
      else text = String(id);
      const isDim = hasFilters && !matchSet.has(id);
      const marker = L.marker([c.lat, c.lng], {
        keyboard: false, interactive: false, pane: LABEL_PANE,
        icon: createAutoDivIcon(`district-label${isDim?' dim':''}`, `<span class="district-label-inner">${esc(text)}</span>`)
      });
      this.labelLayer.addLayer(marker);
    });
  }

  // ---- Keywords ----

  private renderKeywords(): void {
    this.keywordLayer.clearLayers();
    if (!this.mapState.showKeywords()) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();
    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      if (hasFilters && !matchSet.has(id)) return;
      const kw = (f.properties.keywords||[]).slice(0,3);
      if (!kw.length) return;
      const c = f.properties._centroid;
      if (!c) return;
      const marker = L.marker([c.lat, c.lng], {
        keyboard: false, interactive: false, pane: BADGE_PANE,
        icon: this.createStackedBadgeIcon(id, 'district-badge', esc(kw.join(' \u2022 ')), 'keyword')
      });
      this.keywordLayer.addLayer(marker);
    });
  }

  // ---- Landmarks ----

  private renderLandmarks(): void {
    this.landmarkLayer.clearLayers();
    if (!this.mapState.showLandmarks()) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();
    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      if (hasFilters && !matchSet.has(id)) return;
      (f.properties.landmarks||[]).forEach((lm: any) => {
        if (!Number.isFinite(Number(lm.lat)) || !Number.isFinite(Number(lm.lng))) return;
        const marker = L.circleMarker([Number(lm.lat), Number(lm.lng)], {
          renderer: this.canvasRenderer, radius: 4.5,
          color: '#39342e', weight: 1, fillColor: '#f6df8a', fillOpacity: 1
        });
        marker.bindTooltip(`${esc(lm.name)}<br>${id}. ${esc(f.properties.name)}`, { direction: 'top' });
        this.landmarkLayer.addLayer(marker);
      });
    });
  }

  // ---- Cost indicators ----

  private renderCostIndicators(): void {
    this.costIndicatorLayer.clearLayers();
    if (!this.mapState.showCostIndicators()) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();
    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      if (hasFilters && !matchSet.has(id)) return;
      const cost = f.properties.costOfLiving;
      if (!cost) return;
      const c = f.properties._centroid;
      if (!c) return;
      const symbol = this.getCostSymbol(cost.tier);
      const marker = L.marker([c.lat, c.lng], {
        keyboard: false, interactive: false, pane: BADGE_PANE,
        icon: this.createStackedBadgeIcon(id, 'district-badge cost-indicator', esc(symbol), 'indicator')
      });
      this.costIndicatorLayer.addLayer(marker);
    });
  }

  private getCostSymbol(tier: string): string {
    const t = String(tier||'').toLowerCase();
    if (t === 'very_expensive') return '€€€€';
    if (t === 'expensive') return '€€€';
    if (t === 'moderate') return '€€';
    if (t === 'affordable') return '€';
    return '€€';
  }

  // ---- Cost badges ----

  private renderCostBadges(): void {
    this.costLayer.clearLayers();
    if (!this.mapState.showCost()) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();
    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      if (hasFilters && !matchSet.has(id)) return;
      const cost = f.properties.costOfLiving;
      if (!cost) return;
      const c = f.properties._centroid;
      if (!c) return;
      const label = this.buildCostLabel(cost);
      const html = `<div class="cost-pill-title">${esc(label.split(' - ')[0])}</div>` +
        `<div class="cost-pill-text">${esc(cost.description||'')}</div>`;
      const marker = L.marker([c.lat, c.lng], {
        keyboard: false, interactive: false, pane: BADGE_PANE,
        icon: this.createStackedBadgeIcon(id, 'district-badge cost', html, 'description')
      });
      this.costLayer.addLayer(marker);
    });
  }

  private buildCostLabel(cost: any): string {
    const symbols: Record<string,string> = { very_expensive:'€€€€', expensive:'€€€', moderate:'€€', affordable:'€' };
    const tier = String(cost.tier||'').toLowerCase();
    return `${symbols[tier]||'€€'} - ${cost.description||''}`;
  }

  // ---- Stations ----

  private renderStations(): void {
    this.stationLayer.clearLayers();
    if (!this.mapState.showStations()) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();

    this.stations.forEach(station => {
      if (!Number.isFinite(station.lat) || !Number.isFinite(station.lng)) return;
      if (hasFilters && !matchSet.has(station.districtId)) return;

      const linesText = station.lines?.length ? ` (${station.lines.join(', ')})` : '';
      const tooltipContent = `${esc(station.name)}${esc(linesText)}`;

      if (station.specialKind === 'hbf') {
        const marker = L.marker([station.lat, station.lng], {
          keyboard: false, interactive: true,
          icon: L.divIcon({
            className: 'station-icon station-hbf',
            html: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#a64e49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="20" r="1.5" fill="#a64e49" stroke="none"/><circle cx="16" cy="20" r="1.5" fill="#a64e49" stroke="none"/><path d="M8 17l-2 3"/><path d="M16 17l2 3"/></svg>',
            iconSize: [22, 22], iconAnchor: [11, 11]
          })
        });
        marker.bindTooltip(tooltipContent, { className: 'station-tooltip', direction: 'top' });
        marker.on('click', () => this.onHubClickCb?.(station));
        this.stationLayer.addLayer(marker);
        return;
      }

      if (station.specialKind === 'airport') {
        const marker = L.marker([station.lat, station.lng], {
          keyboard: false, interactive: true,
          icon: L.divIcon({
            className: 'station-icon station-airport',
            html: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#625785" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
            iconSize: [22, 22], iconAnchor: [11, 11]
          })
        });
        marker.bindTooltip(tooltipContent, { className: 'station-tooltip', direction: 'top' });
        marker.on('click', () => this.onHubClickCb?.(station));
        this.stationLayer.addLayer(marker);
        return;
      }

      const radius = 4 + station.importance * 0.8;
      const marker = L.circleMarker([station.lat, station.lng], {
        renderer: this.canvasRenderer, radius,
        color: '#39342e', weight: 1.3, fillColor: '#a8d2e8', fillOpacity: 1
      });
      marker.bindTooltip(tooltipContent, { className: 'station-tooltip', direction: 'top' });
      this.stationLayer.addLayer(marker);
    });
  }

  // ---- Connection lines ----

  private renderConnectionLines(): void {
    this.connectionLineLayer.clearLayers();
    if (!this.mapState.showDirectConnections()) return;
    const sel = this.mapState.selectedDistrictId();
    if (!sel) return;
    const selFeature = this.districtById.get(sel);
    if (!selFeature) return;
    const selCenter = selFeature.properties._centroid;
    const connections = this.districtConnections.get(sel);
    if (!connections) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();

    connections.forEach((data, toId) => {
      const toFeature = this.districtById.get(toId);
      if (!toFeature) return;
      if (hasFilters && !matchSet.has(toId)) return;
      const toCenter = toFeature.properties._centroid;
      const poly = L.polyline(
        [[selCenter.lat, selCenter.lng], [toCenter.lat, toCenter.lng]],
        { renderer: this.canvasRenderer, color: '#397b68', weight: 2.1, opacity: 0.86, dashArray: '8 5' }
      );
      const modes = Array.from(data.rawModes).join(', ');
      poly.bindTooltip(`${esc(String(toId)+'. '+toFeature.properties.name)}<br>${esc(modes)}`, { direction: 'center' });
      this.connectionLineLayer.addLayer(poly);
    });

    // Connect to special hubs sharing lines
    this.renderSpecialHubConnections(selFeature, selCenter);
  }

  private renderSpecialHubConnections(selFeature: any, selCenter: any): void {
    const districtLines = this.collectDistrictLineTokens(selFeature.properties.transport||{});
    if (!districtLines.size) return;

    this.stations.filter(s => s.specialKind === 'airport' || s.specialKind === 'hbf').forEach(station => {
      const stationTokens = (station.lines||[]).map(normalizeLineToken).filter(Boolean);
      const shared = stationTokens.filter((t: string) => districtLines.has(t));
      if (!shared.length) return;
      const style = station.specialKind === 'airport'
        ? { color: '#625785', dashArray: '2 8' }
        : { color: '#a64e49', dashArray: '12 6' };
      const line = L.polyline(
        [[selCenter.lat, selCenter.lng], [Number(station.lat), Number(station.lng)]],
        { renderer: this.canvasRenderer, color: style.color, weight: 2.9, opacity: 0.96, dashArray: style.dashArray }
      );
      line.bindTooltip(`${esc(station.name)}<br>${esc(shared.map((t: string) => t.toUpperCase()).join(', '))}`, { direction: 'center' });
      this.connectionLineLayer.addLayer(line);
    });
  }

  private collectDistrictLineTokens(transport: any): Set<string> {
    const tokens = new Set<string>();
    ['ubahn','sbahn','tram','bus'].forEach(mode => {
      ((transport[mode]||[]) as string[]).forEach(l => {
        const t = normalizeLineToken(l);
        if (t) tokens.add(t);
      });
    });
    return tokens;
  }

  // ---- Hub (Hauptbahnhof / Airport) connections ----

  private renderHubConnections(): void {
    this.hubConnectionLayer.clearLayers();
    const hubId = this.mapState.selectedHubId();
    if (!hubId) return;
    const station = this.stations.find(s => s.id === hubId);
    if (!station || (station.specialKind !== 'hbf' && station.specialKind !== 'airport')) return;

    const stationTokens = (station.lines || []).map(normalizeLineToken).filter(Boolean);
    if (!stationTokens.length) return;

    const style = station.specialKind === 'airport'
      ? { color: '#625785', dashArray: '2 8' }
      : { color: '#a64e49', dashArray: '12 6' };

    this.dataset.forEach(f => {
      const districtLines = this.collectDistrictLineTokens(f.properties.transport || {});
      const shared = stationTokens.filter((t: string) => districtLines.has(t));
      if (!shared.length) return;
      const c = f.properties._centroid;
      if (!c) return;
      const line = L.polyline(
        [[Number(station.lat), Number(station.lng)], [c.lat, c.lng]],
        { renderer: this.canvasRenderer, color: style.color, weight: 2.9, opacity: 0.96, dashArray: style.dashArray }
      );
      line.bindTooltip(
        `${esc(String(f.properties._districtId) + '. ' + f.properties.name)}<br>${esc(shared.map((t: string) => t.toUpperCase()).join(', '))}`,
        { direction: 'center' }
      );
      this.hubConnectionLayer.addLayer(line);
    });
  }

  // ---- Transit lines ----

  private renderUbahnLines(): void {
    this.ubahnLayer.clearLayers();
    if (!this.mapState.showUbahn()) return;
    Object.keys(LINE_ROUTES).forEach(name => {
      const style = LINE_STYLES[name];
      if (!style || style.mode !== 'ubahn') return;
      const coords = LINE_ROUTES[name];
      if (!coords || coords.length < 2) return;
      const poly = L.polyline(coords, { renderer: this.canvasRenderer, color: style.color, weight: 4.5, opacity: 0.92 });
      poly.bindTooltip(`<strong>${esc(name)}</strong>`, { className: 'line-tooltip', direction: 'top', sticky: true, offset: [0,-10] });
      this.ubahnLayer.addLayer(poly);
    });
  }

  private renderSbahnLines(): void {
    this.sbahnLayer.clearLayers();
    if (!this.mapState.showSbahn()) return;
    const sbahnLines = Object.keys(LINE_ROUTES).filter(n => LINE_STYLES[n]?.mode === 'sbahn').sort();
    const offset = 0.00035;
    const half = (sbahnLines.length - 1) / 2;
    sbahnLines.forEach((name, idx) => {
      const coords = LINE_ROUTES[name];
      if (!coords || coords.length < 2) return;
      const style = LINE_STYLES[name];
      const offsetLat = (idx - half) * offset;
      const offsetCoords = coords.map(pt => [pt[0]+offsetLat, pt[1]] as [number,number]);
      const poly = L.polyline(offsetCoords, { renderer: this.canvasRenderer, color: style.color, weight: 3, opacity: 0.88 });
      poly.bindTooltip(`<strong>${esc(name)}</strong>`, { className: 'line-tooltip', direction: 'top', sticky: true, offset: [0,-10] });
      this.sbahnLayer.addLayer(poly);
    });
  }

  private renderTramLines(): void {
    this.tramLayer.clearLayers();
    if (!this.mapState.showTram()) return;
    TRAM_CORRIDORS.forEach(corridor => {
      if (!corridor.coords || corridor.coords.length < 2) return;
      const poly = L.polyline(corridor.coords, { renderer: this.canvasRenderer, color: corridor.color, weight: 3, opacity: 0.88 });
      poly.bindTooltip(`<strong>Tram ${esc(corridor.label)}</strong>`, { className: 'line-tooltip', direction: 'top', sticky: true, offset: [0,-10] });
      this.tramLayer.addLayer(poly);
    });
  }

  private renderMainRoads(): void {
    this.mainRoadsLayer.clearLayers();
    if (!this.mapState.showMainRoads()) return;
    MAIN_ROUTES.forEach(road => {
      if (!road.coords || road.coords.length < 2) return;
      const poly = L.polyline(road.coords, { renderer: this.canvasRenderer, color: road.color, weight: road.weight||4, opacity: road.opacity||0.9 });
      poly.bindTooltip(`<strong>${esc(road.label)}</strong>`, { className: 'line-tooltip', direction: 'top', sticky: true, offset: [0,-10] });
      this.mainRoadsLayer.addLayer(poly);
    });
  }

  private renderSafetySpots(): void {
    this.safetySpotLayer.clearLayers();
    if (!this.mapState.showSafety()) return;
    const matchSet = this.computeMatchSet();
    const hasFilters = this.hasActiveFilters();
    SAFETY_SPOTS.forEach(spot => {
      if (hasFilters && !matchSet.has(spot.districtId)) return;
      const level = SAFETY_LEVELS[spot.level] || SAFETY_LEVELS['moderate'];
      const circle = L.circle([spot.lat, spot.lng], {
        renderer: this.canvasRenderer, radius: spot.radius||700,
        color: level.color, weight: 1.2, opacity: 0.9, fillColor: level.color, fillOpacity: 0.38
      });
      const district = this.districtById.get(spot.districtId);
      const dlabel = district ? `${spot.districtId}. ${district.properties.name}` : `District ${spot.districtId}`;
      circle.bindTooltip(
        `<div class="safety-tooltip-title">${esc(spot.name)}</div>` +
        `<div class="safety-tooltip-level" style="background:${level.color}">${esc(level.label)}</div>` +
        `<div class="safety-tooltip-text">${esc(spot.text)}</div>` +
        `<div class="safety-tooltip-district">${esc(dlabel)}</div>`,
        { className: 'safety-tooltip', direction: 'top', sticky: true }
      );
      this.safetySpotLayer.addLayer(circle);
    });
  }

  // ---- Comment counts ----

  private renderCommentCounts(): void {
    this.commentCountLayer.clearLayers();
    if (!this.mapState.showComments()) return;
    const counts = this.commentCounts();
    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      const c = f.properties._centroid;
      if (!c) return;
      const count = counts.get(id) || 0;
      const marker = L.marker([c.lat, c.lng], {
        keyboard: false, interactive: false, pane: COMMENT_PANE,
        icon: createAutoDivIcon('district-comment-count', this.buildCommentCountHtml(count))
      });
      this.commentCountLayer.addLayer(marker);
    });
  }

  private buildCommentCountHtml(count: number): string {
    const svg = '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
    return `<span class="district-comment-count-inner">${svg}<span class="district-comment-count-num">${count}</span></span>`;
  }

  // ---- Location comment markers (searched places with comments) ----

  private renderLocationCommentMarkers(): void {
    this.locationCommentMarkerLayer.clearLayers();
    if (!this.mapState.showComments()) return;
    this.locationCommentMarkers().forEach(m => {
      const location: LocationSelection = {
        key: m.location_key,
        type: m.location_type,
        name: m.location_name,
        lat: m.location_lat,
        lng: m.location_lng,
      };
      const marker = L.marker([m.location_lat, m.location_lng], {
        keyboard: false, interactive: true, pane: COMMENT_PANE, zIndexOffset: 500,
        icon: createAutoDivIcon('location-comment-count', this.buildLocationCommentCountHtml(m.count))
      });
      marker.on('click', () => this.onSearchLocationClickCb?.(location));
      const noun = m.count === 1 ? 'comment' : 'comments';
      marker.bindTooltip(`${esc(m.location_name)}<span class="pin-tip-hint"> · ${m.count} ${noun}</span>`, {
        className: 'station-tooltip', direction: 'top', offset: [0, -8]
      });
      this.locationCommentMarkerLayer.addLayer(marker);
    });
  }

  private buildLocationCommentCountHtml(count: number): string {
    const svg = '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
    return `<span class="location-comment-count-inner">${svg}<span class="location-comment-count-num">${count}</span></span>`;
  }

  // ---- Stacked badge icons (matching reference exactly) ----

  private createStackedBadgeIcon(districtId: number, className: string, html: string, stackRole: string): L.DivIcon {
    const roleBaseOffset: Record<string, number> = { indicator: 20, description: 44, keyword: 84 };
    const seq = this.bubbleStackRegistry.get(districtId) || 0;
    this.bubbleStackRegistry.set(districtId, seq + 6);
    const currentOffset = (roleBaseOffset[stackRole] || 36) + seq;
    return createAutoDivIcon(
      `${className} bubble-stack`,
      `<div class="bubble-stack-inner" style="--bubble-offset:${currentOffset}px">${html}</div>`
    );
  }

  // ---- Helpers ----

  private computeMatchSet(): Set<number> {
    const matches = new Set<number>();
    if (!this.hasActiveFilters()) {
      this.dataset.forEach(f => matches.add(f.properties._districtId));
      return matches;
    }
    const searchText = normalizeText(this.mapState.searchText());
    const costTiers = this.mapState.selectedCostTiers();
    const connectedTo = this.mapState.connectedToDistrictId();
    this.dataset.forEach(f => {
      const id = f.properties._districtId;
      if (searchText && !f.properties._searchBlob.includes(searchText)) return;
      if (costTiers.size > 0 && !costTiers.has(f.properties.costOfLiving?.tier)) return;
      if (connectedTo !== null && id !== connectedTo) {
        const conn = this.districtConnections.get(connectedTo);
        if (!conn || !conn.has(id)) return;
      }
      matches.add(id);
    });
    return matches;
  }

  private hasActiveFilters(): boolean {
    return Boolean(this.mapState.searchText() || this.mapState.selectedCostTiers().size > 0 || this.mapState.connectedToDistrictId() !== null);
  }

  private getConnectedIds(districtId: number): Set<number> {
    const result = new Set<number>();
    const conn = this.districtConnections.get(districtId);
    if (conn) conn.forEach((_, id) => result.add(id));
    return result;
  }

  // ---- District info HTML (for the panel) ----

  buildDistrictInfoHtml(districtId: number): string {
    if (!this.districtById.has(districtId)) {
      return '<p class="muted">Click a district to inspect full details and direct public transport connections.</p>';
    }
    const f = this.districtById.get(districtId)!;
    const props = f.properties;

    const kw = (props.keywords||[]).map((k: string) => `<span class="tag">${esc(k)}</span>`).join('');
    const landmarks = (props.landmarks||[]).map((l: any) => `<li>${esc(l.name)}</li>`).join('');
    const stations = (props.majorStations||[]).map((s: any) =>
      `<li>${esc(s.name)} <span class="mono">${esc((s.lines||[]).join(', '))}</span></li>`).join('');
    const t = props.transport||{};
    const transport = ['ubahn','sbahn','tram','bus'].map(mode => {
      const lines: string[] = t[mode]||[];
      return lines.length ? `<li><strong>${esc(mode.toUpperCase())}:</strong> ${esc(lines.join(', '))}</li>` : '';
    }).join('');

    const cost = props.costOfLiving||{};
    const costTier = COST_STYLE[cost.tier]?.label || cost.tier || 'Not listed';
    const website = props.website
      ? `<a href="${esc(props.website)}" target="_blank" rel="noreferrer noopener">District page</a>`
      : '';
    const safety = SAFETY_DATA[districtId];
    const safetyHtml = safety
      ? `<p><strong>Safety:</strong> ${esc((SAFETY_LEVELS[safety.level]||{}).label||'')} &mdash; ${esc(safety.text)}</p>` : '';
    const scene = FOOD_SCENE[districtId];
    const foodHtml = scene
      ? `<p><strong>Food scene:</strong> ${esc((FOOD_DENSITY[scene.cafeDensity]||{}).label||'')}. ${esc((scene.cuisines||[]).join(', '))} &mdash; ${esc(scene.text)}</p>` : '';

    const directConn = this.buildDirectConnectionHtml(districtId);

    return `<h3>${districtId}. ${esc(props.name||'')}</h3>
      <p class="muted">${website}</p>
      <p><strong>Cost:</strong> ${esc(costTier)} &mdash; ${esc(cost.description||'No description')}</p>
      ${safetyHtml}${foodHtml}
      <div class="tags">${kw||'<span class="muted">No keywords</span>'}</div>
      <p><strong>Landmarks</strong></p><ul>${landmarks||'<li>None listed</li>'}</ul>
      <p><strong>Major stations</strong></p><ul>${stations||'<li>None listed</li>'}</ul>
      <p><strong>District transport</strong></p><ul>${transport||'<li>None listed</li>'}</ul>
      <p><strong>Direct district connections</strong></p>${directConn}`;
  }

  private buildDirectConnectionHtml(districtId: number): string {
    const conn = this.districtConnections.get(districtId);
    if (!conn || !conn.size) return '<p class="muted">No direct connection data.</p>';
    const rows = Array.from(conn.entries()).sort((a,b)=>a[0]-b[0]).map(([toId, data]) => {
      const d = this.districtById.get(toId);
      const name = d ? d.properties.name : `District ${toId}`;
      const modes = Array.from(data.rawModes).join(', ');
      return `<div class="connection-item"><strong>${toId}. ${esc(name)}</strong> &mdash; ${esc(modes)}</div>`;
    }).join('');
    return `<div>${rows}</div>`;
  }

  buildLegendHtml(): string {
    const rows: string[] = [];
    const hasFilters = this.hasActiveFilters();
    const matchSet = hasFilters ? this.computeMatchSet() : null;

    if (this.mapState.showSafety()) {
      rows.push('<div class="legend-section-title">Safety (crime)</div>');
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${SAFETY_LEVELS['safe'].color}"></span>low crime &mdash; generally safe</div>`);
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${SAFETY_LEVELS['moderate'].color}"></span>average crime &mdash; usual caution</div>`);
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${SAFETY_LEVELS['elevated'].color}"></span>higher crime &mdash; extra awareness</div>`);
    }

    if (this.mapState.showDistrictColors() || this.mapState.showSafety() || this.mapState.showFood()) {
      rows.push('<div class="legend-section-title">Districts</div>');
      const fillDesc = this.mapState.showSafety() ? 'filled by safety level' :
        this.mapState.showFood() ? 'filled by café density' : 'colored by district';
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:#f3b59f"></span>${fillDesc}</div>`);
      if (hasFilters && matchSet) {
        rows.push(`<div class="legend-row"><span class="legend-dot" style="background:#d0cdc5;opacity:0.5"></span>non-matching (dimmed)</div>`);
      }
    }

    const sel = this.mapState.selectedDistrictId();
    if (sel) {
      rows.push('<div class="legend-section-title">Selection</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#f08b62"></span>selected district</div>');
      if (this.mapState.showDirectConnections()) {
        const connCount = this.getConnectedIds(sel).size;
        if (connCount) {
          rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:#94d3c0"></span>${connCount} direct connections</div>`);
          rows.push('<div class="legend-row"><span class="legend-dash" style="background:#397b68"></span>connection line</div>');
        }
      }
    }

    if (this.mapState.showStations()) {
      rows.push('<div class="legend-section-title">Stations</div>');
      rows.push('<div class="legend-row"><span class="legend-circle" style="background:#a8d2e8"></span>major station</div>');
      rows.push('<div class="legend-row"><span class="legend-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#a64e49" stroke-width="2"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="20" r="1.5" fill="#a64e49" stroke="none"/><circle cx="16" cy="20" r="1.5" fill="#a64e49" stroke="none"/><path d="M8 17l-2 3"/><path d="M16 17l2 3"/></svg></span>Hauptbahnhof</div>');
      rows.push('<div class="legend-row"><span class="legend-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#625785" stroke-width="2"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg></span>Airport</div>');
    }

    if (this.mapState.showCostIndicators()) {
      rows.push('<div class="legend-section-title">Cost at a Glance</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€€€€</span>very expensive</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€€€</span>expensive</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€€</span>moderate</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€</span>affordable</div>');
    }

    if (this.mapState.showLandmarks()) {
      rows.push('<div class="legend-section-title">Landmarks</div>');
      rows.push('<div class="legend-row"><span class="legend-circle" style="background:#f6df8a"></span>landmark</div>');
    }

    if (this.mapState.showFood()) {
      rows.push('<div class="legend-section-title">Cafés &amp; Restaurants</div>');
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${FOOD_DENSITY['high'].color}"></span>café-rich area</div>`);
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${FOOD_DENSITY['medium'].color}"></span>some cafés</div>`);
      rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${FOOD_DENSITY['low'].color}"></span>few cafés</div>`);
    }

    if (this.mapState.showDistrictLabels() || this.mapState.showDistrictNumbers()) {
      rows.push('<div class="legend-section-title">Labels</div>');
      if (this.mapState.showDistrictLabels() && this.mapState.showDistrictNumbers()) {
        rows.push('<div class="legend-row"><span class="legend-text">7. Neubau</span>name + number</div>');
      } else if (this.mapState.showDistrictLabels()) {
        rows.push('<div class="legend-row"><span class="legend-text">Neubau</span>district name</div>');
      } else {
        rows.push('<div class="legend-row"><span class="legend-text">7</span>district number</div>');
      }
    }

    if (this.mapState.showUbahn()) {
      rows.push('<div class="legend-section-title">U-Bahn Lines</div>');
      Object.keys(LINE_ROUTES).forEach(name => {
        const style = LINE_STYLES[name];
        if (style?.mode === 'ubahn') rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${style.color}"></span>${esc(name)}</div>`);
      });
    }

    if (this.mapState.showSbahn()) {
      rows.push('<div class="legend-section-title">S-Bahn Lines</div>');
      Object.keys(LINE_ROUTES).forEach(name => {
        const style = LINE_STYLES[name];
        if (style?.mode === 'sbahn') rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${style.color}"></span>${esc(name)}</div>`);
      });
    }

    if (this.mapState.showTram()) {
      rows.push('<div class="legend-section-title">Tram Lines</div>');
      TRAM_CORRIDORS.forEach(c => rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${c.color}"></span>${esc(c.label)}</div>`));
    }

    if (this.mapState.showMainRoads()) {
      rows.push('<div class="legend-section-title">Main Roads</div>');
      MAIN_ROUTES.forEach(r => rows.push(`<div class="legend-row"><span class="legend-swatch" style="background:${r.color}"></span>${esc(r.label)}</div>`));
    }

    return rows.length ? rows.join('') : '<div class="legend-row muted">Enable layers to see details</div>';
  }

  // ---- Public API ----

  invalidateSize(): void {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => { if (this.map) this.map.invalidateSize(); }, 60);
  }

  setOnDistrictClick(cb: (id: number, ctrl?: boolean) => void): void {
    this.onDistrictClickCb = cb;
  }

  setOnHubClick(cb: (station: any) => void): void {
    this.onHubClickCb = cb;
  }

  setOnSearchLocationClick(cb: (location: LocationSelection) => void): void {
    this.onSearchLocationClickCb = cb;
  }

  setCommentCounts(counts: Map<number, number>): void {
    this.commentCounts.set(counts);
    if (this.mapReady()) this.renderCommentCounts();
  }

  setLocationCommentMarkers(markers: LocationMarker[]): void {
    this.locationCommentMarkers.set(markers);
    if (this.mapReady()) this.renderLocationCommentMarkers();
  }

  incrementCommentCount(districtId: number): void {
    const next = new Map(this.commentCounts());
    next.set(districtId, (next.get(districtId) || 0) + 1);
    this.commentCounts.set(next);
    if (this.mapReady()) this.renderCommentCounts();
  }

  panToDistrict(id: number): void {
    const f = this.districtById.get(id);
    if (!f || !this.map) return;
    const bounds = this.getFeatureBounds(f.geometry);
    if (bounds) this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  /**
   * Finds a place on the map from a free-text query (district, landmark or
   * major station) and moves the map to it. Returns the matched place or null.
   */
  focusPlace(query: string): { label: string; kind: 'district' | 'landmark' | 'station' } | null {
    const q = normalizeText(query);
    if (!q || !this.map) return null;

    const candidates: Array<{
      score: number;
      kind: 'district' | 'landmark' | 'station';
      label: string;
      districtId?: number;
      lat?: number;
      lng?: number;
    }> = [];

    // Districts (id, name, keywords / other searchable text)
    this.dataset.forEach(f => {
      const props = f.properties;
      const id = props._districtId;
      const name = normalizeText(props.name);
      const nameDe = normalizeText(props.name_de);
      const blob: string = props._searchBlob || '';
      let score = 0;
      if (String(id) === q || Number(q) === id) score = 120;
      else if (name === q || nameDe === q) score = 100;
      else if (name.startsWith(q) || nameDe.startsWith(q)) score = 80;
      else if (name.includes(q) || nameDe.includes(q)) score = 60;
      else if (blob.includes(q)) score = 40;
      if (score > 0) candidates.push({ score, kind: 'district', label: `${id}. ${props.name}`, districtId: id });
    });

    // Landmarks
    this.dataset.forEach(f => {
      (f.properties.landmarks || []).forEach((lm: any) => {
        const name = normalizeText(lm.name);
        let score = 0;
        if (name === q) score = 100;
        else if (name.startsWith(q)) score = 80;
        else if (name.includes(q)) score = 60;
        if (score > 0) {
          candidates.push({ score, kind: 'landmark', label: lm.name, districtId: f.properties._districtId, lat: Number(lm.lat), lng: Number(lm.lng) });
        }
      });
    });

    // Major stations
    this.stations.forEach(s => {
      const name = normalizeText(s.name);
      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 80;
      else if (name.includes(q)) score = 60;
      if (score > 0) {
        candidates.push({ score, kind: 'station', label: s.name, districtId: s.districtId, lat: Number(s.lat), lng: Number(s.lng) });
      }
    });

    if (!candidates.length) return null;

    // Best match first; prefer a specific place (landmark/station) over a district on ties.
    const kindRank = { landmark: 2, station: 2, district: 1 };
    candidates.sort((a, b) => (b.score - a.score) || (kindRank[b.kind] - kindRank[a.kind]));
    const best = candidates[0];

    if (best.kind === 'district') {
      this.panToDistrict(best.districtId!);
      this.mapState.selectDistrict(best.districtId!);
      this.clearSearchMarker();
    } else {
      this.focusLocation({
        key: locationKeyFor(best.kind, best.lat!, best.lng!),
        type: best.kind,
        name: best.label,
        lat: best.lat!,
        lng: best.lng!,
      });
    }

    return { label: best.label, kind: best.kind };
  }

  clearSearchFocus(): void {
    this.clearSearchMarker();
  }

  /** Pans to a searched (non-district) location and drops a clickable pin. */
  focusLocation(location: LocationSelection): void {
    this.panTo(location.lat, location.lng, 15);
    this.showSearchMarker(location.lat, location.lng, location.name, location);
  }

  /** Moves the map to an arbitrary coordinate and drops a search pin. */
  focusCoordinate(lat: number, lng: number, label: string): void {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    this.focusLocation({
      key: locationKeyFor('place', lat, lng),
      type: 'place',
      name: label,
      lat,
      lng,
    });
  }

  /**
   * Geocodes a free-text address/place through the backend Nominatim proxy.
   * Resolves to a (possibly empty) list of { label, lat, lng, type } results.
   */
  async geocodeRemote(query: string): Promise<Array<{ name: string; label: string; lat: number; lng: number; type: string }>> {
    try {
      const response: any = await this.http
        .get<any>(`${environment.apiBaseUrl}/api/geocode/`, { params: { q: query } })
        .toPromise();
      return (response?.results || []).map((r: any) => ({
        name: r.name || r.label || query,
        label: r.label || r.name || query,
        lat: Number(r.lat),
        lng: Number(r.lng),
        type: r.type || r.category || '',
      }));
    } catch {
      return [];
    }
  }

  private panTo(lat: number, lng: number, zoom: number): void {
    if (!this.map) return;
    const targetZoom = Math.max(this.map.getZoom(), zoom);
    this.map.flyTo([lat, lng], targetZoom, { duration: 0.6 });
  }

  private showSearchMarker(lat: number, lng: number, label: string, location?: LocationSelection): void {
    this.clearSearchMarker();
    if (!this.searchMarkerLayer) return;
    const icon = L.divIcon({
      className: 'search-pin',
      html: '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#2d2a26" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      iconSize: [30, 30], iconAnchor: [15, 30]
    });
    const marker = L.marker([lat, lng], { icon, keyboard: false, interactive: true, zIndexOffset: 1000 });
    const tip = location
      ? `${esc(label)}<span class="pin-tip-hint"> · click to comment</span>`
      : esc(label);
    marker.bindTooltip(tip, { className: 'station-tooltip', direction: 'top', offset: [0, -14] });
    if (location) {
      marker.on('click', () => this.onSearchLocationClickCb?.(location));
    }
    marker.addTo(this.searchMarkerLayer);
    marker.openTooltip();
  }

  private clearSearchMarker(): void {
    if (this.searchMarkerLayer) this.searchMarkerLayer.clearLayers();
  }

  private getFeatureBounds(geometry: any): L.LatLngBoundsExpression | null {
    if (!geometry) return null;
    let coords: number[][] = [];
    if (geometry.type === 'Polygon') coords = geometry.coordinates[0];
    else if (geometry.type === 'MultiPolygon') geometry.coordinates.forEach((p: number[][][]) => { coords = coords.concat(p[0]); });
    if (!coords.length) return null;
    const lngs = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    return [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]];
  }

  resetView(): void {
    if (this.map && this.districtLayer) this.map.fitBounds(this.districtLayer.getBounds(), { padding: [24, 24] });
  }

  getDistrictData(): any[] { return this.dataset; }
  getDistrictFeature(id: number): any { return this.districtById.get(id); }
  getDistrictConnections(): Map<number, Map<number, { rawModes: Set<string> }>> { return this.districtConnections; }
  getMatchCount(): number { return this.computeMatchSet().size; }
  getTotalCount(): number { return this.dataset.length; }
}
