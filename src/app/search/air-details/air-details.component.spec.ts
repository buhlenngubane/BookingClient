import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirDetailsComponent } from './air-details.component';

describe('AirDetailsComponent', () => {
  let component: AirDetailsComponent;
  let fixture: ComponentFixture<AirDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
