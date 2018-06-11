import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcarRentalComponent } from './pcar-rental.component';

describe('PcarRentalComponent', () => {
  let component: PcarRentalComponent;
  let fixture: ComponentFixture<PcarRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcarRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcarRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
