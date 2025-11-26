import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Role {
  value: string;
  label: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-role-assignment-dialog',
  templateUrl: './role-assignment-dialog.component.html',
  styleUrls: ['./role-assignment-dialog.component.scss']
})
export class RoleAssignmentDialogComponent {
  availableRoles: Role[] = [
    { value: 'ADMIN', label: 'Administrator', description: 'Full system access', icon: 'admin_panel_settings' },
    { value: 'EDITOR', label: 'Editor', description: 'Can create and edit content', icon: 'edit' },
    { value: 'VIEWER', label: 'Viewer', description: 'Read-only access', icon: 'visibility' },
    { value: 'AUDITOR', label: 'Auditor', description: 'Access to audit logs and reports', icon: 'assessment' },
    { value: 'MANAGER', label: 'Manager', description: 'Team management capabilities', icon: 'supervisor_account' }
  ];

  constructor(
    public dialogRef: MatDialogRef<RoleAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string; currentRoles: string[] }
  ) { }

  isRoleSelected(roleValue: string): boolean {
    return this.data.currentRoles.includes(roleValue);
  }

  getSelectedRoles(rolesList: any): string[] {
    return rolesList.selectedOptions.selected.map((option: any) => option.value);
  }
}
