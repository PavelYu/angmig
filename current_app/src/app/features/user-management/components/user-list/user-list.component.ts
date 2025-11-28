import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions, GridApi, ColumnApi, GridReadyEvent, SelectionChangedEvent } from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { StatusCellRendererComponent } from '../../../../shared/components/ag-grid/status-cell-renderer/status-cell-renderer.component';
import { ActionCellRendererComponent } from '../../../../shared/components/ag-grid/action-cell-renderer/action-cell-renderer.component';
import { GridStateService } from '../../../../core/services/grid-state.service';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
  lastLogin: string;
  createdAt: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      pinned: 'left',
      lockPosition: true
    },
    { 
      field: 'username', 
      headerName: 'Username', 
      sortable: true, 
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      width: 150
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      sortable: true, 
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      width: 200
    },
    { 
      field: 'role', 
      headerName: 'Role', 
      sortable: true, 
      filter: 'agSetColumnFilter',
      floatingFilter: true,
      width: 120
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      cellRenderer: StatusCellRendererComponent,
      filter: 'agSetColumnFilter',
      floatingFilter: true,
      width: 120
    },
    { 
      field: 'lastLogin', 
      headerName: 'Last Login', 
      sortable: true,
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      width: 150,
      valueFormatter: (params) => {
        if (params.value) {
          return new Date(params.value).toLocaleDateString();
        }
        return '';
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        onEdit: (data: User) => this.onEdit(data),
        onView: (data: User) => this.onView(data),
        onDelete: (data: User) => this.onDelete(data),
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

  rowData: User[] = [
    { id: 1, username: 'admin_user', email: 'admin@example.com', role: 'ADMIN', status: 'Active', lastLogin: '2023-10-25', createdAt: '2023-01-15' },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'USER', status: 'Active', lastLogin: '2023-10-24', createdAt: '2023-02-20' },
    { id: 3, username: 'jane_smith', email: 'jane@example.com', role: 'EDITOR', status: 'Pending', lastLogin: '2023-10-20', createdAt: '2023-03-10' },
    { id: 4, username: 'guest_01', email: 'guest@example.com', role: 'GUEST', status: 'Inactive', lastLogin: '2023-09-15', createdAt: '2023-04-05' },
    { id: 5, username: 'manager_bob', email: 'bob@example.com', role: 'MANAGER', status: 'Active', lastLogin: '2023-10-25', createdAt: '2023-05-12' }
  ];

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 20,
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
    onSelectionChanged: (event: SelectionChangedEvent) => this.onSelectionChanged(event)
  };

  selectedRows: User[] = [];

  constructor(
    private router: Router,
    private gridStateService: GridStateService
  ) {}

  ngOnInit(): void {
    // Grid state will be loaded in onGridReady
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;

    // Restore grid state
    const savedState = this.gridStateService.getGridState('user-list');
    if (savedState && this.gridColumnApi) {
      this.gridColumnApi.applyColumnState({
        state: savedState.columnState,
        applyOrder: true
      });
    }

    // Auto-size columns
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    this.selectedRows = this.gridApi.getSelectedRows();
  }

  onEdit(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  onView(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  onDelete(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      const index = this.rowData.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.rowData.splice(index, 1);
        this.gridApi.setRowData(this.rowData);
      }
    }
  }

  onAddUser(): void {
    this.router.navigate(['/users/new']);
  }

  onExportCsv(): void {
    this.gridApi.exportDataAsCsv({
      fileName: `users_${new Date().toISOString().split('T')[0]}.csv`
    });
  }

  onSearch(searchTerm: string): void {
    this.gridApi.setQuickFilter(searchTerm);
  }

  onToggleColumns(): void {
    // Toggle column visibility panel
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
      this.gridStateService.saveGridState('user-list', {
        columnState,
        columnGroupState: {}
      });
    }
  }

  onBulkDelete(): void {
    if (confirm(`Are you sure you want to delete ${this.selectedRows.length} user(s)?`)) {
      const idsToDelete = this.selectedRows.map(u => u.id);
      this.rowData = this.rowData.filter(u => !idsToDelete.includes(u.id));
      this.gridApi.setRowData(this.rowData);
      this.selectedRows = [];
    }
  }

  onExportExcel(): void {
    // AG Grid Enterprise feature - fallback to CSV if not available
    if (this.gridApi.exportDataAsExcel) {
      this.gridApi.exportDataAsExcel({
        fileName: `users_${new Date().toISOString().split('T')[0]}.xlsx`
      });
    } else {
      this.onExportCsv();
    }
  }
}
