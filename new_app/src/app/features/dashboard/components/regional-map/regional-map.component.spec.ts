import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalMapComponent } from './regional-map.component';

describe('RegionalMapComponent', () => {
  let component: RegionalMapComponent;
  let fixture: ComponentFixture<RegionalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionalMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
