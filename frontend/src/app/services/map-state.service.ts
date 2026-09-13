import { Injectable, signal, computed } from '@angular/core';
import type { LocationSelection } from './comment.service';

export interface MapState {
  // Selection
  selectedDistrictId: number | null;
  comparisonDistrictIds: Set<number>;
  selectedHubId: string | null;
  
  // Toggles (16 layers)
  showDistrictColors: boolean;
  showDistrictFill: boolean;
  showDistrictLabels: boolean;
  showDistrictNumbers: boolean;
  showCostIndicators: boolean;
  showKeywords: boolean;
  showLandmarks: boolean;
  showFood: boolean;
  showCost: boolean;
  showStations: boolean;
  showDirectConnections: boolean;
  showUbahn: boolean;
  showSbahn: boolean;
  showTram: boolean;
  showMainRoads: boolean;
  showSafety: boolean;
  showComments: boolean;
  
  // Filters
  searchText: string;
  selectedCostTiers: Set<string>;
  connectedToDistrictId: number | null;
  
  // Map view
  mapView: { lat: number; lng: number; zoom: number } | null;
}

export const TOGGLE_DEFS = [
  { key: 'showDistrictColors', label: 'District colors', default: true, group: 'Map essentials' },
  { key: 'showDistrictFill', label: 'District fill', default: true, group: 'Map essentials' },
  { key: 'showDistrictLabels', label: 'District names', default: true, group: 'Map essentials' },
  { key: 'showDistrictNumbers', label: 'District numbers', default: true, group: 'Map essentials' },
  { key: 'showCostIndicators', label: 'Cost at a glance', default: false, group: 'District story' },
  { key: 'showKeywords', label: 'Vibe keywords', default: false, group: 'District story' },
  { key: 'showLandmarks', label: 'Landmarks', default: false, group: 'District story' },
  { key: 'showFood', label: 'Cafés & restaurants', default: false, group: 'District story' },
  { key: 'showCost', label: 'Cost notes', default: false, group: 'District story' },
  { key: 'showStations', label: 'Major stations', default: true, group: 'Transport' },
  { key: 'showDirectConnections', label: 'Direct connections', default: true, group: 'Transport' },
  { key: 'showUbahn', label: 'U-Bahn lines', default: false, group: 'Transit lines' },
  { key: 'showSbahn', label: 'S-Bahn lines', default: false, group: 'Transit lines' },
  { key: 'showTram', label: 'Tram lines', default: false, group: 'Transit lines' },
  { key: 'showMainRoads', label: 'Main roads', default: false, group: 'Roads' },
  { key: 'showSafety', label: 'Safety areas', default: false, group: 'Safety' },
  { key: 'showComments', label: 'Comments', default: true, group: 'Comments' }
];

@Injectable({
  providedIn: 'root'
})
export class MapStateService {
  // State signals
  selectedDistrictId = signal<number | null>(null);
  comparisonDistrictIds = signal<Set<number>>(new Set());
  selectedHubId = signal<string | null>(null);
  selectedLocation = signal<LocationSelection | null>(null);
  
  // Toggles
  showDistrictColors = signal(true);
  showDistrictFill = signal(true);
  showDistrictLabels = signal(true);
  showDistrictNumbers = signal(true);
  showCostIndicators = signal(false);
  showKeywords = signal(false);
  showLandmarks = signal(false);
  showFood = signal(false);
  showCost = signal(false);
  showStations = signal(true);
  showDirectConnections = signal(true);
  showUbahn = signal(false);
  showSbahn = signal(false);
  showTram = signal(false);
  showMainRoads = signal(false);
  showSafety = signal(false);
  showComments = signal(true);
  
  // Filters
  searchText = signal('');
  selectedCostTiers = signal<Set<string>>(new Set());
  connectedToDistrictId = signal<number | null>(null);
  
  // Map view
  mapView = signal<{ lat: number; lng: number; zoom: number } | null>(null);

  constructor() {}

  // Selection methods
  selectDistrict(districtId: number): void {
    this.selectedLocation.set(null);
    // Toggle: clicking the same selected district deselects it
    if (this.selectedDistrictId() === districtId && this.comparisonDistrictIds().size <= 1) {
      this.selectedDistrictId.set(null);
      this.comparisonDistrictIds.set(new Set());
      return;
    }
    // Single selection resets comparison to just this district
    this.selectedDistrictId.set(districtId);
    this.comparisonDistrictIds.set(new Set([districtId]));
  }

  addToComparison(districtId: number): void {
    this.selectedLocation.set(null);
    const current = new Set(this.comparisonDistrictIds());
    // Already in comparison: remove it
    if (current.has(districtId)) {
      current.delete(districtId);
      this.comparisonDistrictIds.set(current);
      // If removing the primary selected one, pick another or null
      if (this.selectedDistrictId() === districtId) {
        this.selectedDistrictId.set(Array.from(current).at(-1) ?? null);
      }
      return;
    }
    if (current.size >= 3) return; // max 3
    current.add(districtId);
    this.comparisonDistrictIds.set(current);
    this.selectedDistrictId.set(districtId);
  }

  removeFromComparison(districtId: number): void {
    const current = new Set(this.comparisonDistrictIds());
    current.delete(districtId);
    this.comparisonDistrictIds.set(current);
  }

  clearSelection(): void {
    this.selectedDistrictId.set(null);
    this.comparisonDistrictIds.set(new Set());
    this.selectedLocation.set(null);
  }

  // Select a searched (non-district) location for commenting.
  selectLocation(location: LocationSelection): void {
    this.selectedDistrictId.set(null);
    this.comparisonDistrictIds.set(new Set());
    this.selectedLocation.set(location);
  }

