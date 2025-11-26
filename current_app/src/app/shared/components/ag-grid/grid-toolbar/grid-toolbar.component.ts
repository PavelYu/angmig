import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['./grid-toolbar.component.scss']
})
export class GridToolbarComponent {
  @Input() rowCount: number | null = null;
  @Output() search = new EventEmitter<string>();
  @Output() exportCsv = new EventEmitter<void>();
  @Output() exportExcel = new EventEmitter<void>();
  @Output() toggleColumns = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  searchValue = '';

  onSearch(event: any): void {
    this.searchValue = event.target.value;
    this.search.emit(this.searchValue);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.search.emit('');
  }
}
