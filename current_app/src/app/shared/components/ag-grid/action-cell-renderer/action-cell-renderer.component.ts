import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.scss']
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  hasAction(actionName: string): boolean {
    return this.params[actionName] !== undefined && this.params[actionName] !== null;
  }

  onEdit(): void {
    if (this.params.onEdit) {
      this.params.onEdit(this.params.data);
    } else {
      console.log('Edit clicked', this.params.data);
    }
  }

  onView(): void {
    if (this.params.onView) {
      this.params.onView(this.params.data);
    } else {
      console.log('View clicked', this.params.data);
    }
  }

  onDuplicate(): void {
    if (this.params.onDuplicate) {
      this.params.onDuplicate(this.params.data);
    } else {
      console.log('Duplicate clicked', this.params.data);
    }
  }

  onDelete(): void {
    if (this.params.onDelete) {
      this.params.onDelete(this.params.data);
    } else {
      console.log('Delete clicked', this.params.data);
    }
  }
}
