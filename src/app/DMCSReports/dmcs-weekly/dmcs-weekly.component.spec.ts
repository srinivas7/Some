import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsWeeklyComponent } from './dmcs-weekly.component';

describe('DmcsWeeklyComponent', () => {
  let component: DmcsWeeklyComponent;
  let fixture: ComponentFixture<DmcsWeeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsWeeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
