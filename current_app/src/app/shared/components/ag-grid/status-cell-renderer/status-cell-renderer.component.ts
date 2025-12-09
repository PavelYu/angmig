import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';

@Component({
  selector: 'app-status-cell-renderer',
  templateUrl: './status-cell-renderer.component.html',
  styleUrls: ['./status-cell-renderer.component.scss']
})
export class StatusCellRendererComponent implements ICellRendererAngularComp {
  params: any;
  @Input() showIcon = true;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.showIcon = (params as any).showIcon !== false;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  getStatusClass(): string {
    const status = (this.params.value || '').toLowerCase();
    return status;
  }

  getStatusIcon(): string {
    const status = (this.params.value || '').toLowerCase();
    const iconMap: { [key: string]: string } = {
      active: 'check_circle',
      enabled: 'check_circle',
      success: 'check_circle',
      completed: 'check_circle',
      pending: 'schedule',
      processing: 'sync',
      warning: 'warning',
      inactive: 'cancel',
      disabled: 'block',
      cancelled: 'cancel',
      error: 'error',
      failed: 'error',
      rejected: 'cancel',
      info: 'info',
      draft: 'edit'
    };
    return iconMap[status] || 'help';
  }
}
