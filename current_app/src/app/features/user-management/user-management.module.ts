import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RoleAssignmentDialogComponent } from './components/role-assignment-dialog/role-assignment-dialog.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    RoleAssignmentDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserManagementModule { }
