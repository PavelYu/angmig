import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCellRendererComponent } from './status-cell-renderer.component';

describe('StatusCellRendererComponent', () => {
  let component: StatusCellRendererComponent;
  let fixture: ComponentFixture<StatusCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