  clearLocation(): void {
    this.selectedLocation.set(null);
  }

  // Toggle a hub (Hauptbahnhof / Airport) selection; clicking again deselects it
  selectHub(hubId: string): void {
    this.selectedHubId.set(this.selectedHubId() === hubId ? null : hubId);
  }

  clearHubSelection(): void {
    this.selectedHubId.set(null);
  }

  // Toggle methods
  toggleDistrictColors(): void {
    this.showDistrictColors.update(v => !v);
  }

  toggleDistrictFill(): void {
    this.showDistrictFill.update(v => !v);
  }

  toggleDistrictLabels(): void {
    this.showDistrictLabels.update(v => !v);
  }

  toggleDistrictNumbers(): void {
    this.showDistrictNumbers.update(v => !v);
  }

  toggleCostIndicators(): void {
    this.showCostIndicators.update(v => !v);
  }

  toggleKeywords(): void {
    this.showKeywords.update(v => !v);
  }

  toggleLandmarks(): void {
    this.showLandmarks.update(v => !v);
  }

  toggleFood(): void {
    this.showFood.update(v => !v);
  }

  toggleCost(): void {
    this.showCost.update(v => !v);
  }

  toggleStations(): void {
    this.showStations.update(v => !v);
  }

  toggleDirectConnections(): void {
    this.showDirectConnections.update(v => !v);
  }

  toggleUbahn(): void {
    this.showUbahn.update(v => !v);
  }

  toggleSbahn(): void {
    this.showSbahn.update(v => !v);
  }

  toggleTram(): void {
    this.showTram.update(v => !v);
  }

  toggleMainRoads(): void {
    this.showMainRoads.update(v => !v);
  }

  toggleSafety(): void {
    this.showSafety.update(v => !v);
  }

  toggleComments(): void {
    this.showComments.update(v => !v);
  }

  // Generic toggle by key — directly updates the signal by key name
  toggleLayer(key: string): void {
    const s = (this as any)[key];
    if (s && typeof s === 'function' && typeof s() === 'boolean') {
      s.update((v: boolean) => !v);
    }
  }

  // Filter methods
  setSearchText(text: string): void {
    this.searchText.set(text);
  }

  toggleCostTier(tier: string): void {
    const current = new Set(this.selectedCostTiers());
    if (current.has(tier)) {
      current.delete(tier);
    } else {
      current.add(tier);
    }
    this.selectedCostTiers.set(current);
  }

  clearCostTiers(): void {
    this.selectedCostTiers.set(new Set());
  }

  setConnectedToDistrict(districtId: number | null): void {
    this.connectedToDistrictId.set(districtId);
  }

  clearFilters(): void {
    this.searchText.set('');
    this.selectedCostTiers.set(new Set());
    this.connectedToDistrictId.set(null);
  }

  resetAll(): void {
    this.clearSelection();
    this.clearHubSelection();
    this.clearFilters();
    // Reset all toggles to defaults
    TOGGLE_DEFS.forEach(def => {
      const signal = (this as any)[def.key];
      if (signal) {
        signal.set(def.default);
      }
    });
    this.mapView.set(null);
  }

  // Map view
  setMapView(lat: number, lng: number, zoom: number): void {
    this.mapView.set({ lat, lng, zoom });
  }

  // URL state serialization
  toUrlParams(): URLSearchParams {
    const params = new URLSearchParams();
    
    if (this.selectedDistrictId()) {
      params.set('sd', String(this.selectedDistrictId()));
    }
    
    if (this.comparisonDistrictIds().size > 0) {
      params.set('cmp', Array.from(this.comparisonDistrictIds()).join(','));
    }

    if (this.selectedHubId()) {
      params.set('sh', this.selectedHubId()!);
    }

    // Toggles - only add if non-default
    TOGGLE_DEFS.forEach(def => {
      const currentValue = (this as any)[def.key]();
      if (currentValue !== def.default) {
        params.set(def.key, String(currentValue));
      }
    });

    if (this.searchText()) {
      params.set('q', this.searchText());
    }

    if (this.selectedCostTiers().size > 0) {
      params.set('ct', Array.from(this.selectedCostTiers()).join(','));
    }

    if (this.connectedToDistrictId()) {
      params.set('cd', String(this.connectedToDistrictId()));
    }

    if (this.mapView()) {
      const v = this.mapView()!;
      params.set('m', `${v.lat},${v.lng},${v.zoom}`);
    }

    return params;
  }

  // Load from URL params
  fromUrlParams(params: URLSearchParams): void {
    if (params.has('sd')) {
      this.selectedDistrictId.set(Number(params.get('sd')));
    }

    if (params.has('cmp')) {
      const ids = params.get('cmp')!.split(',').map(Number);
      this.comparisonDistrictIds.set(new Set(ids));
    }

    if (params.has('sh')) {
      this.selectedHubId.set(params.get('sh'));
    }

    // Toggles
    TOGGLE_DEFS.forEach(def => {
      if (params.has(def.key)) {
        (this as any)[def.key].set(params.get(def.key) === 'true');
      }
    });

    if (params.has('q')) {
      this.searchText.set(params.get('q') || '');
    }

    if (params.has('ct')) {
      const tiers = params.get('ct')!.split(',');
      this.selectedCostTiers.set(new Set(tiers));
    }

    if (params.has('cd')) {
      this.connectedToDistrictId.set(Number(params.get('cd')));
    }

    if (params.has('m')) {
      const [lat, lng, zoom] = params.get('m')!.split(',').map(Number);
      this.mapView.set({ lat, lng, zoom });
    }
  }
}
