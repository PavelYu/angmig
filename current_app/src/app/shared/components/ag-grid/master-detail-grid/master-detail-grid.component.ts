import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, ColumnApi, GridOptions, GridReadyEvent, DetailGridInfo } from 'ag-grid-community';
import { StatusCellRendererComponent } from '../status-cell-renderer/status-cell-renderer.component';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';

@Component({
  selector: 'app-master-detail-grid',
  templateUrl: './master-detail-grid.component.html',
  styleUrls: ['./master-detail-grid.component.scss']
})
export class MasterDetailGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  @Input() gridId: string = 'master-detail-grid';

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  masterColumnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'status', headerName: 'Status', cellRenderer: StatusCellRendererComponent, width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        onEdit: (data: any) => this.onEdit(data),
        onView: (data: any) => this.onView(data),
        onDelete: (data: any) => this.onDelete(data)
      },
      width: 100
    }
  ];

  detailColumnDefs: ColDef[] = [
    { field: 'item', headerName: 'Item', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'Price', width: 120, valueFormatter: (params) => `$${params.value.toFixed(2)}` },
    { field: 'total', headerName: 'Total', width: 120, valueFormatter: (params) => `$${params.value.toFixed(2)}` }
  ];

  rowData: any[] = [
    {
      id: 1,
      name: 'Order #1001',
      category: 'Electronics',
      status: 'Active',
      detailData: [
        { item: 'Laptop', quantity: 1, price: 1299.99, total: 1299.99 },
        { item: 'Mouse', quantity: 2, price: 29.99, total: 59.98 }
      ]
    },
    {
      id: 2,
      name: 'Order #1002',
      category: 'Clothing',
      status: 'Pending',
      detailData: [
        { item: 'Shirt', quantity: 3, price: 24.99, total: 74.97 },
        { item: 'Pants', quantity: 2, price: 49.99, total: 99.98 }
      ]
    },
    {
      id: 3,
      name: 'Order #1003',
      category: 'Books',
      status: 'Active',
      detailData: [
        { item: 'Book A', quantity: 5, price: 19.99, total: 99.95 }
      ]
    }
  ];

  gridOptions: GridOptions = {
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: this.detailColumnDefs,
        defaultColDef: {
          resizable: true,
          sortable: true
        }
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.detailData);
      }
    },
    onGridReady: (event: GridReadyEvent) => this.onGridReady(event),
    defaultColDef: {
      resizable: true,
      sortable: true
    }
  };

  ngOnInit(): void {}

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onEdit(data: any): void {
    console.log('Edit master row', data);
  }

  onView(data: any): void {
    console.log('View master row', data);
    // Expand detail row
    const rowNode = this.gridApi.getRowNode(data.id.toString());
    if (rowNode) {
      rowNode.setExpanded(true);
    }
  }

  onDelete(data: any): void {
    if (confirm(`Delete ${data.name}?`)) {
      const index = this.rowData.findIndex(r => r.id === data.id);
      if (index > -1) {
        this.rowData.splice(index, 1);
        this.gridApi.setRowData(this.rowData);
      }
    }
  }
}

