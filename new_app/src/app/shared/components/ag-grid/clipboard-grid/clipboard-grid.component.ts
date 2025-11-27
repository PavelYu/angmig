import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, ColumnApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { StatusCellRendererComponent } from '../status-cell-renderer/status-cell-renderer.component';

@Component({
    selector: 'app-clipboard-grid',
    templateUrl: './clipboard-grid.component.html',
    styleUrls: ['./clipboard-grid.component.scss'],
    standalone: false
})
export class ClipboardGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  @Input() gridId: string = 'clipboard-grid';

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'status', headerName: 'Status', cellRenderer: StatusCellRendererComponent, width: 120 },
    { field: 'amount', headerName: 'Amount', width: 120, valueFormatter: (params) => `$${params.value.toFixed(2)}` }
  ];

  rowData: any[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', amount: 1000.50 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', amount: 2500.75 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Pending', amount: 750.25 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', amount: 450.00 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Inactive', amount: 1899.99 }
  ];

  gridOptions: GridOptions = {
    enableRangeSelection: true,
    enableFillHandle: true,
    enableRangeHandle: true,
    suppressClipboardPaste: false,
    suppressCopyRowsToClipboard: false,
    // Note: suppressCutRowsToClipboard doesn't exist in AG Grid v28
    clipboardDelimiter: '\t',
    onGridReady: (event: GridReadyEvent) => this.onGridReady(event),
    defaultColDef: {
      resizable: true,
      sortable: true,
      editable: true
    }
  } as GridOptions;

  ngOnInit(): void {}

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  copyToClipboard(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.gridApi.copySelectedRowsToClipboard();
    } else {
      this.gridApi.copySelectedRangeToClipboard();
    }
  }

  pasteFromClipboard(): void {
    // Note: pasteFromClipboard doesn't exist in AG Grid v28
    // Clipboard paste is handled automatically when cells are focused
    console.warn('pasteFromClipboard: Clipboard paste is handled automatically by AG Grid');
  }

  cutToClipboard(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      // Note: cutSelectedRowsToClipboard doesn't exist in AG Grid v28
      // Use copySelectedRowsToClipboard and then delete
      this.gridApi.copySelectedRowsToClipboard();
      const idsToDelete = selectedRows.map((row: any) => row.id);
      // Delete logic would go here
      console.warn('cutToClipboard: Copy + delete pattern needed for AG Grid v28');
    }
  }
}

