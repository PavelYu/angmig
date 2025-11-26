import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-cell-renderer',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" (click)="$event.stopPropagation()">
      <mat-icon>more_vert</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="onEdit()">
        <mat-icon>edit</mat-icon>
        <span>Edit</span>
      </button>
      <button mat-menu-item (click)="onDelete()">
        <mat-icon>delete</mat-icon>
        <span>Delete</span>
      </button>
    </mat-menu>
  `
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  onEdit() {
    console.log('Edit clicked', this.params.data);
  }

  onDelete() {
    console.log('Delete clicked', this.params.data);
  }
}
