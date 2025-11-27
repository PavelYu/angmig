import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    standalone: false
})
export class UserDetailComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      role: ['USER', Validators.required],
      status: ['ACTIVE'],
      phone: [''],
      department: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(id);
    }
  }

  private loadUser(id: string): void {
    // Mock data - in real app, load from service
    this.userForm.patchValue({
      username: 'john.doe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'ADMIN',
      status: 'ACTIVE',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      bio: 'Senior software engineer with 10+ years of experience.'
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Saving user:', this.userForm.value);
      // In real app: this.userService.updateUser(this.userForm.value);
    }
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
