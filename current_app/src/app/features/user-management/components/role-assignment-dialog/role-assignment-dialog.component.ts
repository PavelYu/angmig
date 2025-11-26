import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-assignment-dialog',
  template: `
    <h2 mat-dialog-title>Assign Roles: {{ data.username }}</h2>
    <mat-dialog-content>
      <mat-selection-list #roles>
        <mat-list-option *ngFor="let role of availableRoles" [value]="role" [selected]="data.currentRoles.includes(role)">
          {{ role }}
        </mat-list-option>
      </mat-selection-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="roles.selectedOptions.selected">Save</button>
    </mat-dialog-actions>
  `
})
export class RoleAssignmentDialogComponent {
  availableRoles = ['ADMIN', 'EDITOR', 'VIEWER', 'AUDITOR'];

  constructor(
    public dialogRef: MatDialogRef<RoleAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string; currentRoles: string[] }
  ) { }
}
