import {
  Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener,
  effect, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef, type Signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentDetailComponent } from '../comment-detail/comment-detail.component';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { DistrictService } from '../../services/district.service';
import { MapService } from '../../services/map.service';
import { MapStateService } from '../../services/map-state.service';
import { CommentService } from '../../services/comment.service';
import type { CommentTarget, LocationSelection } from '../../services/comment.service';
import { TOGGLE_DEFS, COST_STYLE, LINE_STYLES, LINE_ROUTES, TRAM_CORRIDORS, MAIN_ROUTES } from '../../services/transport-data';

@Component({
  selector: 'app-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, CommentListComponent, CommentDetailComponent, CreateCommentComponent],
  styleUrl: './map.component.css',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapElement') mapElement!: ElementRef;

  selectedComment = signal<number | null>(null);
  showCommentForm = signal(false);
  sidebarCollapsed = signal(false);
  commentsCollapsed = signal(false);
  layersPanelOpen = signal(false);
  legendPanelOpen = signal(false);

  activeCommentTarget!: Signal<CommentTarget | null>;

  mapSearchText = signal('');
  mapSearchFeedback = signal<{ text: string; error: boolean } | null>(null);

  readonly costTierDefs = [
    { key: 'very_expensive', label: 'Very expensive' },
    { key: 'expensive', label: 'Expensive' },
    { key: 'moderate', label: 'Moderate' },
    { key: 'affordable', label: 'Affordable' }
  ];

  readonly layerGroups = (() => {
    const groups = new Map<string, typeof TOGGLE_DEFS>();
    TOGGLE_DEFS.forEach(def => {
      if (!groups.has(def.group)) groups.set(def.group, []);
      groups.get(def.group)!.push(def);
    });
    return Array.from(groups.entries()).map(([name, toggles]) => ({ name, toggles }));
  })();

  constructor(
    private districtService: DistrictService,
    private mapService: MapService,
    public mapState: MapStateService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    this.activeCommentTarget = computed<CommentTarget | null>(() => {
      const loc = mapState.selectedLocation();
      if (loc) {
        return { kind: 'location', key: loc.key, type: loc.type, name: loc.name, lat: loc.lat, lng: loc.lng };
      }
      const districtId = mapState.selectedDistrictId();
      if (districtId !== null) {
        return { kind: 'district', districtId, label: this.getDistrictName(districtId) };
      }
      return null;
    });

    // Re-render map whenever any state changes OR when the map becomes ready after data loads.
    effect(() => {
      // mapReady must be tracked first so this effect re-runs when data finishes loading.
      const ready = mapService.mapReady();
      mapState.selectedDistrictId(); mapState.comparisonDistrictIds();
      mapState.selectedHubId();
      mapState.searchText(); mapState.selectedCostTiers(); mapState.connectedToDistrictId();
      mapState.showDistrictColors(); mapState.showDistrictFill();
      mapState.showDistrictLabels(); mapState.showDistrictNumbers();
      mapState.showCostIndicators(); mapState.showKeywords(); mapState.showLandmarks();
      mapState.showFood(); mapState.showCost(); mapState.showStations();
      mapState.showDirectConnections(); mapState.showUbahn(); mapState.showSbahn();
      mapState.showTram(); mapState.showMainRoads(); mapState.showSafety();
      mapState.showComments();
      if (ready) {
        this.mapService.renderAll();
      }
      this.cdr.markForCheck();
    });

    effect(() => {
      mapState.selectedDistrictId(); mapState.selectedLocation(); this.sidebarCollapsed();
      this.mapService.invalidateSize();
    });
  }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    this.mapState.fromUrlParams(params);
    if (window.matchMedia('(max-width: 900px)').matches) this.sidebarCollapsed.set(true);
    this.refreshCommentCounts();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {}

  private async initializeMap(): Promise<void> {
    await this.mapService.initializeMap(this.mapElement.nativeElement);
    this.mapService.setOnDistrictClick((id: number, ctrl?: boolean) => {
      this.mapService.clearSearchFocus();
      if (ctrl) {
        this.mapState.addToComparison(id);
      } else {
        this.mapState.selectDistrict(id);
        this.selectedComment.set(null);
        this.showCommentForm.set(false);
        this.commentsCollapsed.set(false);
      }
      this.updateUrlState();
    });
    this.mapService.setOnHubClick((station: any) => {
      this.mapState.selectHub(station.id);
      this.updateUrlState();
    });
    this.mapService.setOnSearchLocationClick((location: LocationSelection) => {
      this.mapState.selectLocation(location);
      this.selectedComment.set(null);
      this.showCommentForm.set(false);
      this.commentsCollapsed.set(false);
      this.updateUrlState();
    });
  }

  // ---- Computed values ----

  districtInfoHtml(): SafeHtml {
    const sel = this.mapState.selectedDistrictId();
    if (this.mapState.comparisonDistrictIds().size >= 2) {
      return this.sanitizer.bypassSecurityTrustHtml('<p class="muted">See comparison cards above.</p>');
    }
    const html = sel
      ? this.mapService.buildDistrictInfoHtml(sel)
      : '<p class="muted">Click a district to inspect full details and direct public transport connections.</p>';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  legendHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.mapService.buildLegendHtml());
  }

  showEmpty(): boolean {
    const hasFilters = Boolean(this.mapState.searchText() || this.mapState.selectedCostTiers().size > 0 || this.mapState.connectedToDistrictId() !== null);
    return hasFilters && this.mapService.getMatchCount() === 0;
  }

  comparisonIds(): number[] {
    return Array.from(this.mapState.comparisonDistrictIds());
  }

  allDistricts(): { id: number; name: string }[] {
    return this.mapService.getDistrictData()
      .filter((f: any) => f.properties?._districtId)
      .map((f: any) => ({ id: f.properties._districtId, name: f.properties.name || '' }))
      .sort((a, b) => a.id - b.id);
  }

  commentPanelTitle(): string {
    const loc = this.mapState.selectedLocation();
    if (loc) return loc.name;
    const id = this.mapState.selectedDistrictId();
    return id !== null ? this.getDistrictName(id) : 'Comments';
  }

  // ---- District info helpers ----

  getDistrictName(id: number | null): string {
    if (!id) return '';
    return this.districtService.getDistrictName(id);
  }

  getDistrictCostTierLabel(id: number): string {
    const f = this.mapService.getDistrictFeature(id);
    const tier = f?.properties?.costOfLiving?.tier;
    return tier ? (COST_STYLE[tier]?.label || tier) : '';
  }

  getDistrictUbahn(id: number): string {
    const f = this.mapService.getDistrictFeature(id);
    const lines: string[] = f?.properties?.transport?.ubahn || [];
    return lines.length ? lines.join(', ') : 'No U-Bahn';
  }

  getDistrictKeywords(id: number): string {
    const f = this.mapService.getDistrictFeature(id);
    return (f?.properties?.keywords || []).slice(0, 2).join(' · ') || 'No keywords listed';
  }

  // ---- Toggles ----

  getToggleState(key: string): boolean {
    const s = (this.mapState as any)[key];
    return s ? s() : false;
  }

  onLayerToggle(key: string): void {
    this.mapState.toggleLayer(key);
    this.updateUrlState();
  }

  // ---- Filters ----

  onSearchInput(value: string): void {
    this.mapState.setSearchText(value);
    this.updateUrlState();
  }

  // ---- Map search ----

  onMapSearchInput(value: string): void {
    this.mapSearchText.set(value);
    this.mapSearchFeedback.set(null);
  }

  async onSearchSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const query = this.mapSearchText().trim();
    if (!query) return;

    const local = this.mapService.focusPlace(query);
    if (local) {
      this.mapSearchFeedback.set({ text: `Found: ${local.label}`, error: false });
      return;
    }

    this.mapSearchFeedback.set({ text: 'Searching…', error: false });
    const results = await this.mapService.geocodeRemote(query);
    if (results.length) {
      const best = results[0];
      this.mapService.focusCoordinate(best.lat, best.lng, best.label);
      this.mapSearchFeedback.set({ text: `Found: ${best.name}`, error: false });
    } else {
      this.mapSearchFeedback.set({ text: `No match for “${query}”`, error: true });
    }
  }

  toggleCostTier(tier: string): void {
    this.mapState.toggleCostTier(tier);
    this.updateUrlState();
  }

  onConnectedChange(value: string): void {
    this.mapState.setConnectedToDistrict(value ? Number(value) : null);
    this.updateUrlState();
  }

  // ---- Actions ----

  clearFilters(): void {
    this.mapState.clearFilters();
    this.updateUrlState();
  }

  clearSelection(): void {
    this.mapState.clearSelection();
    this.selectedComment.set(null);
    this.showCommentForm.set(false);
    this.updateUrlState();
  }

  removeFromComparison(id: number): void {
    this.mapState.removeFromComparison(id);
    this.updateUrlState();
  }

  resetMap(): void {
    this.mapState.resetAll();
    this.selectedComment.set(null);
    this.showCommentForm.set(false);
    this.mapService.resetView();
    this.mapService.clearSearchFocus();
    this.mapSearchText.set('');
    this.mapSearchFeedback.set(null);
    this.updateUrlState();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleComments(): void {
    this.commentsCollapsed.update(v => !v);
    this.mapService.invalidateSize();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    event.preventDefault();
    this.sidebarCollapsed.set(true);
    this.commentsCollapsed.set(true);
    this.layersPanelOpen.set(false);
    this.legendPanelOpen.set(false);
    this.resetMap();
  }

  onCommentCreated(comment: any): void {
    this.showCommentForm.set(false);
    this.selectedComment.set(null);
    if (comment?.district_id != null) {
      this.mapService.incrementCommentCount(comment.district_id);
    }
    this.refreshCommentCounts();
  }

  refreshCommentCounts(): void {
    this.commentService.getCommentCounts().subscribe({
      next: (counts) => {
        const map = new Map<number, number>();
        Object.entries(counts).forEach(([key, value]) => map.set(Number(key), value));
        this.mapService.setCommentCounts(map);
      },
      error: (error) => console.error('Error loading comment counts:', error)
    });
    this.commentService.getLocationMarkers().subscribe({
      next: (response) => this.mapService.setLocationCommentMarkers(response.markers || []),
      error: (error) => console.error('Error loading location comment markers:', error)
    });
  }

  private updateUrlState(): void {
    const params = this.mapState.toUrlParams();
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }
}
