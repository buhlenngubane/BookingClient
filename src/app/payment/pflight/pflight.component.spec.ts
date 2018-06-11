import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PflightComponent } from './pflight.component';

describe('PflightComponent', () => {
  let component: PflightComponent;
  let fixture: ComponentFixture<PflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
