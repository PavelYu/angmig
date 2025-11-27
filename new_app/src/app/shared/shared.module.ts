import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Material Modules (MDC - Material Design Components)
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

// CDK Modules
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

// AG Grid
import { AgGridModule } from '@ag-grid-community/angular';

// Highcharts
import { HighchartsChartModule } from 'highcharts-angular';

// Third-party
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// PerfectScrollbarModule removed - replaced with native CSS scrollbar (deprecated, View Engine only)
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { IconComponent } from './components/icon/icon.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import { ExpansionPanelGroupComponent } from './components/expansion-panel-group/expansion-panel-group.component';
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { TimezoneSelectorComponent } from './components/timezone-selector/timezone-selector.component';
import { OverlayPanelComponent } from './components/overlay-panel/overlay-panel.component';
import { VirtualScrollListComponent } from './components/virtual-scroll-list/virtual-scroll-list.component';
import { StepperFormComponent } from './components/stepper-form/stepper-form.component';
import { MarkdownViewerComponent } from './components/markdown-viewer/markdown-viewer.component';
import { ReportContentViewerComponent } from './components/report-content-viewer/report-content-viewer.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { ScrollableContainerComponent } from './components/scrollable-container/scrollable-container.component';
import { D3ChartComponent } from './components/d3-chart/d3-chart.component';
import { AdvancedMapComponent } from './components/advanced-map/advanced-map.component';

// AG Grid Components
import { StatusCellRendererComponent } from './components/ag-grid/status-cell-renderer/status-cell-renderer.component';
import { ActionCellRendererComponent } from './components/ag-grid/action-cell-renderer/action-cell-renderer.component';
import { DateFilterComponent } from './components/ag-grid/date-filter/date-filter.component';
import { GridToolbarComponent } from './components/ag-grid/grid-toolbar/grid-toolbar.component';
import { MasterDetailGridComponent } from './components/ag-grid/master-detail-grid/master-detail-grid.component';
import { GroupedGridComponent } from './components/ag-grid/grouped-grid/grouped-grid.component';
import { ClipboardGridComponent } from './components/ag-grid/clipboard-grid/clipboard-grid.component';
import { TransactionGridComponent } from './components/transaction-grid/transaction-grid.component';

// Directives
import { HasPermissionDirective } from './directives/has-permission.directive';
import { InViewportDirective } from './directives/in-viewport.directive';

// Pipes
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { HttpStatusPipe } from './pipes/http-status.pipe';
import { TranslationPipe } from './pipes/translation.pipe';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatExpansionModule,
  MatTabsModule,
  MatStepperModule,
  MatTooltipModule,
  MatDividerModule,
  MatBadgeModule,
  MatRippleModule
];

const CDK_MODULES = [
  DragDropModule,
  ScrollingModule,
  OverlayModule,
  PortalModule
];

const THIRD_PARTY_MODULES = [
  AgGridModule,
  HighchartsChartModule,
  NgxMaterialTimepickerModule,
  // PerfectScrollbarModule removed - replaced with native CSS scrollbar
  InfiniteScrollModule,
  TranslateModule
];

@NgModule({ declarations: [
        // Shared UI Components
        LoadingSpinnerComponent,
        ConfirmDialogComponent,
        ToastNotificationComponent,
        IconComponent,
        ErrorHandlerComponent,
        // Material Extensions
        ChipInputComponent,
        ExpansionPanelGroupComponent,
        TabsContainerComponent,
        // Date & Time Components
        TimePickerComponent,
        DateRangePickerComponent,
        TimezoneSelectorComponent,
        // CDK-Based Components
        OverlayPanelComponent,
        VirtualScrollListComponent,
        StepperFormComponent,
        // Content Rendering
        MarkdownViewerComponent,
        ReportContentViewerComponent,
        // AG Grid Components
        StatusCellRendererComponent,
        ActionCellRendererComponent,
        DateFilterComponent,
        GridToolbarComponent,
        MasterDetailGridComponent,
        GroupedGridComponent,
        ClipboardGridComponent,
        TransactionGridComponent,
        // Additional Components
        LanguageSelectorComponent,
        ScrollableContainerComponent,
        D3ChartComponent,
        AdvancedMapComponent,
        // Directives
        HasPermissionDirective,
        InViewportDirective,
        // Pipes
        FormatCurrencyPipe,
        SafeHtmlPipe,
        HttpStatusPipe,
        TranslationPipe
    ],
    exports: [
        // Re-export modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...MATERIAL_MODULES,
        ...CDK_MODULES,
        ...THIRD_PARTY_MODULES,
        // Components
        LoadingSpinnerComponent,
        ConfirmDialogComponent,
        ToastNotificationComponent,
        IconComponent,
        ErrorHandlerComponent,
        ChipInputComponent,
        ExpansionPanelGroupComponent,
        TabsContainerComponent,
        TimePickerComponent,
        DateRangePickerComponent,
        TimezoneSelectorComponent,
        OverlayPanelComponent,
        VirtualScrollListComponent,
        StepperFormComponent,
        MarkdownViewerComponent,
        ReportContentViewerComponent,
        LanguageSelectorComponent,
        ScrollableContainerComponent,
        D3ChartComponent,
        AdvancedMapComponent,
        StatusCellRendererComponent,
        ActionCellRendererComponent,
        DateFilterComponent,
        GridToolbarComponent,
        MasterDetailGridComponent,
        GroupedGridComponent,
        ClipboardGridComponent,
        TransactionGridComponent,
        // Directives
        HasPermissionDirective,
        InViewportDirective,
        // Pipes
        FormatCurrencyPipe,
        SafeHtmlPipe,
        HttpStatusPipe,
        TranslationPipe
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...MATERIAL_MODULES,
        ...CDK_MODULES,
        ...THIRD_PARTY_MODULES], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }
