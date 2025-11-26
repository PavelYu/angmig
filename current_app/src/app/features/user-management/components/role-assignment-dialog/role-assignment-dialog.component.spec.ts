import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssignmentDialogComponent } from './role-assignment-dialog.component';

describe('RoleAssignmentDialogComponent', () => {
  let component: RoleAssignmentDialogComponent;
  let fixture: ComponentFixture<RoleAssignmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAssignmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
