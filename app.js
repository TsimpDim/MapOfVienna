(function () {
  "use strict";

  const TOGGLE_DEFS = [
    { key: "showDistrictColors", label: "District colors", default: true, group: "Map essentials" },
    { key: "showDistrictFill", label: "District fill", default: true, group: "Map essentials" },
    { key: "showDistrictLabels", label: "District names", default: true, group: "Map essentials" },
    { key: "showDistrictNumbers", label: "District numbers", default: true, group: "Map essentials" },
    { key: "showCostIndicators", label: "Cost at a glance", default: true, group: "District story" },
    { key: "showKeywords", label: "Vibe keywords", default: false, group: "District story" },
    { key: "showLandmarks", label: "Landmarks", default: false, group: "District story" },
    { key: "showFood", label: "Cafés & restaurants", default: false, group: "District story" },
    { key: "showCost", label: "Cost notes", default: false, group: "District story" },
    { key: "showStations", label: "Major stations", default: true, group: "Transport" },
    { key: "showDirectConnections", label: "Direct connections", default: true, group: "Transport" },
    { key: "showUbahn", label: "U-Bahn lines", default: false, group: "Transit lines" },
    { key: "showSbahn", label: "S-Bahn lines", default: false, group: "Transit lines" },
    { key: "showTram", label: "Tram lines", default: false, group: "Transit lines" },
    { key: "showMainRoads", label: "Main roads", default: false, group: "Roads" },
    { key: "showSafety", label: "Safety areas", default: false, group: "Safety" }
  ];

  const BASE_VIEW = { lat: 48.2082, lng: 16.3738, zoom: 11 };
  const LABEL_PANE = "districtLabelsPane";
  const BADGE_PANE = "districtBadgesPane";

  const COST_STYLE = {
    very_expensive: { label: "Very expensive", color: "#eca9bb" },
    expensive: { label: "Expensive", color: "#f3b59f" },
    moderate: { label: "Moderate", color: "#f6df8a" },
    affordable: { label: "Affordable", color: "#a8d9c3" }
  };
  const SAFETY_LEVELS = {
    safe: { label: "Low crime", color: "#8ccf9b" },
    moderate: { label: "Average crime", color: "#f6df8a" },
    elevated: { label: "Higher crime", color: "#e0857c" }
  };
  const SAFETY_DATA = {
    1: { level: "elevated", text: "Pickpocketing and tourist-targeted petty crime around Stephansplatz and the old town, but violent crime is rare." },
    2: { level: "moderate", text: "Mostly relaxed; keep an eye on belongings around Praterstern station and crowded Prater areas." },
    3: { level: "moderate", text: "Occasional petty crime near Wien Mitte and busy shopping streets; residential parts are quiet." },
    4: { level: "moderate", text: "Fairly calm; pickpockets mostly work around Karlsplatz and the busy U1 corridor." },
    5: { level: "elevated", text: "Above-average property crime, especially along busy streets and nightlife spots; improving as the area gentrifies." },
    6: { level: "moderate", text: "Shopping crowds on Mariahilfer Straße attract pickpockets; nightlife corners stay lively late." },
    7: { level: "moderate", text: "Average crime; late-night bar streets see occasional petty incidents." },
    8: { level: "safe", text: "One of Vienna's calmest districts; crime is rare and mostly limited to bicycle theft." },
    9: { level: "safe", text: "Low crime in this student and university area; occasional bike theft only." },
    10: { level: "elevated", text: "Higher property crime, focused around Reumannplatz and train stations; daytime is generally fine." },
    11: { level: "elevated", text: "Property crime clusters near U3 stations; quiet residential streets are much calmer." },
    12: { level: "moderate", text: "Average crime with some incidents around Meidling station; side streets stay peaceful." },
    13: { level: "safe", text: "Very low crime; the villa neighborhoods are among the safest in the city." },
    14: { level: "moderate", text: "Low-to-average crime in mostly calm residential areas." },
    15: { level: "elevated", text: "Among Vienna's higher-crime districts; busy squares, Westbahnhof and nightlife areas see most incidents." },
    16: { level: "elevated", text: "Above-average petty and property crime around Brunnenmarkt and Yppenplatz; fine during the day." },
    17: { level: "moderate", text: "Average crime; suburban calm with occasional petty incidents near stations." },
    18: { level: "safe", text: "Very low crime in quiet, green residential streets." },
    19: { level: "safe", text: "Among Vienna's safest; wealthy residential hills with minimal incidents." },
    20: { level: "elevated", text: "Elevated property crime near Millennium City and Handelskai; daytime is generally safe." },
    21: { level: "moderate", text: "Average crime, concentrated around Floridsdorf station; otherwise suburban." },
    22: { level: "moderate", text: "Large and mostly suburban; incidents cluster near malls and transport hubs." },
    23: { level: "safe", text: "Very low crime in the calm southern suburbs." }
  };
  const SAFETY_SPOTS = [
    { name: "Stephansplatz & Graben", districtId: 1, lat: 48.2085, lng: 16.3725, radius: 750, level: "elevated", text: "Tourist crowds and shopping lanes draw pickpockets; violent crime stays rare." },
    { name: "Hofburg & Heldenplatz", districtId: 1, lat: 48.2067, lng: 16.3657, radius: 700, level: "moderate", text: "Busy sightseeing area; petty theft around queues and photo spots." },
    { name: "Rathaus quarter", districtId: 1, lat: 48.2105, lng: 16.3574, radius: 600, level: "safe", text: "Government and festival grounds; generally calm even during events." },
    { name: "Praterstern", districtId: 2, lat: 48.2197, lng: 16.3923, radius: 800, level: "elevated", text: "The station surroundings see most of the district's property crime." },
    { name: "Prater park", districtId: 2, lat: 48.2060, lng: 16.4100, radius: 1000, level: "moderate", text: "Crowded amusement areas attract pickpockets; keep bags closed." },
    { name: "Augarten", districtId: 2, lat: 48.2263, lng: 16.3772, radius: 700, level: "safe", text: "Quiet park and residential streets; low crime." },
    { name: "Wien Mitte", districtId: 3, lat: 48.2062, lng: 16.3841, radius: 700, level: "elevated", text: "Station and mall crowds see pickpocketing and bicycle theft." },
    { name: "Belvedere", districtId: 3, lat: 48.1915, lng: 16.3808, radius: 800, level: "safe", text: "Embassy and palace quarter; among the calmest corners of the district." },
    { name: "Karlsplatz", districtId: 4, lat: 48.2003, lng: 16.3698, radius: 700, level: "elevated", text: "Busy transit and student hub; keep valuables close after dark." },
    { name: "Freihausviertel", districtId: 4, lat: 48.1930, lng: 16.3620, radius: 600, level: "safe", text: "Student lanes near the Naschmarkt; calm and social." },
    { name: "Reinprechtsdorfer Straße", districtId: 5, lat: 48.1850, lng: 16.3540, radius: 700, level: "elevated", text: "Lively thoroughfare with above-average property crime at night." },
    { name: "Margaretenplatz", districtId: 5, lat: 48.1917, lng: 16.3575, radius: 600, level: "moderate", text: "Quieter than the main roads; normal caution at night." },
    { name: "Mariahilfer Straße", districtId: 6, lat: 48.1985, lng: 16.3510, radius: 800, level: "elevated", text: "Vienna's shopping mile attracts pickpockets year-round." },
    { name: "Naschmarkt", districtId: 6, lat: 48.1981, lng: 16.3601, radius: 700, level: "moderate", text: "Lively market crowds; watch wallets while browsing." },
    { name: "MuseumsQuartier", districtId: 7, lat: 48.2033, lng: 16.3581, radius: 700, level: "moderate", text: "Late-night bar crowds bring occasional scuffles and thefts." },
    { name: "Spittelberg", districtId: 7, lat: 48.2028, lng: 16.3547, radius: 500, level: "safe", text: "Small, well-kept lanes; low crime." },
    { name: "Theater district", districtId: 8, lat: 48.2096, lng: 16.3492, radius: 600, level: "safe", text: "Vienna's smallest district is consistently calm." },
    { name: "Franz-Josefs-Bahnhof", districtId: 9, lat: 48.2261, lng: 16.3603, radius: 600, level: "moderate", text: "Station area sees occasional petty crime." },
    { name: "University quarter", districtId: 9, lat: 48.2135, lng: 16.3580, radius: 600, level: "safe", text: "Student neighborhood; mostly bicycle theft." },
    { name: "Reumannplatz", districtId: 10, lat: 48.1745, lng: 16.3783, radius: 800, level: "elevated", text: "The south's busiest square; property crime concentrates here." },
    { name: "Hauptbahnhof", districtId: 10, lat: 48.1851, lng: 16.3732, radius: 800, level: "elevated", text: "Large station crowds; pickpocketing around entrances." },
    { name: "Oberlaa", districtId: 10, lat: 48.1404, lng: 16.4025, radius: 900, level: "safe", text: "Green southern suburb; calm and residential." },
    { name: "Simmering station", districtId: 11, lat: 48.1705, lng: 16.4208, radius: 800, level: "elevated", text: "The U3 corridor has the district's highest incident rate." },
    { name: "Zentralfriedhof", districtId: 11, lat: 48.1517, lng: 16.4402, radius: 900, level: "safe", text: "Cemetery and green surroundings; very quiet." },
    { name: "Bahnhof Meidling", districtId: 12, lat: 48.1743, lng: 16.3339, radius: 700, level: "elevated", text: "Busy interchange; watch luggage and pockets." },
    { name: "Meidlinger Markt", districtId: 12, lat: 48.1786, lng: 16.3323, radius: 600, level: "moderate", text: "Market days bring crowds; normal caution." },
    { name: "Hetzendorf", districtId: 12, lat: 48.1672, lng: 16.3089, radius: 800, level: "safe", text: "Residential villas; low crime." },
    { name: "Schönbrunn", districtId: 13, lat: 48.1848, lng: 16.3122, radius: 1000, level: "safe", text: "Palace grounds and villas; among the city's safest." },
    { name: "Hietzing village", districtId: 13, lat: 48.1883, lng: 16.3039, radius: 800, level: "safe", text: "Calm, wealthy neighborhood." },
    { name: "Hütteldorf", districtId: 14, lat: 48.1980, lng: 16.2580, radius: 700, level: "moderate", text: "Station and shopping center; occasional petty crime." },
    { name: "Auhof", districtId: 14, lat: 48.2100, lng: 16.2300, radius: 900, level: "safe", text: "Suburban calm toward the Wienerwald." },
    { name: "Westbahnhof & Gürtel", districtId: 15, lat: 48.1967, lng: 16.3392, radius: 800, level: "elevated", text: "Nightlife and station crowds; most incidents happen here." },
    { name: "Stadthalle", districtId: 15, lat: 48.2020, lng: 16.3340, radius: 700, level: "moderate", text: "Event crowds attract pickpockets during concerts." },
    { name: "Schmelz", districtId: 15, lat: 48.1950, lng: 16.3150, radius: 700, level: "moderate", text: "Calmer residential west; normal caution." },
    { name: "Brunnenmarkt & Yppenplatz", districtId: 16, lat: 48.2140, lng: 16.3360, radius: 800, level: "elevated", text: "Market and nightlife streets see the district's most crime." },
    { name: "Ottakring station", districtId: 16, lat: 48.2110, lng: 16.3110, radius: 600, level: "moderate", text: "Transit area; occasional petty theft." },
    { name: "Wilhelminenberg", districtId: 16, lat: 48.2260, lng: 16.2800, radius: 900, level: "safe", text: "Hilly residential area; very calm." },
    { name: "Hernals station", districtId: 17, lat: 48.2230, lng: 16.3180, radius: 700, level: "moderate", text: "Station surroundings see most local incidents." },
    { name: "Dornbach", districtId: 17, lat: 48.2300, lng: 16.2920, radius: 800, level: "safe", text: "Suburban greenery; low crime." },
    { name: "Volksoper quarter", districtId: 18, lat: 48.2240, lng: 16.3489, radius: 700, level: "safe", text: "Residential shopping street; low crime." },
    { name: "Gersthof", districtId: 18, lat: 48.2340, lng: 16.3310, radius: 700, level: "safe", text: "Quiet residential streets." },
    { name: "Heiligenstadt", districtId: 19, lat: 48.2530, lng: 16.3650, radius: 700, level: "moderate", text: "Transit hub at the district edge; normal caution." },
    { name: "Kahlenberg hills", districtId: 19, lat: 48.2760, lng: 16.3330, radius: 1200, level: "safe", text: "Vineyards and villas; minimal incidents." },
    { name: "Millennium City", districtId: 20, lat: 48.2410, lng: 16.3860, radius: 800, level: "elevated", text: "Mall and riverside station; property crime above average." },
    { name: "Wallensteinplatz", districtId: 20, lat: 48.2310, lng: 16.3710, radius: 700, level: "moderate", text: "Neighborhood square; average crime." },
    { name: "Floridsdorf station", districtId: 21, lat: 48.2570, lng: 16.4010, radius: 800, level: "elevated", text: "Busy northern hub; watch valuables." },
    { name: "Alte Donau", districtId: 21, lat: 48.2320, lng: 16.4180, radius: 900, level: "safe", text: "Recreation lakes; calm family areas." },
    { name: "Donauzentrum", districtId: 22, lat: 48.2440, lng: 16.4270, radius: 800, level: "moderate", text: "Large mall crowds; occasional pickpocketing." },
    { name: "Seestadt", districtId: 22, lat: 48.2250, lng: 16.4960, radius: 900, level: "safe", text: "New residential development; very calm." },
    { name: "Alterlaa", districtId: 23, lat: 48.1480, lng: 16.3180, radius: 700, level: "moderate", text: "High-rise complex; average property crime." },
    { name: "Mauer", districtId: 23, lat: 48.1470, lng: 16.2650, radius: 800, level: "safe", text: "Villa suburb; among the safest." }
  ];
  const FOOD_DENSITY = {
    high: { label: "Café-rich", color: "#d9a679" },
    medium: { label: "Some cafés", color: "#e8d3a3" },
    low: { label: "Few cafés", color: "#efe3c6" }
  };
  const FOOD_SCENE = {
    1: { cafeDensity: "high", cuisines: ["grand coffee houses", "fine dining", "tourist classics"], text: "Vienna’s café capital: grand coffee houses and upscale restaurants, pricey and tourist-oriented." },
    2: { cafeDensity: "medium", cuisines: ["Prater beer gardens", "family bistros", "Japanese & Asian"], text: "Casual bistros, Prater classics and a strong Japanese dining scene around Mochi." },
    3: { cafeDensity: "medium", cuisines: ["fine dining", "market kitchens", "wine bars"], text: "From Steirereck fine dining to Rochusmarkt kitchens and evening wine bars." },
    4: { cafeDensity: "high", cuisines: ["student cafés", "brunch spots", "international"], text: "Café-dense student district with a big brunch culture around the Freihausviertel." },
    5: { cafeDensity: "medium", cuisines: ["multicultural eateries", "street food", "gentrifying bistros"], text: "Multicultural cheap eats and street food mix with new-wave bistros." },
    6: { cafeDensity: "high", cuisines: ["shopping-street cafés", "Naschmarkt stalls", "bookshop cafés"], text: "Dense café scene along Mariahilfer Straße and around the Naschmarkt." },
    7: { cafeDensity: "high", cuisines: ["specialty coffee", "international bistros", "nightlife bars"], text: "Vienna’s creative hub: specialty coffee and small international kitchens." },
    8: { cafeDensity: "medium", cuisines: ["classic cafés", "theater bistros"], text: "Traditional cafés and cozy bistros; quieter and proudly local." },
    9: { cafeDensity: "medium", cuisines: ["student cafés", "beer gardens", "ethnic eats"], text: "Student-friendly cafés, the Stiegl beer garden and international kitchens." },
    10: { cafeDensity: "medium", cuisines: ["ethnic diversity", "street food", "southern Heurigen"], text: "Wide ethnic choice from Balkan to Asian, plus Heurigen in Oberlaa; café scene thinner." },
    11: { cafeDensity: "low", cuisines: ["traditional Gasthäuser", "local pubs"], text: "Few cafés; traditional Gasthäuser and a grand coffee house near the cemetery." },
    12: { cafeDensity: "medium", cuisines: ["market kitchens", "Neapolitan pizza", "French cafés"], text: "Meidlinger Markt is the food center; good pizza and cafés around it." },
    13: { cafeDensity: "low", cuisines: ["classic coffee houses", "Schönbrunn cafés", "wine bars"], text: "Quiet café culture near Schönbrunn; few late-night spots." },
    14: { cafeDensity: "low", cuisines: ["local bistros", "Hütteldorf eateries"], text: "Sparse but friendly local scene around Hütteldorf; not a dining destination." },
    15: { cafeDensity: "medium", cuisines: ["international diversity", "street food", "market stands"], text: "Dense international eateries around Westbahnhof and Kriemhildplatz cafés." },
    16: { cafeDensity: "medium", cuisines: ["Balkan grills", "market street food", "wine bars"], text: "Brunnenmarkt and Yppenplatz anchor a lively Balkan and wine scene." },
    17: { cafeDensity: "low", cuisines: ["Wiener Beisl", "Wienerwald dining", "wine taverns"], text: "Scattered traditional Beisl and hillside dining; café scene thin." },
    18: { cafeDensity: "low", cuisines: ["neighborhood cafés", "styrian bistros"], text: "Calm neighborhood cafés; limited but quality dining." },
    19: { cafeDensity: "medium", cuisines: ["Heurigen", "fine dining", "village cafés"], text: "Heurigen country in Grinzing and Sievering, plus Amador fine dining." },
    20: { cafeDensity: "medium", cuisines: ["international street food", "canal bars", "neighborhood bistros"], text: "Multicultural eateries along Wallensteinstraße; fewer classic cafés." },
    21: { cafeDensity: "medium", cuisines: ["Stammersdorf Heurigen", "market stands", "local pubs"], text: "Suburban mix: Heurigen culture to the north, market stands and pubs near the Spitz." },
    22: { cafeDensity: "low", cuisines: ["mall food courts", "lakeside restaurants", "Kaisermühlen classics"], text: "Sparse scene: Donauzentrum food courts and Alte Donau terraces." },
    23: { cafeDensity: "low", cuisines: ["Heurigen", "village cafés", "market eats"], text: "Scattered Heurigen and village cafés; very quiet food scene." }
  };
  const DISTRICT_PALETTE = ["#f3b59f", "#a8d9c3", "#c5b8e7", "#a8d2e8", "#f6df8a", "#eca9bb"];
  const MAX_COMPARISON_DISTRICTS = 3;

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
    showDistrictFill: "df",
    showDistrictLabels: "dl",
    showDistrictNumbers: "dn",
    showKeywords: "kwv",
    showLandmarks: "lmv",
    showFood: "fdv",
    showCostIndicators: "csi",
    showCost: "csv",
    showStations: "stv",
    showDirectConnections: "cnv",
    showUbahn: "ubv",
    showSbahn: "sbv",
    showTram: "trv",
    showMainRoads: "mrv",
    showSafety: "sfv",
    searchText: "q",
    selectedCostTiers: "ct",
    connectedToDistrictId: "cd",
    comparisonDistrictIds: "cmp",
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
  let ubahnLayer;
  let sbahnLayer;
  let tramLayer;
  let mainRoadsLayer;
  let safetySpotLayer;
  let bubbleStackRegistry = new Map();
  let tooltipModeBound = "default";

  const ui = {};
  let suppressUrlSync = false;
  let shiftKeyHeld = false;

  let state = {
    selectedDistrictId: null,
    comparisonDistrictIds: new Set(),
    hoverDistrictId: null,
    activeSpecialHub: null,
    dualHubSelections: [],
    showDistrictColors: true,
    showDistrictFill: true,
    showDistrictLabels: true,
    showDistrictNumbers: true,
    showKeywords: false,
    showLandmarks: false,
    showFood: false,
    showCostIndicators: false,
    showCost: false,
    showStations: true,
    showDirectConnections: true,
    showUbahn: false,
    showSbahn: false,
    showTram: false,
    showMainRoads: false,
    showSafety: false,
    searchText: "",
    selectedCostTiers: new Set(),
    connectedToDistrictId: null,
    mapView: null
  };

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheUi();
    document.body.dataset.appState = "loading";

    try {
      dataset = await loadDataset();
      if (!dataset || !Array.isArray(dataset.features)) {
        throw new Error("Dataset is missing or invalid");
      }

      document.addEventListener("keydown", (e) => { if (e.key === "Shift") shiftKeyHeld = true; });
      document.addEventListener("keyup", (e) => { if (e.key === "Shift") shiftKeyHeld = false; });

      prepareData(dataset.features);
      readStateFromUrl();
      buildFilterControls();
      buildToggleControls();
      bindUiEvents();
      collapseSidebarByDefaultOnSmallScreens();
      initMap();
      renderAll();
      document.body.dataset.appState = "ready";
    } catch (error) {
      console.error("Map of Vienna could not initialize", error);
      showAppError();
    }
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
    return DISTRICT_PALETTE[(id - 1) % DISTRICT_PALETTE.length];
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cacheUi() {
    ui.layersPanelBody = document.getElementById("layersPanelBody");
    ui.layersToggleBtn = document.getElementById("layersToggleBtn");
    ui.legendPanelBody = document.getElementById("legendPanelBody");
    ui.legendToggleBtn = document.getElementById("legendToggleBtn");
    ui.panelCollapseBtn = document.getElementById("panelCollapseBtn");
    ui.panelCollapseIcon = ui.panelCollapseBtn ? ui.panelCollapseBtn.querySelector(".panel-collapse-icon") : null;
    ui.panelCollapseLabel = ui.panelCollapseBtn ? ui.panelCollapseBtn.querySelector(".panel-collapse-label") : null;
    ui.panel = document.querySelector(".panel");
    ui.costTierFilters = document.getElementById("costTierFilters");

    ui.districtSearch = document.getElementById("districtSearch");
    ui.connectedToDistrict = document.getElementById("connectedToDistrict");

    ui.clearFiltersBtn = document.getElementById("clearFiltersBtn");
    ui.clearSelectionBtn = document.getElementById("clearSelectionBtn");
    ui.resetMapBtn = document.getElementById("resetMapBtn");
    ui.districtInfo = document.getElementById("districtInfo");
    ui.comparisonInfo = document.getElementById("comparisonInfo");
    ui.mapStatus = document.getElementById("mapStatus");
    ui.mapEmpty = document.getElementById("mapEmpty");
    ui.mapEmptyClearBtn = document.getElementById("mapEmptyClearBtn");
    ui.mapError = document.getElementById("mapError");
    ui.retryLoadBtn = document.getElementById("retryLoadBtn");
  }

  function buildToggleControls() {
    if (!ui.layersPanelBody) { return; }
    ui.layersPanelBody.innerHTML = "";
    const groups = new Map();
    TOGGLE_DEFS.forEach((toggleDef) => {
      if (!groups.has(toggleDef.group)) {
        groups.set(toggleDef.group, []);
      }
      groups.get(toggleDef.group).push(toggleDef);
    });

    groups.forEach((toggleDefs, groupName) => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "control-group";
      const legend = document.createElement("legend");
      legend.textContent = groupName;
      const list = document.createElement("div");
      list.className = "toggle-list";

      toggleDefs.forEach((toggleDef) => {
        const label = document.createElement("label");
        label.className = "checkline";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(state[toggleDef.key]);
        checkbox.dataset.toggleKey = toggleDef.key;
        const span = document.createElement("span");
        span.textContent = toggleDef.label;
        label.append(checkbox, span);
        list.appendChild(label);
      });

      fieldset.append(legend, list);
      ui.layersPanelBody.appendChild(fieldset);
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

  function formatCostTier(value) {
    if (COST_STYLE[value]) {
      return COST_STYLE[value].label;
    }
    return value ? formatChipValue(value) : "Not listed";
  }

  function bindUiEvents() {
    ui.layersPanelBody.addEventListener("change", (event) => {
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
      state.comparisonDistrictIds = new Set();
      state.activeSpecialHub = null;
      state.dualHubSelections = [];
      renderAll();
    });

    ui.resetMapBtn.addEventListener("click", () => {
      state.selectedDistrictId = null;
      state.comparisonDistrictIds = new Set();
      state.activeSpecialHub = null;
      state.dualHubSelections = [];
      state.searchText = "";
      state.selectedCostTiers = new Set();
      state.connectedToDistrictId = null;
      TOGGLE_DEFS.forEach((toggle) => {
        state[toggle.key] = toggle.default;
      });
      buildFilterControls();
      buildToggleControls();
      if (map && districtLayer) {
        suppressUrlSync = true;
        map.fitBounds(districtLayer.getBounds(), { padding: [28, 28] });
        suppressUrlSync = false;
      }
      renderAll();
    });

    ui.comparisonInfo.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-remove-comparison]");
      if (!button) {
        return;
      }
      const districtId = Number(button.dataset.removeComparison);
      state.comparisonDistrictIds.delete(districtId);
      if (state.selectedDistrictId === districtId) {
        state.selectedDistrictId = Array.from(state.comparisonDistrictIds).at(-1) || null;
      }
      renderAll();
    });

    ui.mapEmptyClearBtn.addEventListener("click", () => {
      state.searchText = "";
      state.selectedCostTiers = new Set();
      state.connectedToDistrictId = null;
      buildFilterControls();
      renderAll();
    });

    ui.retryLoadBtn.addEventListener("click", () => window.location.reload());

    ui.layersToggleBtn.addEventListener("click", () => toggleRightPanel("layers"));
    ui.legendToggleBtn.addEventListener("click", () => toggleRightPanel("legend"));
    ui.panelCollapseBtn.addEventListener("click", toggleSidebarPanel);
  }

  function toggleRightPanel(panel) {
    const toggleBtn = panel === "layers" ? ui.layersToggleBtn : ui.legendToggleBtn;
    const body = panel === "layers" ? ui.layersPanelBody : ui.legendPanelBody;
    const isOpen = !body.hidden;
    body.hidden = isOpen;
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  }

  function setSidebarCollapsed(isCollapsed) {
    if (!ui.panel) { return; }
    ui.panel.classList.toggle("collapsed", isCollapsed);
    if (ui.panelCollapseBtn) {
      ui.panelCollapseBtn.classList.toggle("active", isCollapsed);
      ui.panelCollapseBtn.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
      ui.panelCollapseBtn.title = isCollapsed ? "Expand sidebar" : "Collapse sidebar";
    }
  }

  function toggleSidebarPanel() {
    if (!ui.panel) { return; }
    setSidebarCollapsed(!ui.panel.classList.contains("collapsed"));
  }

  function collapseSidebarByDefaultOnSmallScreens() {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setSidebarCollapsed(true);
    }
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
      zoomControl: false,
      minZoom: 10,
      maxZoom: 15,
      attributionControl: false
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    createOverlayPanes();

    canvasRenderer = L.canvas({ padding: 0.2 });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
      subdomains: "abcd"
    }).addTo(map);

    districtLayer = L.geoJSON({ type: "FeatureCollection", features: districts }, {
      renderer: canvasRenderer,
      style: styleForDistrictLayer,
      onEachFeature: (feature, layer) => {
        const districtId = feature.properties._districtId;
        districtLayerById.set(districtId, layer);

        layer.bindTooltip(`${districtId}. ${escapeHtml(feature.properties.name)}`, {
          className: "station-tooltip",
          direction: "top",
          sticky: true
        });

        layer.on("click", (event) => {
          const additiveSelection = Boolean(event.originalEvent?.ctrlKey || event.originalEvent?.metaKey);
          selectDistrict(districtId, additiveSelection);
        });
        layer.on("mouseover", () => {
          state.hoverDistrictId = districtId;
          const effectiveHub = state.activeSpecialHub || (state.dualHubSelections.length === 1 ? state.dualHubSelections[0] : null);
          renderDistrictStyles(
            computeMatchingDistrictIds(),
            effectiveHub ? computeSpecialHubConnectedDistricts(effectiveHub) : new Set(),
            computeDualHubConnectedDistricts()
          );
        });
        layer.on("mouseout", () => {
          state.hoverDistrictId = null;
          const effectiveHub = state.activeSpecialHub || (state.dualHubSelections.length === 1 ? state.dualHubSelections[0] : null);
          renderDistrictStyles(
            computeMatchingDistrictIds(),
            effectiveHub ? computeSpecialHubConnectedDistricts(effectiveHub) : new Set(),
            computeDualHubConnectedDistricts()
          );
        });
      }
    }).addTo(map);

    labelLayer = L.layerGroup().addTo(map);
    keywordLayer = L.layerGroup().addTo(map);
    landmarkLayer = L.layerGroup().addTo(map);
    costIndicatorLayer = L.layerGroup().addTo(map);
    costLayer = L.layerGroup().addTo(map);
    safetySpotLayer = L.layerGroup().addTo(map);
    stationLayer = L.layerGroup().addTo(map);
    connectionLineLayer = L.layerGroup().addTo(map);
    ubahnLayer = L.layerGroup().addTo(map);
    sbahnLayer = L.layerGroup().addTo(map);
    tramLayer = L.layerGroup().addTo(map);
    mainRoadsLayer = L.layerGroup().addTo(map);

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

  function selectDistrict(districtId, additiveSelection) {
    state.activeSpecialHub = null;
    state.dualHubSelections = [];

    if (!additiveSelection) {
      if (state.selectedDistrictId === districtId) {
        state.selectedDistrictId = null;
        state.comparisonDistrictIds = new Set();
        renderAll();
        return;
      }
      state.comparisonDistrictIds = new Set([districtId]);
      state.selectedDistrictId = districtId;
      renderAll();
      return;
    }

    if (state.comparisonDistrictIds.has(districtId)) {
      state.comparisonDistrictIds.delete(districtId);
      state.selectedDistrictId = Array.from(state.comparisonDistrictIds).at(-1) || null;
      renderAll();
      return;
    }

    if (state.comparisonDistrictIds.size >= MAX_COMPARISON_DISTRICTS) {
      setMapStatus(`Your desk holds ${MAX_COMPARISON_DISTRICTS} districts. Remove one before adding another.`);
      return;
    }

    state.comparisonDistrictIds.add(districtId);
    state.selectedDistrictId = districtId;
    renderAll();
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
    if (!state.selectedDistrictId && !state.activeSpecialHub && !state.dualHubSelections.length) {
      return;
    }
    state.selectedDistrictId = null;
    state.comparisonDistrictIds = new Set();
    state.activeSpecialHub = null;
    state.dualHubSelections = [];
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

  function computeDualHubConnectedDistricts() {
    if (state.dualHubSelections.length !== 2) {
      return new Set();
    }
    const connected0 = computeSpecialHubConnectedDistricts(state.dualHubSelections[0]);
    const connected1 = computeSpecialHubConnectedDistricts(state.dualHubSelections[1]);
    return new Set([...connected0].filter((id) => connected1.has(id)));
  }

  function styleForDistrictLayer(feature) {
    const districtId = feature.properties._districtId;
    const matchSet = computeMatchingDistrictIds();
    const effectiveHub = state.activeSpecialHub || (state.dualHubSelections.length === 1 ? state.dualHubSelections[0] : null);
    const hubConnected = effectiveHub ? computeSpecialHubConnectedDistricts(effectiveHub) : new Set();
    const dualHubConnected = computeDualHubConnectedDistricts();
    return districtStyleById(districtId, matchSet, hubConnected, dualHubConnected);
  }

  function districtStyleById(districtId, matchSet, hubConnected, dualHubConnected) {
    const district = districtById.get(districtId);
    const isSelected = districtId === state.selectedDistrictId;
    const isCompared = state.comparisonDistrictIds.has(districtId) && !isSelected;
    const isHovered = districtId === state.hoverDistrictId;
    const connectedIds = state.showDirectConnections ? getConnectedDistrictIds(state.selectedDistrictId) : new Set();
    const isConnected = connectedIds.has(districtId);
    const hasActiveFilters = doesStateHaveActiveFilters();
    const isMatch = matchSet.has(districtId);
    const effectiveHub = state.activeSpecialHub || (state.dualHubSelections.length === 1 ? state.dualHubSelections[0] : null);
    const isHubConnected = effectiveHub && hubConnected && hubConnected.has(districtId);
    const hubKind = effectiveHub?.specialKind;
    const isDualHubConnected = dualHubConnected && dualHubConnected.has(districtId);

    const hasActiveSelection = Boolean(state.selectedDistrictId || effectiveHub || state.dualHubSelections.length);
    const isBackground = hasActiveSelection && !isSelected && !isCompared && !isConnected && !isHubConnected && !isDualHubConnected;

    const safety = state.showSafety ? SAFETY_DATA[districtId] : null;
    const safetyFillColor = safety ? ((SAFETY_LEVELS[safety.level] || {}).color || "#f5ead6") : null;
    const food = !safety && state.showFood ? FOOD_SCENE[districtId] : null;
    const foodFillColor = food ? ((FOOD_DENSITY[food.cafeDensity] || {}).color || "#f5ead6") : null;
    const overlayFillColor = safetyFillColor || foodFillColor;
    const baseFill = overlayFillColor
      ? overlayFillColor
      : (state.showDistrictColors ? district.properties._color : "#f5ead6");

    let fillColor;
    if (overlayFillColor) {
      fillColor = hasActiveFilters && !isMatch ? "#d0cdc5" : overlayFillColor;
    } else if (isSelected) {
      fillColor = "#f08b62";
    } else if (isCompared) {
      fillColor = "#eca9bb";
    } else if (isConnected) {
      fillColor = "#94d3c0";
    } else if (isDualHubConnected) {
      fillColor = "#f6df8a";
    } else if (isHubConnected) {
      fillColor = hubKind === "airport" ? "#c5b8e7" : "#f3b59f";
    } else if (isMatch && hasActiveFilters) {
      fillColor = "#a8d9c3";
    } else if (hasActiveFilters && !isMatch) {
      fillColor = "#d0cdc5";
    } else if (isBackground) {
      fillColor = "#d0cdc5";
    } else {
      fillColor = baseFill;
    }

    let borderColor;
    if (isSelected) {
      borderColor = "#39342e";
    } else if (isHovered) {
      borderColor = "#39342e";
    } else if (isConnected) {
      borderColor = "#397b68";
    } else if (isDualHubConnected) {
      borderColor = "#8b7430";
    } else if (isHubConnected) {
      borderColor = hubKind === "airport" ? "#625785" : "#a64e49";
    } else if (hasActiveFilters && !isMatch) {
      borderColor = "#b8b4ac";
    } else if (isBackground) {
      borderColor = "#b8b4ac";
    } else {
      borderColor = "#39342e";
    }

    let weight;
    if (isSelected) {
      weight = 3;
    } else if (isHovered) {
      weight = 2.5;
    } else if (isCompared) {
      weight = 2.4;
    } else if (isConnected || isDualHubConnected || isHubConnected) {
      weight = 2.2;
    } else if (isMatch && hasActiveFilters) {
      weight = 2;
    } else if (hasActiveFilters && !isMatch) {
      weight = 1;
    } else if (isBackground) {
      weight = 1;
    } else {
      weight = 1.5;
    }

    let fillOpacity;
    if (overlayFillColor) {
      if (isHovered) {
        fillOpacity = 0.68;
      } else if (hasActiveFilters && !isMatch) {
        fillOpacity = 0.18;
      } else if (isBackground) {
        fillOpacity = 0.30;
      } else {
        fillOpacity = 0.55;
      }
    } else if (isSelected) {
      fillOpacity = 0.85;
    } else if (isHovered) {
      fillOpacity = 0.80;
    } else if (hasActiveFilters && !isMatch) {
      fillOpacity = 0.45;
    } else if (isBackground) {
      fillOpacity = 0.45;
    } else if (isDualHubConnected || isHubConnected || (isMatch && hasActiveFilters)) {
      fillOpacity = 0.78;
    } else {
      fillOpacity = 0.50;
    }

    if (!state.showDistrictFill) {
      fillOpacity = 0;
    }

    return {
      color: borderColor,
      weight,
      fillColor,
      fillOpacity,
      opacity: hasActiveFilters && !isMatch && !isHubConnected && !isDualHubConnected ? 0.5 : (isBackground ? 0.5 : 1),
      dashArray: ""
    };
  }

  function renderAll() {
    bubbleStackRegistry = new Map();
    const matchSet = computeMatchingDistrictIds();
    const effectiveHub = state.activeSpecialHub || (state.dualHubSelections.length === 1 ? state.dualHubSelections[0] : null);
    const hubConnected = effectiveHub ? computeSpecialHubConnectedDistricts(effectiveHub) : new Set();
    const dualHubConnected = computeDualHubConnectedDistricts();
    renderDistrictStyles(matchSet, hubConnected, dualHubConnected);
    syncDistrictTooltips();
    renderSafetySpots(matchSet);
    renderLabels(matchSet);
    renderCostIndicators(matchSet);
    renderCostBadges(matchSet);
    renderKeywords(matchSet);
    renderLandmarks(matchSet);
    renderStations(matchSet, dualHubConnected);
    renderConnectionLines(matchSet, hubConnected, dualHubConnected);
    renderMainRoads();
    renderUbahnLines();
    renderSbahnLines();
    renderTramLines();
    renderComparisonInfo();
    renderSelectedDistrictInfo();
    renderLegend();
    renderMapFeedback(matchSet);
    renderUrlOnly();
  }

  function renderDistrictStyles(matchSet, hubConnected, dualHubConnected) {
    districtLayer.eachLayer((layer) => {
      const districtId = layer.feature.properties._districtId;
      layer.setStyle(districtStyleById(districtId, matchSet, hubConnected, dualHubConnected));
    });
  }

  function syncDistrictTooltips() {
    let tooltipMode = "default";
    if (state.showSafety) {
      tooltipMode = "safety";
    } else if (state.showFood) {
      tooltipMode = "food";
    }
    if (tooltipMode === tooltipModeBound) {
      return;
    }
    tooltipModeBound = tooltipMode;

    districtLayer.eachLayer((layer) => {
      layer.unbindTooltip();
      if (tooltipMode === "safety") {
        layer.bindTooltip(buildSafetyTooltipHtml(layer.feature), {
          className: "safety-tooltip",
          direction: "top",
          sticky: true
        });
        return;
      }
      if (tooltipMode === "food") {
        layer.bindTooltip(buildFoodSceneTooltipHtml(layer.feature), {
          className: "food-tooltip",
          direction: "top",
          sticky: true
        });
        return;
      }
      layer.bindTooltip(
        `${layer.feature.properties._districtId}. ${escapeHtml(layer.feature.properties.name)}`,
        {
          className: "station-tooltip",
          direction: "top",
          sticky: true
        }
      );
    });
  }

  function buildSafetyTooltipHtml(feature) {
    const properties = feature.properties;
    const districtId = properties._districtId;
    const safety = SAFETY_DATA[districtId];
    if (!safety) {
      return `${districtId}. ${escapeHtml(properties.name)}`;
    }
    const level = SAFETY_LEVELS[safety.level] || SAFETY_LEVELS.moderate;
    return (
      `<div class="safety-tooltip-title">${districtId}. ${escapeHtml(properties.name)}</div>` +
      `<div class="safety-tooltip-level" style="background:${level.color}">${escapeHtml(level.label)}</div>` +
      `<div class="safety-tooltip-text">${escapeHtml(safety.text)}</div>`
    );
  }

  function renderSafetySpots(matchSet) {
    safetySpotLayer.clearLayers();
    if (!state.showSafety) {
      return;
    }

    SAFETY_SPOTS.forEach((spot) => {
      if (!isDistrictVisible(spot.districtId, matchSet)) {
        return;
      }

      const level = SAFETY_LEVELS[spot.level] || SAFETY_LEVELS.moderate;
      const circle = L.circle([spot.lat, spot.lng], {
        renderer: canvasRenderer,
        radius: spot.radius || 700,
        color: level.color,
        weight: 1.2,
        opacity: 0.9,
        fillColor: level.color,
        fillOpacity: 0.38
      });

      circle.bindTooltip(buildSafetySpotTooltipHtml(spot, level), {
        className: "safety-tooltip",
        direction: "top",
        sticky: true
      });

      circle.on("click", (event) => {
        const additiveSelection = Boolean(event.originalEvent?.ctrlKey || event.originalEvent?.metaKey);
        selectDistrict(spot.districtId, additiveSelection);
      });

      safetySpotLayer.addLayer(circle);
    });
  }

  function buildSafetySpotTooltipHtml(spot, level) {
    const district = districtById.get(spot.districtId);
    const districtLabel = district
      ? `${spot.districtId}. ${district.properties.name}`
      : `District ${spot.districtId}`;
    return (
      `<div class="safety-tooltip-title">${escapeHtml(spot.name)}</div>` +
      `<div class="safety-tooltip-level" style="background:${level.color}">${escapeHtml(level.label)}</div>` +
      `<div class="safety-tooltip-text">${escapeHtml(spot.text)}</div>` +
      `<div class="safety-tooltip-district">${escapeHtml(districtLabel)}</div>`
    );
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

      const isDim = doesStateHaveActiveFilters() && !matchSet.has(districtId);
      const marker = L.marker([properties._centroid.lat, properties._centroid.lng], {
        keyboard: false,
        interactive: false,
        pane: LABEL_PANE,
        icon: createAutoDivIcon(`district-label${isDim ? " dim" : ""}`, escapeHtml(text), { pane: LABEL_PANE })
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
          color: "#39342e",
          weight: 1,
          fillColor: "#f6df8a",
          fillOpacity: 1
        });

        marker.bindTooltip(`${escapeHtml(landmark.name)}<br>${districtId}. ${escapeHtml(properties.name)}`, {
          direction: "top"
        });

        landmarkLayer.addLayer(marker);
      });
    });
  }

  function buildFoodSceneTooltipHtml(feature) {
    const properties = feature.properties;
    const districtId = properties._districtId;
    const scene = FOOD_SCENE[districtId];
    if (!scene) {
      return `${districtId}. ${escapeHtml(properties.name)}`;
    }
    const density = FOOD_DENSITY[scene.cafeDensity] || FOOD_DENSITY.medium;
    const tags = (scene.cuisines || [])
      .map((cuisine) => `<span class="food-tooltip-tag">${escapeHtml(cuisine)}</span>`)
      .join("");
    return (
      `<div class="food-tooltip-title">${districtId}. ${escapeHtml(properties.name)}</div>` +
      `<div class="food-tooltip-type" style="background:${density.color}">${escapeHtml(density.label)}</div>` +
      `<div class="food-tooltip-tags">${tags}</div>` +
      `<div class="food-tooltip-text">${escapeHtml(scene.text)}</div>`
    );
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

  function renderStations(matchSet, dualHubConnected) {
    stationLayer.clearLayers();
    if (!state.showStations) {
      return;
    }

    const dualSelectedSet = new Set(state.dualHubSelections.map((s) => s.id));

    stations.forEach((station) => {
      if (!isDistrictVisible(station.districtId, matchSet)) {
        return;
      }

      const linesText = station.lines.length ? ` (${station.lines.join(", ")})` : "";
      const tooltipContent = `${escapeHtml(station.name)}${escapeHtml(linesText)}`;
      const isDualSelected = dualSelectedSet.has(station.id);

      if (station.specialKind === "hbf") {
        const hbfClass = isDualSelected ? "station-icon station-hbf dual-selected" : "station-icon station-hbf";
        const marker = L.marker([station.lat, station.lng], {
          keyboard: false,
          interactive: true,
          icon: L.divIcon({
            className: hbfClass,
            html: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#a64e49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="20" r="1.5" fill="#a64e49" stroke="none"/><circle cx="16" cy="20" r="1.5" fill="#a64e49" stroke="none"/><path d="M8 17l-2 3"/><path d="M16 17l2 3"/></svg>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        });

        marker.on("click", (event) => {
          const shiftPressed = shiftKeyHeld || (event.originalEvent && event.originalEvent.shiftKey);
          if (shiftPressed) {
            if (state.activeSpecialHub && state.activeSpecialHub.id === station.id) {
              state.activeSpecialHub = null;
            } else if (state.activeSpecialHub && state.activeSpecialHub.id !== station.id) {
              state.dualHubSelections = [state.activeSpecialHub, station];
              state.activeSpecialHub = null;
            } else {
              const idx = state.dualHubSelections.findIndex((s) => s.id === station.id);
              if (idx !== -1) {
                state.dualHubSelections.splice(idx, 1);
              } else if (state.dualHubSelections.length < 2) {
                state.dualHubSelections.push(station);
              }
            }
            state.selectedDistrictId = null;
            state.comparisonDistrictIds = new Set();
            renderAll();
            return;
          }
          if (state.activeSpecialHub && state.activeSpecialHub.id === station.id) {
            state.activeSpecialHub = null;
          } else {
            state.activeSpecialHub = station;
            state.selectedDistrictId = null;
            state.comparisonDistrictIds = new Set();
          }
          state.dualHubSelections = [];
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
        const airportClass = isDualSelected ? "station-icon station-airport dual-selected" : "station-icon station-airport";
        const marker = L.marker([station.lat, station.lng], {
          keyboard: false,
          interactive: true,
          icon: L.divIcon({
            className: airportClass,
            html: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#625785" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        });

        marker.on("click", (event) => {
          const shiftPressed = shiftKeyHeld || (event.originalEvent && event.originalEvent.shiftKey);
          if (shiftPressed) {
            if (state.activeSpecialHub && state.activeSpecialHub.id === station.id) {
              state.activeSpecialHub = null;
            } else if (state.activeSpecialHub && state.activeSpecialHub.id !== station.id) {
              state.dualHubSelections = [state.activeSpecialHub, station];
              state.activeSpecialHub = null;
            } else {
              const idx = state.dualHubSelections.findIndex((s) => s.id === station.id);
              if (idx !== -1) {
                state.dualHubSelections.splice(idx, 1);
              } else if (state.dualHubSelections.length < 2) {
                state.dualHubSelections.push(station);
              }
            }
            state.selectedDistrictId = null;
            state.comparisonDistrictIds = new Set();
            renderAll();
            return;
          }
          if (state.activeSpecialHub && state.activeSpecialHub.id === station.id) {
            state.activeSpecialHub = null;
          } else {
            state.activeSpecialHub = station;
            state.selectedDistrictId = null;
            state.comparisonDistrictIds = new Set();
          }
          state.dualHubSelections = [];
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
        color: "#39342e",
        weight: 1.3,
        fillColor: "#a8d2e8",
        fillOpacity: 1
      });

      marker.on("click", () => selectDistrict(station.districtId, false));

      marker.bindTooltip(tooltipContent, {
        className: "station-tooltip",
        direction: "top"
      });

      stationLayer.addLayer(marker);
    });
  }

  function renderConnectionLines(matchSet, hubConnected, dualHubConnected) {
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
            color: "#397b68",
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

    const effectiveHub = state.activeSpecialHub || (state.dualHubSelections.length === 1 ? state.dualHubSelections[0] : null);
    const isDualHubMode = state.dualHubSelections.length === 2;

    if (effectiveHub && !isDualHubMode) {
      const hub = effectiveHub;
      const hubColor = hub.specialKind === "airport" ? "#625785" : "#a64e49";
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

    if (state.dualHubSelections.length === 2 && dualHubConnected.size) {
      state.dualHubSelections.forEach((hub) => {
        const hubColor = hub.specialKind === "airport" ? "#625785" : "#a64e49";
        const hubDashArray = hub.specialKind === "airport" ? "2 8" : "12 6";

        dualHubConnected.forEach((districtId) => {
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
            `${escapeHtml(hub.name)} → ${districtId}. ${escapeHtml(district.properties.name)}`,
            { direction: "center" }
          );

          connectionLineLayer.addLayer(line);
        });
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
            ? { color: "#625785", dashArray: "2 8" }
            : { color: "#a64e49", dashArray: "12 6" };

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

  function renderUbahnLines() {
    ubahnLayer.clearLayers();
    if (!state.showUbahn) {
      return;
    }

    Object.keys(LINE_ROUTES).forEach((lineName) => {
      const style = LINE_STYLES[lineName];
      if (!style || style.mode !== "ubahn") {
        return;
      }

      const coords = LINE_ROUTES[lineName];
      if (!coords || coords.length < 2) {
        return;
      }

      const polyline = L.polyline(coords, {
        renderer: canvasRenderer,
        color: style.color,
        weight: 4.5,
        opacity: 0.92,
        dashArray: ""
      });

      polyline.bindTooltip(`<strong>${escapeHtml(lineName)}</strong>`, {
        className: "line-tooltip",
        direction: "top",
        sticky: true,
        offset: [0, -10]
      });

      ubahnLayer.addLayer(polyline);
    });
  }

  function renderSbahnLines() {
    sbahnLayer.clearLayers();
    if (!state.showSbahn) {
      return;
    }

    const displayLines = Object.keys(LINE_ROUTES).filter((name) => {
      const style = LINE_STYLES[name];
      return style && style.mode === "sbahn";
    });

    const sbahnOffset = 0.00035;
    const orderedLines = displayLines.sort();
    const half = (orderedLines.length - 1) / 2;

    orderedLines.forEach((lineName, index) => {
      const coords = LINE_ROUTES[lineName];
      if (!coords || coords.length < 2) {
        return;
      }

      const style = LINE_STYLES[lineName];
      const offsetLat = (index - half) * sbahnOffset;

      const offsetCoords = coords.map(function (pt) {
        return [pt[0] + offsetLat, pt[1]];
      });

      const polyline = L.polyline(offsetCoords, {
        renderer: canvasRenderer,
        color: style.color,
        weight: 3,
        opacity: 0.88,
        dashArray: ""
      });

      polyline.bindTooltip(`<strong>${escapeHtml(lineName)}</strong>`, {
        className: "line-tooltip",
        direction: "top",
        sticky: true,
        offset: [0, -10]
      });

      sbahnLayer.addLayer(polyline);
    });
  }

  function renderTramLines() {
    tramLayer.clearLayers();
    if (!state.showTram) {
      return;
    }

    TRAM_CORRIDORS.forEach(function (corridor) {
      if (!corridor.coords || corridor.coords.length < 2) {
        return;
      }

      const polyline = L.polyline(corridor.coords, {
        renderer: canvasRenderer,
        color: corridor.color,
        weight: 3,
        opacity: 0.88,
        dashArray: ""
      });

      polyline.bindTooltip(`<strong>Tram ${escapeHtml(corridor.label)}</strong>`, {
        className: "line-tooltip",
        direction: "top",
        sticky: true,
        offset: [0, -10]
      });

      tramLayer.addLayer(polyline);
    });
  }

  function renderMainRoads() {
    mainRoadsLayer.clearLayers();
    if (!state.showMainRoads) {
      return;
    }

    MAIN_ROUTES.forEach(function (road) {
      if (!road.coords || road.coords.length < 2) {
        return;
      }

      const polyline = L.polyline(road.coords, {
        renderer: canvasRenderer,
        color: road.color,
        weight: road.weight || 4,
        opacity: road.opacity || 0.9,
        dashArray: road.dashArray || ""
      });

      polyline.bindTooltip(`<strong>${escapeHtml(road.label)}</strong>`, {
        className: "line-tooltip",
        direction: "top",
        sticky: true,
        offset: [0, -10]
      });

      mainRoadsLayer.addLayer(polyline);
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

  function renderComparisonInfo() {
    const comparisonDistricts = Array.from(state.comparisonDistrictIds)
      .map((districtId) => districtById.get(districtId))
      .filter(Boolean);

    if (comparisonDistricts.length < 2) {
      ui.comparisonInfo.innerHTML = "";
      return;
    }

    ui.comparisonInfo.innerHTML = `
      <p class="comparison-label">Comparing ${comparisonDistricts.length} districts</p>
      <div class="comparison-set">
        ${comparisonDistricts.map(buildComparisonCard).join("")}
      </div>
    `;
  }

  function buildComparisonCard(feature) {
    const properties = feature.properties;
    const districtId = properties._districtId;
    const cost = properties.costOfLiving || {};
    const ubahnLines = properties.transport?.ubahn || [];
    const topKeywords = (properties.keywords || []).slice(0, 2).join(" · ") || "No keywords listed";

    return `
      <article class="compare-card">
        <button class="compare-remove" type="button" data-remove-comparison="${districtId}" aria-label="Remove ${escapeHtml(properties.name)} from comparison">×</button>
        <h3>${districtId}. ${escapeHtml(properties.name)}</h3>
        <p><strong>${escapeHtml(formatCostTier(cost.tier))}</strong> · ${escapeHtml(ubahnLines.length ? ubahnLines.join(", ") : "No U-Bahn")}</p>
        <p>${escapeHtml(topKeywords)}</p>
      </article>
    `;
  }

  function renderMapFeedback(matchSet) {
    const hasFilters = doesStateHaveActiveFilters();
    const resultCount = matchSet.size;
    const selectedCount = state.comparisonDistrictIds.size;
    const noMatches = hasFilters && resultCount === 0;

    ui.mapEmpty.hidden = !noMatches;
    if (noMatches) {
      setMapStatus("No districts match your current filters.");
      return;
    }

    if (selectedCount > 1) {
      setMapStatus(`${selectedCount} districts are on your desk. Ctrl/Cmd+click a district to add or remove it.`);
      return;
    }

    if (state.selectedDistrictId) {
      const district = districtById.get(state.selectedDistrictId);
      setMapStatus(`${district?.properties?.name || "District"} selected. Ctrl/Cmd+click another district to compare.`);
      return;
    }

    if (hasFilters) {
      setMapStatus(`${resultCount} of ${districts.length} districts match your filters.`);
      return;
    }

    setMapStatus("");
  }

  function setMapStatus(message) {
    ui.mapStatus.textContent = message;
  }

  function showAppError() {
    document.body.dataset.appState = "error";
    ui.mapError.hidden = false;
    ui.mapStatus.textContent = "The map is unavailable right now.";
  }

  function renderSelectedDistrictInfo() {
    if (state.dualHubSelections.length === 2) {
      const dualConnected = computeDualHubConnectedDistricts();
      const connectedList = Array.from(dualConnected)
        .sort((a, b) => a - b)
        .map((id) => {
          const d = districtById.get(id);
          return d ? `<li>${id}. ${escapeHtml(d.properties.name)}</li>` : "";
        })
        .join("");

      const hubName0 = state.dualHubSelections[0].name;
      const hubName1 = state.dualHubSelections[1].name;

      ui.districtInfo.innerHTML = `
        <h3>Dual Hub: ${escapeHtml(hubName0)} + ${escapeHtml(hubName1)}</h3>
        <p class="muted">Shift+click to find districts directly connected to both hubs</p>
        <p><strong>${dualConnected.size}</strong> district${dualConnected.size !== 1 ? "s" : ""} with direct connections to both</p>
        <ul>${connectedList || "<li>None</li>"}</ul>
        <p class="muted" style="margin-top:8px">Shift+click a hub to remove it, or press Escape to deselect.</p>
      `;
      return;
    }

    if (state.dualHubSelections.length === 1) {
      const hub = state.dualHubSelections[0];
      const hubConnected = computeSpecialHubConnectedDistricts(hub);
      const connectedList = Array.from(hubConnected)
        .sort((a, b) => a - b)
        .map((id) => {
          const d = districtById.get(id);
          return d ? `<li>${id}. ${escapeHtml(d.properties.name)}</li>` : "";
        })
        .join("");

      ui.districtInfo.innerHTML = `
        <h3>${escapeHtml(hub.name)} <span style="color:#f08b62">[Shift+click]</span></h3>
        <p class="muted">${hub.specialKind === "airport" ? "Airport" : "Main railway station"}</p>
        <p><strong>Lines:</strong> ${escapeHtml(hub.lines.join(", "))}</p>
        <p class="muted">Shift+click another hub (airport or HBF) to see districts connected to <strong>both</strong>.</p>
        <p><strong>Districts with direct transport lines</strong></p>
        <ul>${connectedList || "<li>None</li>"}</ul>
        <p class="muted" style="margin-top:8px">Shift+click this hub again to deselect, or press Escape.</p>
      `;
      return;
    }

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

    const foodScene = FOOD_SCENE[properties._districtId];
    const foodSceneHtml = foodScene
      ? `<p><strong>Food scene:</strong> ${escapeHtml((FOOD_DENSITY[foodScene.cafeDensity] || {}).label || "")}. ${escapeHtml((foodScene.cuisines || []).join(", "))} &mdash; ${escapeHtml(foodScene.text)}</p>`
      : "";

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
    const safety = SAFETY_DATA[properties._districtId];
    const safetyHtml = safety
      ? `<p><strong>Safety:</strong> ${escapeHtml((SAFETY_LEVELS[safety.level] || {}).label || "")} - ${escapeHtml(safety.text)}</p>`
      : "";

    ui.districtInfo.innerHTML = `
      <h3>${properties._districtId}. ${escapeHtml(properties.name)}</h3>
      <p class="muted">${website}</p>
      <p><strong>Cost:</strong> ${escapeHtml(formatCostTier(cost.tier))} - ${escapeHtml(cost.description || "No description")}</p>
      ${safetyHtml}
      ${foodSceneHtml}
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
    if (!ui.legendPanelBody) { return; }
    var rows = [];

    var anyFilter = doesStateHaveActiveFilters();
    var matchSet = anyFilter ? computeMatchingDistrictIds() : null;

    if (state.showSafety) {
      rows.push('<div class="legend-section-title">Safety (crime)</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + SAFETY_LEVELS.safe.color + '"></span>low crime &mdash; generally safe</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + SAFETY_LEVELS.moderate.color + '"></span>average crime &mdash; usual caution</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + SAFETY_LEVELS.elevated.color + '"></span>higher crime &mdash; extra awareness</div>');
      rows.push('<div class="legend-row"><span class="legend-circle" style="background:' + SAFETY_LEVELS.elevated.color + ';opacity:0.6"></span>shaded spots mark hotspots &mdash; hover for details</div>');
      rows.push('<div class="legend-row muted">Based on Vienna police crime statistics. General guidance only.</div>');
    }

    if (state.showDistrictColors || state.showSafety || state.showFood) {
      rows.push('<div class="legend-section-title">Districts</div>');
      const fillDescription = state.showSafety
        ? "filled by safety level"
        : (state.showFood ? "filled by café density" : "colored by district");
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#f3b59f"></span>' + fillDescription + '</div>');
      if (anyFilter) {
        if (state.showSafety || state.showFood) {
          rows.push('<div class="legend-row"><span class="legend-text">match</span>' + matchSet.size + ' matching districts</div>');
        } else {
          rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#a8d9c3"></span>' + matchSet.size + ' matching districts</div>');
        }
        rows.push('<div class="legend-row"><span class="legend-dot" style="background:#d0cdc5;opacity:0.5"></span>non-matching (dimmed)</div>');
      }
    }

    if (state.selectedDistrictId) {
      rows.push('<div class="legend-section-title">Selection</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#f08b62"></span>selected district</div>');
      var compared = Array.from(state.comparisonDistrictIds).filter(function (id) { return id !== state.selectedDistrictId; });
      if (compared.length) {
        rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#eca9bb"></span>' + compared.length + ' compared</div>');
      }
      if (state.showDirectConnections) {
        var connCount = getConnectedDistrictIds(state.selectedDistrictId).size;
        if (connCount) {
          rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#94d3c0"></span>' + connCount + ' direct connections</div>');
          rows.push('<div class="legend-row"><span class="legend-dash" style="background:#397b68"></span>connection line</div>');
        }
      }
    }

    if (state.showStations) {
      rows.push('<div class="legend-section-title">Stations</div>');
      rows.push('<div class="legend-row"><span class="legend-circle" style="background:#a8d2e8"></span>major station</div>');
      rows.push('<div class="legend-row"><span class="legend-icon">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#a64e49" stroke-width="2"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="20" r="1.5" fill="#a64e49" stroke="none"/><circle cx="16" cy="20" r="1.5" fill="#a64e49" stroke="none"/><path d="M8 17l-2 3"/><path d="M16 17l2 3"/></svg>' +
        '</span>Hauptbahnhof</div>');
      rows.push('<div class="legend-row"><span class="legend-icon">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#625785" stroke-width="2"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>' +
        '</span>Airport</div>');
    }

    if (state.showCostIndicators) {
      rows.push('<div class="legend-section-title">Cost at a Glance</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€€€€</span>very expensive</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€€€</span>expensive</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€€</span>moderate</div>');
      rows.push('<div class="legend-row"><span class="legend-badge">€</span>affordable</div>');
    }

    if (state.showCost) {
      rows.push('<div class="legend-section-title">Cost Notes</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + COST_STYLE.very_expensive.color + '"></span>very expensive</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + COST_STYLE.expensive.color + '"></span>expensive</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + COST_STYLE.moderate.color + '"></span>moderate</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + COST_STYLE.affordable.color + '"></span>affordable</div>');
    }

    if (state.showKeywords) {
      rows.push('<div class="legend-section-title">Vibe Keywords</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:var(--paper-bright);border-color:var(--outline)"></span>keyword badge</div>');
    }

    if (state.showLandmarks) {
      rows.push('<div class="legend-section-title">Landmarks</div>');
      rows.push('<div class="legend-row"><span class="legend-circle" style="background:#f6df8a"></span>landmark</div>');
    }

    if (state.showFood) {
      rows.push('<div class="legend-section-title">Cafés &amp; Restaurants</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + FOOD_DENSITY.high.color + '"></span>café-rich area</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + FOOD_DENSITY.medium.color + '"></span>some cafés</div>');
      rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + FOOD_DENSITY.low.color + '"></span>few cafés</div>');
      rows.push('<div class="legend-row muted">Hover a district for its food scene. Safety colors win when both layers are on.</div>');
    }

    if (state.showDistrictLabels || state.showDistrictNumbers) {
      rows.push('<div class="legend-section-title">Labels</div>');
      if (state.showDistrictLabels && state.showDistrictNumbers) {
        rows.push('<div class="legend-row"><span class="legend-text">7. Neubau</span>name + number</div>');
      } else if (state.showDistrictLabels) {
        rows.push('<div class="legend-row"><span class="legend-text">Neubau</span>district name</div>');
      } else {
        rows.push('<div class="legend-row"><span class="legend-text">7</span>district number</div>');
      }
    }

    if (state.showUbahn) {
      rows.push('<div class="legend-section-title">U-Bahn Lines</div>');
      Object.keys(LINE_ROUTES).forEach(function (name) {
        var style = LINE_STYLES[name];
        if (style && style.mode === "ubahn") {
          rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + style.color + '"></span>' + escapeHtml(name) + '</div>');
        }
      });
    }

    if (state.showSbahn) {
      rows.push('<div class="legend-section-title">S-Bahn Lines</div>');
      Object.keys(LINE_ROUTES).forEach(function (name) {
        var style = LINE_STYLES[name];
        if (style && style.mode === "sbahn") {
          rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + style.color + '"></span>' + escapeHtml(name) + '</div>');
        }
      });
    }

    if (state.showTram) {
      rows.push('<div class="legend-section-title">Tram Lines</div>');
      TRAM_CORRIDORS.forEach(function (corridor) {
        rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + corridor.color + '"></span>' + escapeHtml(corridor.label) + '</div>');
      });
    }

    if (state.showMainRoads) {
      rows.push('<div class="legend-section-title">Main Roads</div>');
      MAIN_ROUTES.forEach(function (road) {
        rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + road.color + '"></span>' + escapeHtml(road.label) + '</div>');
      });
    }

    if (state.activeSpecialHub || state.dualHubSelections.length) {
      rows.push('<div class="legend-section-title">Hub Connections</div>');
      if (state.dualHubSelections.length === 2) {
        var dualCount = computeDualHubConnectedDistricts().size;
        rows.push('<div class="legend-row"><span class="legend-swatch" style="background:#f6df8a"></span>' + dualCount + ' dual-hub districts</div>');
      } else {
        var hub = state.activeSpecialHub || state.dualHubSelections[0];
        var hubConnected = computeSpecialHubConnectedDistricts(hub).size;
        var hubColor = hub.specialKind === "airport" ? "#c5b8e7" : "#f3b59f";
        rows.push('<div class="legend-row"><span class="legend-swatch" style="background:' + hubColor + '"></span>' + hubConnected + ' connected districts</div>');
        rows.push('<div class="legend-row"><span class="legend-dash" style="background:' + (hub.specialKind === "airport" ? "#625785" : "#a64e49") + '"></span>hub spoke line</div>');
      }
    }

    ui.legendPanelBody.innerHTML = rows.length ? rows.join("") : '<div class="legend-row muted">Enable layers to see details</div>';
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
    if (state.comparisonDistrictIds.size > 1) {
      params.set(urlKeys.comparisonDistrictIds, Array.from(state.comparisonDistrictIds).sort((a, b) => a - b).join(","));
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
      state.comparisonDistrictIds = new Set([selectedDistrictId]);
    }
    const comparisonDistrictIds = parseCsvParam(params.get(urlKeys.comparisonDistrictIds)).map((entry) => parseInteger(entry)).filter(Boolean);
    comparisonDistrictIds.forEach((districtId) => {
      if (districtById.has(districtId)) {
        state.comparisonDistrictIds.add(districtId);
      }
    });

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
