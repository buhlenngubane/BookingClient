import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirTaxiComponent } from './air-taxi.component';

describe('AirTaxiComponent', () => {
  let component: AirTaxiComponent;
  let fixture: ComponentFixture<AirTaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirTaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
