import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <div class="user-detail-container">
      <h2>User Profile</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
          <mat-error *ngIf="userForm.get('email')?.hasError('email')">Invalid email</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Role</mat-label>
          <mat-select formControlName="role">
            <mat-option value="ADMIN">Admin</mat-option>
            <mat-option value="USER">User</mat-option>
            <mat-option value="GUEST">Guest</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid">Save</button>
          <button mat-button type="button">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .user-detail-container { padding: 20px; max-width: 600px; }
    form { display: flex; flex-direction: column; gap: 16px; }
  `]
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required]
    });
  }

  ngOnInit(): void {
    // Mock load data
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userForm.patchValue({
        username: 'loaded_user',
        email: 'user@example.com',
        role: 'ADMIN'
      });
    }
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
