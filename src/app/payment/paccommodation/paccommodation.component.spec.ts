import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaccommodationComponent } from './paccommodation.component';

describe('PaccommodationComponent', () => {
  let component: PaccommodationComponent;
  let fixture: ComponentFixture<PaccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
