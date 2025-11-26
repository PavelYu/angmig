import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'role', headerName: 'Role', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', cellRenderer: 'statusCellRenderer' },
    { field: 'lastLogin', headerName: 'Last Login', sortable: true }
  ];

  rowData = [
    { id: 1, username: 'admin_user', email: 'admin@example.com', role: 'ADMIN', status: 'Active', lastLogin: '2023-10-25' },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'USER', status: 'Active', lastLogin: '2023-10-24' },
    { id: 3, username: 'jane_smith', email: 'jane@example.com', role: 'EDITOR', status: 'Pending', lastLogin: '2023-10-20' },
    { id: 4, username: 'guest_01', email: 'guest@example.com', role: 'GUEST', status: 'Inactive', lastLogin: '2023-09-15' },
    { id: 5, username: 'manager_bob', email: 'bob@example.com', role: 'MANAGER', status: 'Active', lastLogin: '2023-10-25' }
  ];

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: 'multiple'
  };

  constructor() { }

  ngOnInit(): void {
  }
}
