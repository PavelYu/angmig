import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RoleAssignmentDialogComponent } from './components/role-assignment-dialog/role-assignment-dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    RoleAssignmentDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserManagementModule { }
