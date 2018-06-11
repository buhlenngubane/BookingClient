import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairTaxiComponent } from './pair-taxi.component';

describe('PairTaxiComponent', () => {
  let component: PairTaxiComponent;
  let fixture: ComponentFixture<PairTaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairTaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
