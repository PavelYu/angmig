import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, ColumnApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { StatusCellRendererComponent } from '../status-cell-renderer/status-cell-renderer.component';

@Component({
    selector: 'app-grouped-grid',
    templateUrl: './grouped-grid.component.html',
    styleUrls: ['./grouped-grid.component.scss'],
    standalone: false
})
export class GroupedGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  @Input() gridId: string = 'grouped-grid';

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    { 
      field: 'category', 
      headerName: 'Category',
      rowGroup: true,
      hide: true,
      width: 150
    },
    { 
      field: 'status', 
      headerName: 'Status',
      rowGroup: true,
      hide: true,
      cellRenderer: StatusCellRendererComponent,
      width: 120
    },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 120, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
    { field: 'date', headerName: 'Date', width: 120, valueFormatter: (params) => new Date(params.value).toLocaleDateString() }
  ];

  rowData: any[] = [
    { id: 1, name: 'Item 1', category: 'Electronics', status: 'Active', amount: 100.50, date: '2023-01-15' },
    { id: 2, name: 'Item 2', category: 'Electronics', status: 'Active', amount: 250.75, date: '2023-01-16' },
    { id: 3, name: 'Item 3', category: 'Electronics', status: 'Pending', amount: 75.25, date: '2023-01-17' },
    { id: 4, name: 'Item 4', category: 'Clothing', status: 'Active', amount: 45.00, date: '2023-01-18' },
    { id: 5, name: 'Item 5', category: 'Clothing', status: 'Pending', amount: 89.99, date: '2023-01-19' },
    { id: 6, name: 'Item 6', category: 'Books', status: 'Active', amount: 19.99, date: '2023-01-20' }
  ];

  gridOptions: GridOptions = {
    groupDisplayType: 'singleColumn',
    groupDefaultExpanded: 1,
    suppressRowClickSelection: true,
    enableRangeSelection: true,
    animateRows: true,
    onGridReady: (event: GridReadyEvent) => this.onGridReady(event),
    defaultColDef: {
      resizable: true,
      sortable: true
    },
    autoGroupColumnDef: {
      headerName: 'Group',
      minWidth: 200,
      cellRendererParams: {
        suppressCount: false,
        checkbox: false
      }
    }
  };

  ngOnInit(): void {}

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  expandAll(): void {
    this.gridApi.expandAll();
  }

  collapseAll(): void {
    this.gridApi.collapseAll();
  }
}

