import {
  Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef,
  effect, signal, ChangeDetectionStrategy, ChangeDetectorRef
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
import { TOGGLE_DEFS, COST_STYLE, LINE_STYLES, LINE_ROUTES, TRAM_CORRIDORS, MAIN_ROUTES } from '../../services/transport-data';

@Component({
  selector: 'app-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, CommentListComponent, CommentDetailComponent, CreateCommentComponent],
  styleUrl: './map.component.css',
  template: `
<div class="app-shell"
  [class.panel-expanded]="!sidebarCollapsed()"
  [class.comments-expanded]="mapState.selectedDistrictId() !== null && !commentsCollapsed()"
>

  <!-- Sidebar collapse toggle (matches reference exactly) -->
  <button
    class="panel-collapse-toggle"
    [class.active]="sidebarCollapsed()"
    type="button"
    [attr.aria-label]="sidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
    [title]="sidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
    (click)="toggleSidebar()"
  >
    <span class="panel-collapse-icon" aria-hidden="true"></span>
    <span class="panel-collapse-label">MENU</span>
  </button>

  <!-- Left panel -->
  <aside class="panel" [class.collapsed]="sidebarCollapsed()" aria-label="Map controls and district details">
    <header class="panel-header">
      <p class="kicker"><span aria-hidden="true">23</span> Vienna districts</p>
      <h1>Map of Vienna</h1>
      <p>Choose a district to begin. Ctrl/Cmd+click to add up to three districts to your desk and compare cost, connections, landmarks, and local character.</p>
    </header>

    <!-- District desk -->
    <section class="card selected-card">
      <div class="section-heading">
        <h2>District desk</h2>
        <button class="text-button" type="button" (click)="clearSelection()">Clear</button>
      </div>

      <!-- Comparison cards (2+ districts) -->
      @if (comparisonIds().length >= 2) {
        <div id="comparisonInfo" class="comparison-info" aria-live="polite">
          <p class="comparison-label">Comparing {{ comparisonIds().length }} districts</p>
          <div class="comparison-set">
            @for (id of comparisonIds(); track id) {
              <article class="compare-card">
                <button class="compare-remove" type="button" (click)="removeFromComparison(id)" [attr.aria-label]="'Remove ' + getDistrictName(id) + ' from comparison'">×</button>
                <h3>{{ id }}. {{ getDistrictName(id) }}</h3>
                <p><strong>{{ getDistrictCostTierLabel(id) }}</strong> · {{ getDistrictUbahn(id) }}</p>
                <p>{{ getDistrictKeywords(id) }}</p>
              </article>
            }
          </div>
        </div>
      }

      <!-- Single district info -->
      <div id="districtInfo" class="district-info" [innerHTML]="districtInfoHtml()"></div>
    </section>

    <!-- Filters -->
    <section class="card filters-card">
      <h2>Filters</h2>

      <label class="field-label" for="districtSearch">District / text search</label>
      <input id="districtSearch" type="text" placeholder="e.g. trendy, Belvedere, 7"
        [value]="mapState.searchText()"
        (input)="onSearchInput($any($event).target.value)"
      />

      <label class="field-label">Cost tiers</label>
      <div class="chip-row">
        @for (tier of costTierDefs; track tier.key) {
          <button class="chip" type="button"
            [class.active]="mapState.selectedCostTiers().has(tier.key)"
            (click)="toggleCostTier(tier.key)"
          >{{ tier.label }}</button>
        }
      </div>

      <label class="field-label" for="connectedToDistrict">Directly connected to district</label>
      <select id="connectedToDistrict"
        [value]="mapState.connectedToDistrictId() ?? ''"
        (change)="onConnectedChange($any($event).target.value)"
      >
        <option value="">Any district</option>
        @for (d of allDistricts(); track d.id) {
          <option [value]="d.id">{{ d.id }}. {{ d.name }}</option>
        }
      </select>

      <div class="button-row">
        <button type="button" (click)="clearFilters()">Clear filters</button>
        <button type="button" (click)="resetMap()">Reset map</button>
      </div>
    </section>
  </aside>

  <!-- Map area -->
  <main class="map-wrap">
    <div #mapElement id="map"></div>

    <!-- Right panels: Map Layers & Legend (floating overlays on the map) -->
    <div class="right-panels">
      <div class="right-panel layers-panel" aria-label="Map layers">
        <button class="panel-toggle" type="button"
          [attr.aria-expanded]="layersPanelOpen()"
          title="Toggle map layers"
          (click)="layersPanelOpen.set(!layersPanelOpen())"
        >
          <span class="panel-toggle-label">Map Layers</span>
          <span class="panel-toggle-icon" aria-hidden="true"></span>
        </button>
        <div class="panel-body" [hidden]="!layersPanelOpen()">
          <div class="control-grid">
            @for (group of layerGroups; track group.name) {
              <fieldset class="control-group">
                <legend>{{ group.name }}</legend>
                <div class="toggle-list">
                  @for (toggle of group.toggles; track toggle.key) {
                    <label class="checkline">
                      <input type="checkbox"
                        [checked]="getToggleState(toggle.key)"
                        (change)="onLayerToggle(toggle.key)"
                      />
                      <span>{{ toggle.label }}</span>
                    </label>
                  }
                </div>
              </fieldset>
            }
          </div>
        </div>
      </div>

      <div class="right-panel legend-panel" aria-label="Map legend">
        <button class="panel-toggle" type="button"
          [attr.aria-expanded]="legendPanelOpen()"
          title="Toggle legend"
          (click)="legendPanelOpen.set(!legendPanelOpen())"
        >
          <span class="panel-toggle-label">Legend</span>
          <span class="panel-toggle-icon" aria-hidden="true"></span>
        </button>
        <div class="panel-body" [hidden]="!legendPanelOpen()" [innerHTML]="legendHtml()"></div>
      </div>
    </div>

    <!-- No-results state -->
    @if (showEmpty()) {
      <div class="map-state map-empty">
        <p class="state-title">No district matches those filters.</p>
        <p>Clear a filter and widen the search.</p>
        <button type="button" (click)="clearFilters()">Clear filters</button>
      </div>
    }
  </main>

  <!-- Right sidebar: Comments (shows when a district is selected) -->
  @if (mapState.selectedDistrictId() !== null) {
    @if (commentsCollapsed()) {
      <button
        class="comments-expand-toggle"
        type="button"
        aria-label="Expand comments"
        title="Expand comments"
        (click)="toggleComments()"
      >
        <span class="panel-collapse-icon" aria-hidden="true"></span>
        <span class="panel-collapse-label">COMMENTS</span>
      </button>
    }

    <div class="sidebar-comments" [class.collapsed]="commentsCollapsed()">
      <div class="sidebar-header">
        <div class="sidebar-header-row">
          <div>
            <h2>{{ getDistrictName(mapState.selectedDistrictId()!) }}</h2>
            <p class="subtitle">Comments</p>
          </div>
          <button
            class="comments-collapse-btn"
            type="button"
            aria-label="Collapse comments"
            title="Collapse comments"
            (click)="toggleComments()"
          >
            <span class="panel-collapse-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      @if (showCommentForm()) {
        <app-create-comment
          [districtId]="mapState.selectedDistrictId()!"
          (created)="onCommentCreated($event)"
          (cancelled)="showCommentForm.set(false)">
        </app-create-comment>
      } @else if (selectedComment()) {
        <app-comment-detail
          [commentId]="selectedComment()!"
          (back)="selectedComment.set(null)"
          (changed)="refreshCommentCounts()">
        </app-comment-detail>
      } @else {
        <app-comment-list
          [districtId]="mapState.selectedDistrictId()!"
          (selectComment)="selectedComment.set($event)"
          (newComment)="showCommentForm.set(true)"
          (changed)="refreshCommentCounts()">
        </app-comment-list>
      }
    </div>
  }
</div>
  `
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapElement') mapElement!: ElementRef;

  selectedComment = signal<number | null>(null);
  showCommentForm = signal(false);
  sidebarCollapsed = signal(false);
  commentsCollapsed = signal(false);
  layersPanelOpen = signal(false);
  legendPanelOpen = signal(false);

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
      mapState.selectedDistrictId(); this.sidebarCollapsed();
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
    this.updateUrlState();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleComments(): void {
    this.commentsCollapsed.update(v => !v);
    this.mapService.invalidateSize();
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
  }

  private updateUrlState(): void {
    const params = this.mapState.toUrlParams();
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }
}
