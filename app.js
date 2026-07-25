(function () {
  "use strict";

  const TOGGLE_DEFS = [
    { key: "showDistrictColors", label: "District colors", default: true },
    { key: "showDistrictLabels", label: "District names", default: true },
    { key: "showDistrictNumbers", label: "District numbers", default: true },
    { key: "showKeywords", label: "Keywords", default: false },
    { key: "showLandmarks", label: "Landmarks", default: false },
    { key: "showCostIndicators", label: "Cost indicators", default: false },
    { key: "showCost", label: "Descriptions", default: false },
    { key: "showStations", label: "Major stations", default: true },
    { key: "showDirectConnections", label: "Direct connections", default: true }
  ];

  const BASE_VIEW = { lat: 48.2082, lng: 16.3738, zoom: 11 };
  const LABEL_PANE = "districtLabelsPane";
  const BADGE_PANE = "districtBadgesPane";

  const COST_STYLE = {
    very_expensive: { label: "Very expensive", color: "#8e3b46" },
    expensive: { label: "Expensive", color: "#b65f3b" },
    moderate: { label: "Moderate", color: "#7b8f3e" },
    affordable: { label: "Affordable", color: "#2d7d63" }
  };

  const SPECIAL_HUBS = {
    airport: {
      id: "vienna-airport",
      name: "Vienna International Airport",
      lat: 48.1103,
      lng: 16.5697,
      districtId: 11,
      lines: ["S7", "CAT"],
      modes: ["sbahn", "rail"],
      importance: 5,
      specialKind: "airport"
    },
    hbfNameTokens: ["hauptbahnhof", "wien hbf", "wien hauptbahnhof"]
  };

  const urlKeys = {
    selectedDistrictId: "sd",
    showDistrictColors: "dc",
    showDistrictLabels: "dl",
    showDistrictNumbers: "dn",
    showKeywords: "kwv",
    showLandmarks: "lmv",
    showCostIndicators: "csi",
    showCost: "csv",
    showStations: "stv",
    showDirectConnections: "cnv",
    searchText: "q",
    selectedCostTiers: "ct",
    connectedToDistrictId: "cd",
    mapView: "m"
  };

  let dataset;
  let districts = [];
  let districtById = new Map();
  let districtConnections = new Map();
  let stations = [];

  let map;
  let canvasRenderer;
  let districtLayer;
  const districtLayerById = new Map();
  let labelLayer;
  let keywordLayer;
  let landmarkLayer;
  let costIndicatorLayer;
  let costLayer;
  let stationLayer;
  let connectionLineLayer;
  let bubbleStackRegistry = new Map();

  const ui = {};
  let suppressUrlSync = false;

  let state = {
    selectedDistrictId: null,
    activeSpecialHub: null,
    showDistrictColors: true,
    showDistrictLabels: true,
    showDistrictNumbers: true,
    showKeywords: false,
    showLandmarks: false,
    showCostIndicators: false,
    showCost: false,
    showStations: true,
    showDirectConnections: true,
    searchText: "",
    selectedCostTiers: new Set(),
    connectedToDistrictId: null,
    mapView: null
  };

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    dataset = await loadDataset();
    if (!dataset || !Array.isArray(dataset.features)) {
      throw new Error("Dataset is missing or invalid");
    }

    prepareData(dataset.features);
    readStateFromUrl();
    cacheUi();
    buildFilterControls();
    buildToggleControls();
    bindUiEvents();
    initMap();
    renderAll();
  }

  async function loadDataset() {
    try {
      const response = await fetch("./data.json", { cache: "no-store" });
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      // Fall through to scripted DATA fallback.
    }

    if (typeof DATA !== "undefined") {
      return DATA;
    }

    throw new Error("Could not load dataset from data.json or data.js");
  }

  function prepareData(features) {
    districts = features
      .filter((feature) => feature && feature.properties && Number.isFinite(Number(feature.properties.id)))
      .map((feature) => {
        const districtId = Number(feature.properties.id);
        const transportLineSets = deriveTransportLineSets(feature.properties.transport || {});
        const normalizedConnections = (feature.properties.directConnections || []).map((connection) => {
          const modeCategories = new Set(deriveModeCategories(connection.modes || []));
          return {
            districtId: Number(connection.districtId),
            rawModes: (connection.modes || []).map((mode) => String(mode)),
            categories: modeCategories
          };
        });

        const centroid = computeFeatureCenter(feature.geometry);
        const bounds = computeFeatureBounds(feature.geometry);
        const color = colorForDistrictId(districtId);
        const searchBlob = normalizeText(buildDistrictSearchBlob(feature.properties));

        feature.properties._districtId = districtId;
        feature.properties._centroid = centroid;
        feature.properties._bounds = bounds;
        feature.properties._color = color;
        feature.properties._transportLineSets = transportLineSets;
        feature.properties._normalizedConnections = normalizedConnections;
        feature.properties._searchBlob = searchBlob;

        districtById.set(districtId, feature);
        return feature;
      });

    districtConnections = buildNoTransferConnectionIndex();
    stations = collectStationsFromDistricts();
  }

  function buildDistrictSearchBlob(properties) {
    const bits = [];
    bits.push(String(properties.id || ""));
    bits.push(String(properties.name || ""));
    bits.push(String(properties.name_de || ""));
    bits.push(String(properties.costOfLiving?.tier || ""));
    bits.push(String(properties.costOfLiving?.description || ""));

    (properties.keywords || []).forEach((keyword) => bits.push(String(keyword)));
    (properties.landmarks || []).forEach((landmark) => bits.push(String(landmark.name || "")));
    (properties.majorStations || []).forEach((station) => bits.push(String(station.name || "")));
    (properties.directConnections || []).forEach((connection) => {
      bits.push(String(connection.districtId || ""));
      (connection.modes || []).forEach((mode) => bits.push(String(mode)));
    });

    const transport = properties.transport || {};
    ["ubahn", "sbahn", "tram", "bus"].forEach((key) => {
      (transport[key] || []).forEach((line) => bits.push(String(line)));
    });

    return bits.join(" ");
  }

  function buildNoTransferConnectionIndex() {
    const index = new Map();

    districts.forEach((feature) => {
      const id = feature.properties._districtId;
      if (!index.has(id)) {
        index.set(id, new Map());
      }
    });

    for (let leftIndex = 0; leftIndex < districts.length; leftIndex += 1) {
      const leftFeature = districts[leftIndex];
      const leftId = leftFeature.properties._districtId;
      for (let rightIndex = leftIndex + 1; rightIndex < districts.length; rightIndex += 1) {
        const rightFeature = districts[rightIndex];
        const rightId = rightFeature.properties._districtId;

        const shared = getSharedNoTransferLines(leftFeature, rightFeature);
        if (shared.rawModes.length === 0) {
          continue;
        }
        addConnectionRecord(index, leftId, rightId, shared.rawModes, new Set(shared.categories));
      }
    }

    mergeExplicitConnections(index);

    return index;
  }

  function mergeExplicitConnections(index) {
    districts.forEach((feature) => {
      const fromId = feature.properties._districtId;
      (feature.properties._normalizedConnections || []).forEach((connection) => {
        const toId = Number(connection.districtId);
        if (!districtById.has(toId)) {
          return;
        }
        addConnectionRecord(index, fromId, toId, connection.rawModes, connection.categories);
      });
    });
  }

  function getSharedNoTransferLines(leftFeature, rightFeature) {
    const sharedLines = [];
    const categories = new Set();
    const leftSets = leftFeature.properties._transportLineSets || {};
    const rightSets = rightFeature.properties._transportLineSets || {};

    ["ubahn", "sbahn", "tram", "bus"].forEach((mode) => {
      const leftMap = leftSets[mode];
      const rightMap = rightSets[mode];
      if (!(leftMap instanceof Map) || !(rightMap instanceof Map)) {
        return;
      }

      leftMap.forEach((displayLine, normalizedLine) => {
        if (!rightMap.has(normalizedLine)) {
          return;
        }
        sharedLines.push(displayLine);
        categories.add(mode);
        if (mode === "sbahn") {
          categories.add("rail");
        }
      });
    });

    return {
      rawModes: dedupeAndSortLines(sharedLines),
      categories: Array.from(categories)
    };
  }

  function dedupeAndSortLines(lines) {
    const lineMap = new Map();
    lines.forEach((line) => {
      const normalized = normalizeLineToken(line);
      if (!normalized || lineMap.has(normalized)) {
        return;
      }
      lineMap.set(normalized, String(line));
    });

    return Array.from(lineMap.values()).sort((left, right) => {
      const leftToken = normalizeLineToken(left);
      const rightToken = normalizeLineToken(right);
      const leftWeight = lineSortWeight(leftToken);
      const rightWeight = lineSortWeight(rightToken);
      if (leftWeight !== rightWeight) {
        return leftWeight - rightWeight;
      }
      return String(left).localeCompare(String(right), "en", { numeric: true, sensitivity: "base" });
    });
  }

  function lineSortWeight(token) {
    if (/^u\d+/.test(token)) {
      return 1;
    }
    if (/^s\d+/.test(token)) {
      return 2;
    }
    if (/^\d+[a-z]?$/.test(token) || /^[a-z]$/.test(token) || token === "wlb") {
      return 3;
    }
    return 4;
  }

  function deriveTransportLineSets(transport) {
    const sets = {
      ubahn: new Map(),
      sbahn: new Map(),
      tram: new Map(),
      bus: new Map()
    };

    ["ubahn", "sbahn", "tram", "bus"].forEach((mode) => {
      const lines = Array.isArray(transport[mode]) ? transport[mode] : [];
      lines.forEach((line) => {
        const displayLine = String(line).trim();
        if (!displayLine) {
          return;
        }
        const normalizedLine = normalizeLineToken(displayLine);
        if (!normalizedLine) {
          return;
        }
        if (!sets[mode].has(normalizedLine)) {
          sets[mode].set(normalizedLine, displayLine);
        }
      });
    });

    return sets;
  }

  function normalizeLineToken(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

  function addConnectionRecord(index, fromId, toId, rawModes, categories) {
    if (!index.has(fromId)) {
      index.set(fromId, new Map());
    }
    const fromMap = index.get(fromId);
    if (!fromMap.has(toId)) {
      fromMap.set(toId, { rawModes: new Set(), categories: new Set() });
    }
    const record = fromMap.get(toId);
    rawModes.forEach((rawMode) => record.rawModes.add(rawMode));
    categories.forEach((modeCategory) => record.categories.add(modeCategory));

    if (!index.has(toId)) {
      index.set(toId, new Map());
    }
    const reverseMap = index.get(toId);
    if (!reverseMap.has(fromId)) {
      reverseMap.set(fromId, { rawModes: new Set(), categories: new Set() });
    }
    const reverseRecord = reverseMap.get(fromId);
    rawModes.forEach((rawMode) => reverseRecord.rawModes.add(rawMode));
    categories.forEach((modeCategory) => reverseRecord.categories.add(modeCategory));
  }

  function collectStationsFromDistricts() {
    const stationByKey = new Map();
    const majorStationPriority = new Set([
      "wien hauptbahnhof",
      "hauptbahnhof",
      "wien meidling",
      "wien mitte",
      "wien westbahnhof",
      "wien praterstern",
      "wien floridsdorf"
    ]);

    districts.forEach((feature) => {
      const districtId = feature.properties._districtId;
      const districtStations = feature.properties.majorStations || [];
      districtStations.forEach((station) => {
        const name = String(station.name || "").trim();
        if (!name) {
          return;
        }
        const key = normalizeText(name);
        const lines = Array.isArray(station.lines) ? station.lines.map((line) => String(line)) : [];
        const lineModes = deriveModeCategories(lines);
        const inPriorityList = majorStationPriority.has(key);
        const lineScore = Math.min(5, Math.max(1, Math.ceil(lines.length / 2)));
        const importance = inPriorityList ? 5 : lineScore;

        if (!stationByKey.has(key)) {
          stationByKey.set(key, {
            id: key.replace(/\s+/g, "-"),
            name,
            lat: Number(station.lat),
            lng: Number(station.lng),
            districtId,
            lines: new Set(lines),
            modes: new Set(lineModes),
            importance
          });
          return;
        }

        const existing = stationByKey.get(key);
        lines.forEach((line) => existing.lines.add(line));
        lineModes.forEach((mode) => existing.modes.add(mode));
        existing.importance = Math.max(existing.importance, importance);
      });
    });

    let stationList = Array.from(stationByKey.values())
      .filter((station) => Number.isFinite(station.lat) && Number.isFinite(station.lng))
      .map((station) => ({
        id: station.id,
        name: station.name,
        lat: station.lat,
        lng: station.lng,
        districtId: station.districtId,
        lines: Array.from(station.lines),
        modes: Array.from(station.modes),
        importance: station.importance
      }))
      .sort((a, b) => b.importance - a.importance || a.name.localeCompare(b.name));

    stationList = mergeSpecialHubs(stationList);
    return stationList;
  }

  function mergeSpecialHubs(stationList) {
    stationList.forEach((station) => {
      const normalizedName = normalizeText(station.name);
      SPECIAL_HUBS.hbfNameTokens.forEach((token) => {
        if (normalizedName.includes(token)) {
          station.specialKind = "hbf";
          station.importance = Math.max(station.importance || 0, 5);
        }
      });
    });

    const airportKey = normalizeText(SPECIAL_HUBS.airport.name);
    const airportFound = stationList.some((station) => normalizeText(station.name) === airportKey);
    if (!airportFound) {
      stationList.push({ ...SPECIAL_HUBS.airport });
    }

    return stationList.sort((a, b) => b.importance - a.importance || a.name.localeCompare(b.name));
  }

  function deriveModeCategories(values) {
    const categories = new Set();
    values.forEach((value) => {
      const token = normalizeText(String(value));
      if (!token) {
        return;
      }

      if (token === "ubahn" || /^u\d+/.test(token)) {
        categories.add("ubahn");
        return;
      }
      if (token === "sbahn" || token === "s bahn" || token === "s-bahn" || /^s\d+/.test(token)) {
        categories.add("sbahn");
        return;
      }
      if (token === "rail" || token === "train" || token === "bahn") {
        categories.add("rail");
        return;
      }
      if (token === "bus" || /^\d{1,2}a$/.test(token)) {
        categories.add("bus");
        return;
      }
      if (
        token === "tram" ||
        token === "streetcar" ||
        token === "wlb" ||
        /^\d+$/.test(token) ||
        /^[a-z]$/.test(token)
      ) {
        categories.add("tram");
      }
    });

    return Array.from(categories);
  }

  function computeFeatureCenter(geometry) {
    if (!geometry || !geometry.type || !Array.isArray(geometry.coordinates)) {
      return { lat: BASE_VIEW.lat, lng: BASE_VIEW.lng };
    }

    if (geometry.type === "Polygon") {
      return centroidForPolygon(geometry.coordinates);
    }

    if (geometry.type === "MultiPolygon") {
      let bestArea = -Infinity;
      let bestCentroid = null;
      geometry.coordinates.forEach((polygon) => {
        const area = Math.abs(ringArea(polygon?.[0] || []));
        if (area > bestArea) {
          bestArea = area;
          bestCentroid = centroidForPolygon(polygon);
        }
      });
      if (bestCentroid) {
        return bestCentroid;
      }
    }

    return { lat: BASE_VIEW.lat, lng: BASE_VIEW.lng };
  }

  function centroidForPolygon(rings) {
    const outerRing = Array.isArray(rings) && rings.length ? rings[0] : [];
    if (!Array.isArray(outerRing) || outerRing.length < 3) {
      return { lat: BASE_VIEW.lat, lng: BASE_VIEW.lng };
    }

    const area = ringArea(outerRing);
    if (!Number.isFinite(area) || Math.abs(area) < 1e-12) {
      const first = outerRing[0] || [BASE_VIEW.lng, BASE_VIEW.lat];
      return { lat: Number(first[1]) || BASE_VIEW.lat, lng: Number(first[0]) || BASE_VIEW.lng };
    }

    let cx = 0;
    let cy = 0;
    for (let index = 0; index < outerRing.length - 1; index += 1) {
      const x0 = Number(outerRing[index][0]);
      const y0 = Number(outerRing[index][1]);
      const x1 = Number(outerRing[index + 1][0]);
      const y1 = Number(outerRing[index + 1][1]);
      const cross = x0 * y1 - x1 * y0;
      cx += (x0 + x1) * cross;
      cy += (y0 + y1) * cross;
    }

    const factor = 1 / (6 * area);
    return {
      lat: cy * factor,
      lng: cx * factor
    };
  }

  function ringArea(ring) {
    if (!Array.isArray(ring) || ring.length < 3) {
      return 0;
    }
    let area = 0;
    for (let index = 0; index < ring.length - 1; index += 1) {
      const x0 = Number(ring[index][0]);
      const y0 = Number(ring[index][1]);
      const x1 = Number(ring[index + 1][0]);
      const y1 = Number(ring[index + 1][1]);
      area += x0 * y1 - x1 * y0;
    }
    return area / 2;
  }

  function computeFeatureBounds(geometry) {
    const points = [];

    function visitCoordinates(coordinates) {
      if (!Array.isArray(coordinates)) {
        return;
      }
      if (coordinates.length >= 2 && Number.isFinite(coordinates[0]) && Number.isFinite(coordinates[1])) {
        points.push([coordinates[0], coordinates[1]]);
        return;
      }
      coordinates.forEach(visitCoordinates);
    }

    visitCoordinates(geometry?.coordinates);

    if (!points.length) {
      return null;
    }

    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    points.forEach(([lng, lat]) => {
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    });

    return { minLat, minLng, maxLat, maxLng };
  }

  function colorForDistrictId(id) {
    const hue = (id * 47) % 360;
    return `hsl(${hue}, 64%, 62%)`;
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cacheUi() {
    ui.toggleControls = document.getElementById("toggleControls");
    ui.costTierFilters = document.getElementById("costTierFilters");

    ui.districtSearch = document.getElementById("districtSearch");
    ui.connectedToDistrict = document.getElementById("connectedToDistrict");

    ui.clearFiltersBtn = document.getElementById("clearFiltersBtn");
    ui.clearSelectionBtn = document.getElementById("clearSelectionBtn");
    ui.districtInfo = document.getElementById("districtInfo");
    ui.legend = document.getElementById("legend");
  }

  function buildToggleControls() {
    ui.toggleControls.innerHTML = "";
    TOGGLE_DEFS.forEach((toggleDef) => {
      const label = document.createElement("label");
      label.className = "checkline";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(state[toggleDef.key]);
      checkbox.dataset.toggleKey = toggleDef.key;

      const span = document.createElement("span");
      span.textContent = toggleDef.label;

      label.appendChild(checkbox);
      label.appendChild(span);
      ui.toggleControls.appendChild(label);
    });
  }

  function buildFilterControls() {
    const costTiers = Array.from(
      new Set(
        districts
          .map((district) => district.properties.costOfLiving?.tier)
          .filter((tier) => typeof tier === "string" && tier.length > 0)
      )
    );

    populateChipGroup(ui.costTierFilters, costTiers, state.selectedCostTiers, "costTier");

    ui.connectedToDistrict.innerHTML = "";
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Any district";
    ui.connectedToDistrict.appendChild(emptyOption);

    districts
      .map((district) => district.properties)
      .sort((left, right) => left._districtId - right._districtId)
      .forEach((properties) => {
        const option = document.createElement("option");
        option.value = String(properties._districtId);
        option.textContent = `${properties._districtId}. ${properties.name}`;
        ui.connectedToDistrict.appendChild(option);
      });

    ui.districtSearch.value = state.searchText;
    ui.connectedToDistrict.value = state.connectedToDistrictId ? String(state.connectedToDistrictId) : "";
  }

  function populateChipGroup(container, values, selectedSet, chipType) {
    container.innerHTML = "";
    values.forEach((value) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.chipType = chipType;
      chip.dataset.value = value;
      chip.textContent = formatChipValue(value);
      if (selectedSet.has(value)) {
        chip.classList.add("active");
      }
      container.appendChild(chip);
    });
  }

  function formatChipValue(value) {
    if (COST_STYLE[value]) {
      return COST_STYLE[value].label;
    }
    return String(value)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function bindUiEvents() {
    ui.toggleControls.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
        return;
      }
      const toggleKey = target.dataset.toggleKey;
      if (!toggleKey) {
        return;
      }
      state[toggleKey] = target.checked;
      renderAll();
    });

    const onFilterInputChange = () => {
      state.searchText = ui.districtSearch.value.trim();
      state.connectedToDistrictId = ui.connectedToDistrict.value ? Number(ui.connectedToDistrict.value) : null;
      renderAll();
    };

    [ui.districtSearch, ui.connectedToDistrict].forEach((node) => {
      const eventType = node instanceof HTMLInputElement && node.type === "text" ? "input" : "change";
      node.addEventListener(eventType, onFilterInputChange);
    });

    ui.costTierFilters.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains("chip")) {
        return;
      }
      const chipValue = target.dataset.value;
      if (!chipValue) {
        return;
      }

      toggleSetValue(state.selectedCostTiers, chipValue);
      target.classList.toggle("active");
      renderAll();
    });

    ui.clearFiltersBtn.addEventListener("click", () => {
      state.searchText = "";
      state.selectedCostTiers = new Set();
      state.connectedToDistrictId = null;
      buildFilterControls();
      renderAll();
    });

    ui.clearSelectionBtn.addEventListener("click", () => {
      state.selectedDistrictId = null;
      state.activeSpecialHub = null;
      renderAll();
    });
  }

  function toggleSetValue(set, value) {
    if (set.has(value)) {
      set.delete(value);
      return;
    }
    set.add(value);
  }

  function initMap() {
    map = L.map("map", {
      preferCanvas: true,
      zoomControl: true,
      minZoom: 10,
      maxZoom: 15
    });

    createOverlayPanes();

    canvasRenderer = L.canvas({ padding: 0.2 });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
      maxZoom: 20,
      subdomains: "abcd"
    }).addTo(map);

    districtLayer = L.geoJSON({ type: "FeatureCollection", features: districts }, {
      renderer: canvasRenderer,
      style: styleForDistrictLayer,
      onEachFeature: (feature, layer) => {
        const districtId = feature.properties._districtId;
        districtLayerById.set(districtId, layer);

        layer.on("click", () => {
          state.activeSpecialHub = null;
          state.selectedDistrictId = state.selectedDistrictId === districtId ? null : districtId;
          renderAll();
        });
      }
    }).addTo(map);

    labelLayer = L.layerGroup().addTo(map);
    keywordLayer = L.layerGroup().addTo(map);
    landmarkLayer = L.layerGroup().addTo(map);
    costIndicatorLayer = L.layerGroup().addTo(map);
    costLayer = L.layerGroup().addTo(map);
    stationLayer = L.layerGroup().addTo(map);
    connectionLineLayer = L.layerGroup().addTo(map);

    const mapView = state.mapView;
    if (mapView) {
      map.setView([mapView.lat, mapView.lng], mapView.zoom);
    } else {
      map.fitBounds(districtLayer.getBounds(), { padding: [24, 24] });
    }

    map.on("moveend zoomend", () => {
      if (suppressUrlSync) {
        return;
      }
      renderUrlOnly();
    });

    document.addEventListener("keydown", onGlobalKeyDown);
  }

  function createOverlayPanes() {
    if (!map.getPane(LABEL_PANE)) {
      map.createPane(LABEL_PANE);
    }
    if (!map.getPane(BADGE_PANE)) {
      map.createPane(BADGE_PANE);
    }

    const labelPane = map.getPane(LABEL_PANE);
    const badgePane = map.getPane(BADGE_PANE);
    if (labelPane) {
      labelPane.style.zIndex = "650";
    }
    if (badgePane) {
      badgePane.style.zIndex = "640";
    }
  }

  function onGlobalKeyDown(event) {
    if (event.key !== "Escape") {
      return;
    }
    if (!state.selectedDistrictId && !state.activeSpecialHub) {
      return;
    }
    state.selectedDistrictId = null;
    state.activeSpecialHub = null;
    renderAll();
  }

  function computeSpecialHubConnectedDistricts(hubStation) {
    const hubLineTokens = new Set(
      (hubStation.lines || []).map((line) => normalizeLineToken(line)).filter(Boolean)
    );
    const connected = new Set();
    districts.forEach((feature) => {
      const districtLines = collectDistrictLineTokens(feature.properties.transport || {});
      for (const token of hubLineTokens) {
        if (districtLines.has(token)) {
          connected.add(feature.properties._districtId);
          break;
        }
      }
    });
    return connected;
  }

  function styleForDistrictLayer(feature) {
    const districtId = feature.properties._districtId;
    const matchSet = computeMatchingDistrictIds();
    const hubConnected = state.activeSpecialHub ? computeSpecialHubConnectedDistricts(state.activeSpecialHub) : new Set();
    return districtStyleById(districtId, matchSet, hubConnected);
  }

  function districtStyleById(districtId, matchSet, hubConnected) {
    const district = districtById.get(districtId);
    const isSelected = districtId === state.selectedDistrictId;
    const connectedIds = state.showDirectConnections ? getConnectedDistrictIds(state.selectedDistrictId) : new Set();
    const isConnected = connectedIds.has(districtId);
    const hasActiveFilters = doesStateHaveActiveFilters();
    const isMatch = matchSet.has(districtId);
    const isHubConnected = state.activeSpecialHub && hubConnected && hubConnected.has(districtId);
    const hubKind = state.activeSpecialHub?.specialKind;

    const baseFill = state.showDistrictColors ? district.properties._color : "#d7dee7";

    let fillColor;
    if (isSelected) {
      fillColor = "#ffba5a";
    } else if (isConnected) {
      fillColor = "#8ee5d5";
    } else if (isHubConnected) {
      fillColor = hubKind === "airport" ? "#ede4fc" : "#fce4e4";
    } else if (isMatch && hasActiveFilters) {
      fillColor = "#b9fbc0";
    } else {
      fillColor = baseFill;
    }

    let borderColor;
    if (isSelected) {
      borderColor = "#c0392b";
    } else if (isConnected) {
      borderColor = "#0f766e";
    } else if (isHubConnected) {
      borderColor = hubKind === "airport" ? "#6a00f4" : "#d90429";
    } else {
      borderColor = "#263445";
    }

    let weight;
    if (isSelected) {
      weight = 3.2;
    } else if (isConnected || isHubConnected) {
      weight = 2.6;
    } else if (isMatch && hasActiveFilters) {
      weight = 2.2;
    } else {
      weight = 1.3;
    }

    let fillOpacity;
    if (isSelected) {
      fillOpacity = 0.84;
    } else if (isHubConnected || (isMatch && hasActiveFilters)) {
      fillOpacity = 0.72;
    } else {
      fillOpacity = 0.52;
    }

    return {
      color: borderColor,
      weight,
      fillColor,
      fillOpacity,
      opacity: 0.92,
      dashArray: hasActiveFilters && !isMatch && !isHubConnected ? "3 5" : ""
    };
  }

  function renderAll() {
    bubbleStackRegistry = new Map();
    const matchSet = computeMatchingDistrictIds();
    const hubConnected = state.activeSpecialHub ? computeSpecialHubConnectedDistricts(state.activeSpecialHub) : new Set();
    renderDistrictStyles(matchSet, hubConnected);
    renderLabels(matchSet);
    renderCostIndicators(matchSet);
    renderCostBadges(matchSet);
    renderKeywords(matchSet);
    renderLandmarks(matchSet);
    renderStations(matchSet);
    renderConnectionLines(matchSet, hubConnected);
    renderSelectedDistrictInfo();
    renderLegend();
    renderUrlOnly();
  }

  function renderDistrictStyles(matchSet, hubConnected) {
    districtLayer.eachLayer((layer) => {
      const districtId = layer.feature.properties._districtId;
      layer.setStyle(districtStyleById(districtId, matchSet, hubConnected));
    });
  }

  function renderLabels(matchSet) {
    labelLayer.clearLayers();

    const showName = Boolean(state.showDistrictLabels);
    const showNumber = Boolean(state.showDistrictNumbers);
    if (!showName && !showNumber) {
      return;
    }

    districts.forEach((feature) => {
      const properties = feature.properties;
      const districtId = properties._districtId;
      if (!isDistrictVisible(districtId, matchSet)) {
        return;
      }

      let text = "";
      if (showName && showNumber) {
        text = `${districtId}. ${properties.name}`;
      } else if (showName) {
        text = properties.name;
      } else {
        text = String(districtId);
      }

      const marker = L.marker([properties._centroid.lat, properties._centroid.lng], {
        keyboard: false,
        interactive: false,
        pane: LABEL_PANE,
        icon: createAutoDivIcon("district-label", escapeHtml(text), { pane: LABEL_PANE })
      });

      labelLayer.addLayer(marker);
    });
  }

  function renderKeywords(matchSet) {
    keywordLayer.clearLayers();
    if (!state.showKeywords) {
      return;
    }

    districts.forEach((feature) => {
      const properties = feature.properties;
      const districtId = properties._districtId;
      if (!isDistrictVisible(districtId, matchSet)) {
        return;
      }

      const keywords = (properties.keywords || []).slice(0, 3);
      if (!keywords.length) {
        return;
      }

      const marker = L.marker([properties._centroid.lat, properties._centroid.lng], {
        keyboard: false,
        interactive: false,
        pane: BADGE_PANE,
        icon: createStackedBadgeIcon(districtId, "district-badge", escapeHtml(keywords.join(" • ")), "keyword")
      });

      keywordLayer.addLayer(marker);
    });
  }

  function renderLandmarks(matchSet) {
    landmarkLayer.clearLayers();
    if (!state.showLandmarks) {
      return;
    }

    districts.forEach((feature) => {
      const properties = feature.properties;
      const districtId = properties._districtId;
      if (!isDistrictVisible(districtId, matchSet)) {
        return;
      }

      (properties.landmarks || []).forEach((landmark) => {
        if (!Number.isFinite(Number(landmark.lat)) || !Number.isFinite(Number(landmark.lng))) {
          return;
        }

        const marker = L.circleMarker([Number(landmark.lat), Number(landmark.lng)], {
          renderer: canvasRenderer,
          radius: 4.5,
          color: "#0f172a",
          weight: 1,
          fillColor: "#f8cc49",
          fillOpacity: 0.92
        });

        marker.bindTooltip(`${escapeHtml(landmark.name)}<br>${districtId}. ${escapeHtml(properties.name)}`, {
          direction: "top"
        });

        landmarkLayer.addLayer(marker);
      });
    });
  }

  function renderCostIndicators(matchSet) {
    costIndicatorLayer.clearLayers();
    if (!state.showCostIndicators) {
      return;
    }

    districts.forEach((feature) => {
      const properties = feature.properties;
      const districtId = properties._districtId;
      if (!isDistrictVisible(districtId, matchSet)) {
        return;
      }

      const cost = properties.costOfLiving;
      if (!cost) {
        return;
      }

      const indicator = getCostSymbol(cost.tier);
      const marker = L.marker([properties._centroid.lat, properties._centroid.lng], {
        keyboard: false,
        interactive: false,
        pane: BADGE_PANE,
        icon: createStackedBadgeIcon(districtId, "district-badge cost-indicator", escapeHtml(indicator), "indicator")
      });

      costIndicatorLayer.addLayer(marker);
    });
  }

  function renderCostBadges(matchSet) {
    costLayer.clearLayers();
    if (!state.showCost) {
      return;
    }

    districts.forEach((feature) => {
      const properties = feature.properties;
      const districtId = properties._districtId;
      if (!isDistrictVisible(districtId, matchSet)) {
        return;
      }

      const cost = properties.costOfLiving;
      if (!cost) {
        return;
      }

      const costLabel = buildCostLabel(cost);
      const description = cost.description || "No district description";
      const markerHtml =
        `<div class="cost-pill-title">${escapeHtml(costLabel)}</div>` +
        `<div class="cost-pill-text">${escapeHtml(description)}</div>`;

      const marker = L.marker([properties._centroid.lat, properties._centroid.lng], {
        keyboard: false,
        interactive: false,
        pane: BADGE_PANE,
        icon: createStackedBadgeIcon(districtId, "district-badge cost", markerHtml, "description")
      });

      costLayer.addLayer(marker);
    });
  }

  function buildCostLabel(cost) {
    const tier = String(cost.tier || "").toLowerCase();
    const symbolsByTier = {
      very_expensive: "€€€€",
      expensive: "€€€",
      moderate: "€€",
      affordable: "€"
    };
    const utilityByTier = {
      very_expensive: 210,
      expensive: 180,
      moderate: 160,
      affordable: 140
    };

    const symbols = symbolsByTier[tier] || "€€";
    const utilityBase = utilityByTier[tier] || 170;
    const rentRange = parseRentPerM2Range(cost.description || "");
    if (!rentRange) {
      return `${symbols} - Average rent + utilities around city median levels`;
    }

    const estimatedSqm = 50;
    const monthlyMin = Math.round(rentRange.min * estimatedSqm + utilityBase);
    const monthlyMax = Math.round(rentRange.max * estimatedSqm + utilityBase);
    return `${symbols} - Average rent + utilities around €${formatEuro(monthlyMin)}-€${formatEuro(monthlyMax)}/month (50m2 est.)`;
  }

  function getCostSymbol(tier) {
    const tierToken = String(tier || "").toLowerCase();
    if (tierToken === "very_expensive") {
      return "€€€€";
    }
    if (tierToken === "expensive") {
      return "€€€";
    }
    if (tierToken === "moderate") {
      return "€€";
    }
    if (tierToken === "affordable") {
      return "€";
    }
    return "€€";
  }

  function parseRentPerM2Range(text) {
    const normalized = String(text || "").replace(/,/g, ".");
    const rangeMatch = normalized.match(/€\s*(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/);
    if (rangeMatch) {
      return { min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) };
    }
    const singleMatch = normalized.match(/€\s*(\d+(?:\.\d+)?)/);
    if (singleMatch) {
      const value = Number(singleMatch[1]);
      return { min: value, max: value };
    }
    return null;
  }

  function formatEuro(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) {
      return "0";
    }
    return amount.toLocaleString("en-US");
  }

  function renderStations(matchSet) {
    stationLayer.clearLayers();
    if (!state.showStations) {
      return;
    }

    stations.forEach((station) => {
      if (!isDistrictVisible(station.districtId, matchSet)) {
        return;
      }

      const linesText = station.lines.length ? ` (${station.lines.join(", ")})` : "";
      const tooltipContent = `${escapeHtml(station.name)}${escapeHtml(linesText)}`;

      if (station.specialKind === "hbf") {
        const marker = L.marker([station.lat, station.lng], {
          keyboard: false,
          interactive: true,
          icon: L.divIcon({
            className: "station-icon station-hbf",
            html: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d90429" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="20" r="1.5" fill="#d90429" stroke="none"/><circle cx="16" cy="20" r="1.5" fill="#d90429" stroke="none"/><path d="M8 17l-2 3"/><path d="M16 17l2 3"/></svg>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        });

        marker.on("click", () => {
          if (state.activeSpecialHub && state.activeSpecialHub.id === station.id) {
            state.activeSpecialHub = null;
          } else {
            state.activeSpecialHub = station;
            state.selectedDistrictId = null;
          }
          renderAll();
        });

        marker.bindTooltip(tooltipContent, {
          className: "station-tooltip",
          direction: "top"
        });

        stationLayer.addLayer(marker);
        return;
      }

      if (station.specialKind === "airport") {
        const marker = L.marker([station.lat, station.lng], {
          keyboard: false,
          interactive: true,
          icon: L.divIcon({
            className: "station-icon station-airport",
            html: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#6a00f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        });

        marker.on("click", () => {
          if (state.activeSpecialHub && state.activeSpecialHub.id === station.id) {
            state.activeSpecialHub = null;
          } else {
            state.activeSpecialHub = station;
            state.selectedDistrictId = null;
          }
          renderAll();
        });

        marker.bindTooltip(tooltipContent, {
          className: "station-tooltip",
          direction: "top"
        });

        stationLayer.addLayer(marker);
        return;
      }

      const radius = 4 + station.importance * 0.8;
      const marker = L.circleMarker([station.lat, station.lng], {
        renderer: canvasRenderer,
        radius,
        color: "#12202e",
        weight: 1.1,
        fillColor: "#4ea8de",
        fillOpacity: 0.9
      });

        marker.on("click", () => {
          state.selectedDistrictId = station.districtId;
          renderAll();
        });

      marker.bindTooltip(tooltipContent, {
        className: "station-tooltip",
        direction: "top"
      });

      stationLayer.addLayer(marker);
    });
  }

  function renderConnectionLines(matchSet, hubConnected) {
    connectionLineLayer.clearLayers();
    if (!state.showDirectConnections) {
      return;
    }

    if (state.selectedDistrictId) {
      const selectedDistrict = districtById.get(state.selectedDistrictId);
      if (!selectedDistrict || !isDistrictVisible(state.selectedDistrictId, matchSet)) {
        return;
      }

      const selectedCenter = selectedDistrict.properties._centroid;
      const connections = districtConnections.get(state.selectedDistrictId);
      if (!connections) {
        return;
      }

      connections.forEach((connectionData, connectedDistrictId) => {
        const connectedDistrict = districtById.get(connectedDistrictId);
        if (!connectedDistrict || !isDistrictVisible(connectedDistrictId, matchSet)) {
          return;
        }

        const connectedCenter = connectedDistrict.properties._centroid;
        const polyline = L.polyline(
          [
            [selectedCenter.lat, selectedCenter.lng],
            [connectedCenter.lat, connectedCenter.lng]
          ],
          {
            renderer: canvasRenderer,
            color: "#007f5f",
            weight: 2.1,
            opacity: 0.86,
            dashArray: "8 5"
          }
        );

        const modes = Array.from(connectionData.rawModes).join(", ");
        const districtLabel = `${connectedDistrictId}. ${connectedDistrict.properties.name}`;
        polyline.bindTooltip(`${escapeHtml(districtLabel)}<br>${escapeHtml(modes)}`, {
          direction: "center"
        });

        connectionLineLayer.addLayer(polyline);
      });

      renderSpecialHubConnections(selectedDistrict, selectedCenter);
    }

    if (state.activeSpecialHub) {
      const hub = state.activeSpecialHub;
      const hubColor = hub.specialKind === "airport" ? "#6a00f4" : "#d90429";
      const hubDashArray = hub.specialKind === "airport" ? "2 8" : "12 6";

      hubConnected.forEach((districtId) => {
        const district = districtById.get(districtId);
        if (!district || !isDistrictVisible(districtId, matchSet)) {
          return;
        }

        const center = district.properties._centroid;
        const line = L.polyline(
          [
            [Number(hub.lat), Number(hub.lng)],
            [center.lat, center.lng]
          ],
          {
            renderer: canvasRenderer,
            color: hubColor,
            weight: 2.9,
            opacity: 0.96,
            dashArray: hubDashArray
          }
        );

        line.bindTooltip(
          `${districtId}. ${escapeHtml(district.properties.name)}`,
          { direction: "center" }
        );

        connectionLineLayer.addLayer(line);
      });
    }
  }

  function renderSpecialHubConnections(selectedDistrict, selectedCenter) {
    const districtLines = collectDistrictLineTokens(selectedDistrict.properties.transport || {});
    if (districtLines.size === 0) {
      return;
    }

    stations
      .filter((station) => station.specialKind === "airport" || station.specialKind === "hbf")
      .forEach((station) => {
        const stationLineTokens = (station.lines || []).map((line) => normalizeLineToken(line)).filter(Boolean);
        const shared = stationLineTokens.filter((line) => districtLines.has(line));
        if (!shared.length) {
          return;
        }

        const style =
          station.specialKind === "airport"
            ? { color: "#6a00f4", dashArray: "2 8" }
            : { color: "#d90429", dashArray: "12 6" };

        const line = L.polyline(
          [
            [selectedCenter.lat, selectedCenter.lng],
            [Number(station.lat), Number(station.lng)]
          ],
          {
            renderer: canvasRenderer,
            color: style.color,
            weight: 2.9,
            opacity: 0.96,
            dashArray: style.dashArray
          }
        );

        line.bindTooltip(
          `${escapeHtml(station.name)}<br>${escapeHtml(shared.map((token) => token.toUpperCase()).join(", "))}`,
          { direction: "center" }
        );

        connectionLineLayer.addLayer(line);
      });
  }

  function collectDistrictLineTokens(transport) {
    const tokens = new Set();
    ["ubahn", "sbahn", "tram", "bus"].forEach((mode) => {
      const lines = Array.isArray(transport[mode]) ? transport[mode] : [];
      lines.forEach((line) => {
        const normalized = normalizeLineToken(line);
        if (normalized) {
          tokens.add(normalized);
        }
      });
    });
    return tokens;
  }

  function renderSelectedDistrictInfo() {
    if (state.activeSpecialHub) {
      const hub = state.activeSpecialHub;
      const hubConnected = computeSpecialHubConnectedDistricts(hub);
      const connectedList = Array.from(hubConnected)
        .sort((a, b) => a - b)
        .map((id) => {
          const d = districtById.get(id);
          return d ? `<li>${id}. ${escapeHtml(d.properties.name)}</li>` : "";
        })
        .join("");

      ui.districtInfo.innerHTML = `
        <h3>${escapeHtml(hub.name)}</h3>
        <p class="muted">${hub.specialKind === "airport" ? "Airport" : "Main railway station"}</p>
        <p><strong>Lines:</strong> ${escapeHtml(hub.lines.join(", "))}</p>
        <p><strong>Districts with direct transport lines</strong></p>
        <ul>${connectedList || "<li>None</li>"}</ul>
        <p class="muted" style="margin-top:8px">Click a district or press Escape to deselect.</p>
      `;
      return;
    }

    if (!state.selectedDistrictId || !districtById.has(state.selectedDistrictId)) {
      ui.districtInfo.innerHTML =
        '<p class="muted">Click a district to inspect full details and direct public transport connections.</p>';
      return;
    }

    const feature = districtById.get(state.selectedDistrictId);
    const properties = feature.properties;

    const keywordsHtml = (properties.keywords || [])
      .map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`)
      .join("");

    const landmarksHtml = (properties.landmarks || [])
      .map((landmark) => `<li>${escapeHtml(landmark.name)}</li>`)
      .join("");

    const stationsHtml = (properties.majorStations || [])
      .map((station) => `<li>${escapeHtml(station.name)} <span class="mono">${escapeHtml((station.lines || []).join(", "))}</span></li>`)
      .join("");

    const transport = properties.transport || {};
    const transportHtml = ["ubahn", "sbahn", "tram", "bus"]
      .map((mode) => {
        const lines = transport[mode] || [];
        if (!lines.length) {
          return "";
        }
        return `<li><strong>${escapeHtml(mode.toUpperCase())}:</strong> ${escapeHtml(lines.join(", "))}</li>`;
      })
      .join("");

    const directConnectionHtml = buildDirectConnectionHtml(state.selectedDistrictId);
    const cost = properties.costOfLiving || {};
    const website = properties.website
      ? `<a href="${escapeHtml(properties.website)}" target="_blank" rel="noreferrer noopener">District page</a>`
      : "";

    ui.districtInfo.innerHTML = `
      <h3>${properties._districtId}. ${escapeHtml(properties.name)}</h3>
      <p class="muted">${website}</p>
      <p><strong>Cost:</strong> ${escapeHtml(cost.tier || "n/a")} - ${escapeHtml(cost.description || "No description")}</p>
      <div class="tags">${keywordsHtml || '<span class="muted">No keywords</span>'}</div>
      <p><strong>Landmarks</strong></p>
      <ul>${landmarksHtml || "<li>None listed</li>"}</ul>
      <p><strong>Major stations</strong></p>
      <ul>${stationsHtml || "<li>None listed</li>"}</ul>
      <p><strong>District transport</strong></p>
      <ul>${transportHtml || "<li>None listed</li>"}</ul>
      <p><strong>Direct district connections</strong></p>
      ${directConnectionHtml}
    `;
  }

  function buildDirectConnectionHtml(districtId) {
    const connectionMap = districtConnections.get(districtId);
    if (!connectionMap || !connectionMap.size) {
      return '<p class="muted">No direct connection data.</p>';
    }

    const entries = Array.from(connectionMap.entries()).sort((left, right) => left[0] - right[0]);
    const rows = entries
      .map(([connectedDistrictId, connectionData]) => {
        const district = districtById.get(connectedDistrictId);
        const districtName = district ? district.properties.name : `District ${connectedDistrictId}`;
        const rawModes = Array.from(connectionData.rawModes);
        return `<div class="connection-item"><strong>${connectedDistrictId}. ${escapeHtml(districtName)}</strong> - ${escapeHtml(
          rawModes.join(", ")
        )}</div>`;
      })
      .join("");

    return `<div>${rows}</div>`;
  }

  function renderLegend() {
    const legendElement = ensureLegendElement();
    const activeFilters = doesStateHaveActiveFilters();
    const connectedCount = state.selectedDistrictId ? getConnectedDistrictIds(state.selectedDistrictId).size : 0;
    const hubConnectedCount = state.activeSpecialHub ? computeSpecialHubConnectedDistricts(state.activeSpecialHub).size : 0;
    const legendRows = [
      '<div><strong>Legend</strong></div>',
      '<div class="row"><span class="swatch" style="background:#ffba5a"></span> selected district</div>',
      '<div class="row"><span class="swatch" style="background:#8ee5d5"></span> directly connected district</div>',
      '<div class="row"><span class="swatch" style="background:#d7dee7"></span> neutral district color</div>'
    ];

    if (state.showCost) {
      Object.entries(COST_STYLE).forEach(([tier, style]) => {
        legendRows.push(`<div class="row"><span class="swatch" style="background:${style.color}"></span>${escapeHtml(style.label)}</div>`);
      });
    }

    legendRows.push(
      `<div class="row muted">Connections highlighted: <span class="mono">${connectedCount}</span></div>` +
        (state.activeSpecialHub
          ? ` | Hub-connected districts: <span class="mono">${hubConnectedCount}</span>`
          : ""),
      '<div class="row"><span class="swatch" style="background:#d90429"></span> direct to HBF</div>',
      '<div class="row"><span class="swatch" style="background:#6a00f4"></span> direct to airport</div>',
      `<div class="row muted">Filters active: <span class="mono">${activeFilters ? "yes" : "no"}</span></div>`
    );

    legendElement.innerHTML = legendRows.join("");
    legendElement.style.display = "block";
    legendElement.style.visibility = "visible";
    legendElement.style.opacity = "1";
  }

  function ensureLegendElement() {
    if (ui.legend && ui.legend.isConnected) {
      return ui.legend;
    }

    let legend = document.getElementById("legend");
    if (!legend) {
      legend = document.createElement("div");
      legend.id = "legend";
      legend.className = "legend";
    }

    const mapWrap = document.querySelector(".map-wrap");
    if (mapWrap && !mapWrap.contains(legend)) {
      mapWrap.appendChild(legend);
    }

    ui.legend = legend;
    return legend;
  }

  function computeMatchingDistrictIds() {
    const matches = new Set();

    districts.forEach((feature) => {
      const districtId = feature.properties._districtId;
      if (doesDistrictMatchFilters(feature)) {
        matches.add(districtId);
      }
    });

    return matches;
  }

  function doesDistrictMatchFilters(feature) {
    const properties = feature.properties;
    const districtId = properties._districtId;

    if (state.searchText) {
      const searchNeedle = normalizeText(state.searchText);
      if (searchNeedle && !properties._searchBlob.includes(searchNeedle)) {
        return false;
      }
    }

    if (state.selectedCostTiers.size > 0) {
      const tier = properties.costOfLiving?.tier;
      if (!state.selectedCostTiers.has(tier)) {
        return false;
      }
    }

    if (state.connectedToDistrictId) {
      if (districtId !== state.connectedToDistrictId && !isDirectlyConnected(districtId, state.connectedToDistrictId)) {
        return false;
      }
    }

    return true;
  }

  function createAutoDivIcon(className, html, options = {}) {
    return L.divIcon({
      className,
      html,
      iconSize: null,
      iconAnchor: [0, 0],
      pane: options.pane || undefined
    });
  }

  function createStackedBadgeIcon(districtId, className, html, stackRole) {
    const roleBaseOffset = {
      indicator: 20,
      description: 44,
      keyword: 84
    };

    const sequenceOffset = bubbleStackRegistry.get(districtId) || 0;
    bubbleStackRegistry.set(districtId, sequenceOffset + 6);
    const currentOffset = (roleBaseOffset[stackRole] || 36) + sequenceOffset;

    const stackedClassName = `${className} bubble-stack`;
    const wrappedHtml = `<div class="bubble-stack-inner" style="--bubble-offset:${currentOffset}px">${html}</div>`;
    return createAutoDivIcon(stackedClassName, wrappedHtml, { pane: BADGE_PANE });
  }


  function isDirectlyConnected(districtA, districtB) {
    const connections = districtConnections.get(districtA);
    return connections ? connections.has(districtB) : false;
  }

  function getConnectedDistrictIds(districtId) {
    if (!districtId || !districtConnections.has(districtId)) {
      return new Set();
    }
    return new Set(Array.from(districtConnections.get(districtId).keys()));
  }

  function isDistrictVisible() {
    return true;
  }

  function doesStateHaveActiveFilters() {
    return Boolean(state.searchText || state.selectedCostTiers.size > 0 || state.connectedToDistrictId);
  }

  function renderUrlOnly() {
    const params = new URLSearchParams();

    if (state.selectedDistrictId) {
      params.set(urlKeys.selectedDistrictId, String(state.selectedDistrictId));
    }

    TOGGLE_DEFS.forEach((toggle) => {
      if (state[toggle.key] !== toggle.default) {
        params.set(urlKeys[toggle.key], state[toggle.key] ? "1" : "0");
      }
    });

    if (state.searchText) {
      params.set(urlKeys.searchText, state.searchText);
    }
    if (state.selectedCostTiers.size > 0) {
      params.set(urlKeys.selectedCostTiers, Array.from(state.selectedCostTiers).join(","));
    }
    if (state.connectedToDistrictId) {
      params.set(urlKeys.connectedToDistrictId, String(state.connectedToDistrictId));
    }

    if (map) {
      const center = map.getCenter();
      const zoom = map.getZoom();
      params.set(urlKeys.mapView, `${center.lat.toFixed(5)},${center.lng.toFixed(5)},${zoom}`);
    }

    const query = params.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }

  function readStateFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const selectedDistrictId = parseInteger(params.get(urlKeys.selectedDistrictId));
    if (selectedDistrictId && districtById.has(selectedDistrictId)) {
      state.selectedDistrictId = selectedDistrictId;
    }

    TOGGLE_DEFS.forEach((toggle) => {
      const value = params.get(urlKeys[toggle.key]);
      if (value === "1") {
        state[toggle.key] = true;
      } else if (value === "0") {
        state[toggle.key] = false;
      }
    });

    state.searchText = params.get(urlKeys.searchText) || "";
    state.selectedCostTiers = new Set(parseCsvParam(params.get(urlKeys.selectedCostTiers)));

    const connectedToDistrictId = parseInteger(params.get(urlKeys.connectedToDistrictId));
    if (connectedToDistrictId && districtById.has(connectedToDistrictId)) {
      state.connectedToDistrictId = connectedToDistrictId;
    }

    const mapView = parseMapView(params.get(urlKeys.mapView));
    if (mapView) {
      state.mapView = mapView;
    }
  }

  function parseCsvParam(value) {
    if (!value) {
      return [];
    }
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  function parseInteger(value) {
    const parsed = Number.parseInt(String(value), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function parseMapView(value) {
    if (!value) {
      return null;
    }
    const parts = value.split(",");
    if (parts.length !== 3) {
      return null;
    }
    const lat = Number(parts[0]);
    const lng = Number(parts[1]);
    const zoom = Number(parts[2]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(zoom)) {
      return null;
    }
    return { lat, lng, zoom };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
