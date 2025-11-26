import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-grid-toolbar',
  template: `
    <div class="grid-toolbar">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Search</mat-label>
        <input matInput (keyup)="onSearch($event)" placeholder="Filter...">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="actions">
        <button mat-stroked-button (click)="exportCsv.emit()">
          <mat-icon>download</mat-icon> Export CSV
        </button>
        <button mat-stroked-button (click)="toggleColumns.emit()">
          <mat-icon>view_column</mat-icon> Columns
        </button>
      </div>
    </div>
  `,
  styles: [`
    .grid-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }
    .search-field { font-size: 14px; width: 300px; }
    .actions button { margin-left: 8px; }
  `]
})
export class GridToolbarComponent {
  @Output() search = new EventEmitter<string>();
  @Output() exportCsv = new EventEmitter<void>();
  @Output() toggleColumns = new EventEmitter<void>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }
}
