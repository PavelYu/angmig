import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { IconComponent } from './components/icon/icon.component';
import { StatusCellRendererComponent } from './components/ag-grid/status-cell-renderer/status-cell-renderer.component';
import { ActionCellRendererComponent } from './components/ag-grid/action-cell-renderer/action-cell-renderer.component';
import { DateFilterComponent } from './components/ag-grid/date-filter/date-filter.component';
import { GridToolbarComponent } from './components/ag-grid/grid-toolbar/grid-toolbar.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    ToastNotificationComponent,
    IconComponent,
    StatusCellRendererComponent,
    ActionCellRendererComponent,
    DateFilterComponent,
    GridToolbarComponent,
    HasPermissionDirective,
    FormatCurrencyPipe,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
