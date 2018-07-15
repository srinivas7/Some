import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsDailyComponent } from './dmcs-daily.component';

describe('DmcsDailyComponent', () => {
  let component: DmcsDailyComponent;
  let fixture: ComponentFixture<DmcsDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
