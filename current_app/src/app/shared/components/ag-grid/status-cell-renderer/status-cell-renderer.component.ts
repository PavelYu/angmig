import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-cell-renderer',
  template: `
    <span class="status-chip" [ngClass]="params.value?.toLowerCase()">
      {{ params.value }}
    </span>
  `,
  styles: [`
    .status-chip {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .active { background-color: #e6f4ea; color: #1e8e3e; }
    .pending { background-color: #fef7e0; color: #b06000; }
    .inactive { background-color: #f1f3f4; color: #5f6368; }
  `]
})
export class StatusCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }
}
