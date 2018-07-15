import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsreportsMonthlyComponent } from './dmcsreports-monthly.component';

describe('DmcsreportsMonthlyComponent', () => {
  let component: DmcsreportsMonthlyComponent;
  let fixture: ComponentFixture<DmcsreportsMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsreportsMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsreportsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
