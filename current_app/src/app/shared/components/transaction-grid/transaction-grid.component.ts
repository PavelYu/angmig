import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ColDef, GridApi, ColumnApi, GridOptions, GridReadyEvent, IServerSideGetRowsParams } from '@ag-grid-community/core';
import { StatusCellRendererComponent } from '../ag-grid/status-cell-renderer/status-cell-renderer.component';
import { ActionCellRendererComponent } from '../ag-grid/action-cell-renderer/action-cell-renderer.component';
import { DateFilterComponent } from '../ag-grid/date-filter/date-filter.component';
import { GridStateService } from '../../../core/services/grid-state.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  description: string;
  category: string;
  status: 'Success' | 'Pending' | 'Failed';
  merchant: string;
  account: string;
  reference: string;
}

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.scss']
})
export class TransactionGridComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  @Input() gridId: string = 'transaction-grid';
  @Input() serverSide: boolean = false;

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      pinned: 'left',
      lockPosition: true
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
      sortable: true,
      filter: 'agDateColumnFilter',
      floatingFilterComponent: DateFilterComponent,
      floatingFilter: true,
      valueFormatter: (params) => {
        if (params.value) {
          return new Date(params.value).toLocaleDateString();
        }
        return '';
      },
      comparator: (valueA, valueB) => {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return dateA - dateB;
      }
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      valueFormatter: (params) => {
        if (params.value !== null && params.value !== undefined) {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: params.data?.currency || 'USD'
          }).format(params.value);
        }
        return '';
      },
      cellStyle: (params) => {
        if (params.value < 0) {
          return { color: '#f44336' };
        }
        return { color: '#4caf50' };
      },
      type: 'numericColumn'
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      tooltipField: 'description'
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      sortable: true,
      filter: 'agSetColumnFilter',
      floatingFilter: true
    },
    {
      field: 'merchant',
      headerName: 'Merchant',
      width: 180,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      field: 'account',
      headerName: 'Account',
      width: 150,
      sortable: true,
      filter: 'agSetColumnFilter',
      floatingFilter: true
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: StatusCellRendererComponent,
      filter: 'agSetColumnFilter',
      floatingFilter: true
    },
    {
      field: 'reference',
      headerName: 'Reference',
      width: 150,
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        onEdit: (data: Transaction) => this.onEdit(data),
        onView: (data: Transaction) => this.onView(data),
        onDelete: (data: Transaction) => this.onDelete(data),
        canEdit: true,
        canView: true,
        canDelete: true
      },
      width: 100,
      pinned: 'right',
      lockPosition: true,
      sortable: false,
      filter: false
    }
  ];

  rowData: Transaction[] = [];
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
    rowSelection: 'multiple',
    enableRangeSelection: true,
    suppressRowClickSelection: true,
    animateRows: true,
    rowHeight: 50,
    headerHeight: 45,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true
    },
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel'
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel'
        }
      ],
      defaultToolPanel: 'columns'
    },
    onGridReady: (event: GridReadyEvent) => this.onGridReady(event),
    enableCharts: true,
    groupDisplayType: 'singleColumn'
  };

  selectedRows: Transaction[] = [];
  totalRows = 0;

  constructor(private gridStateService: GridStateService) {
    // Generate mock data
    this.generateMockData();
  }

  ngOnInit(): void {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      // takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.onSearch(searchTerm);
    });

    // Grid state will be loaded in onGridReady
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateMockData(): void {
    const statuses: ('Success' | 'Pending' | 'Failed')[] = ['Success', 'Pending', 'Failed'];
    const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare'];
    const merchants = ['Amazon', 'Walmart', 'Starbucks', 'Uber', 'Netflix', 'Apple Store'];
    const accounts = ['Checking', 'Savings', 'Credit Card', 'Investment'];

    for (let i = 1; i <= 1000; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      
      this.rowData.push({
        id: `TXN-${String(i).padStart(6, '0')}`,
        date: date,
        amount: Math.round((Math.random() * 2000 - 500) * 100) / 100,
        currency: 'USD',
        description: `Transaction ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        account: accounts[Math.floor(Math.random() * accounts.length)],
        reference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });
    }
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;

    // Restore grid state
    const savedState = this.gridStateService.getGridState(this.gridId);
    if (savedState && this.gridColumnApi) {
      this.gridColumnApi.applyColumnState({
        state: savedState.columnState,
        applyOrder: true
      });
    }

    // Auto-size columns
    this.gridApi.sizeColumnsToFit();
    this.totalRows = this.rowData.length;
  }

  onSearch(searchTerm: string): void {
    this.gridApi.setQuickFilter(searchTerm);
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  onEdit(transaction: Transaction): void {
    console.log('Edit transaction', transaction);
  }

  onView(transaction: Transaction): void {
    console.log('View transaction', transaction);
  }

  onDelete(transaction: Transaction): void {
    if (confirm(`Are you sure you want to delete transaction ${transaction.id}?`)) {
      const index = this.rowData.findIndex(t => t.id === transaction.id);
      if (index > -1) {
        this.rowData.splice(index, 1);
        this.gridApi.setRowData(this.rowData);
        this.totalRows = this.rowData.length;
      }
    }
  }

  onExportCsv(): void {
    this.gridApi.exportDataAsCsv({
      fileName: `transactions_${new Date().toISOString().split('T')[0]}.csv`
    });
  }

  onExportExcel(): void {
    if (this.gridApi.exportDataAsExcel) {
      this.gridApi.exportDataAsExcel({
        fileName: `transactions_${new Date().toISOString().split('T')[0]}.xlsx`
      });
    } else {
      this.onExportCsv();
    }
  }

  onToggleColumns(): void {
    if (this.gridApi) {
      const toolPanelVisible = this.gridApi.isToolPanelShowing();
      if (toolPanelVisible) {
        this.gridApi.closeToolPanel();
      } else {
        this.gridApi.openToolPanel('columns');
      }
    }
  }

  saveGridState(): void {
    if (this.gridColumnApi) {
      const columnState = this.gridColumnApi.getColumnState();
      this.gridStateService.saveGridState(this.gridId, {
        columnState,
        columnGroupState: {}
      });
    }
  }

  getSelectedRows(): Transaction[] {
    return this.gridApi.getSelectedRows();
  }
}

