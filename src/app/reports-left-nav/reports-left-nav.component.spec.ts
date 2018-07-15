import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsLeftNavComponent } from './reports-left-nav.component';

describe('ReportsLeftNavComponent', () => {
  let component: ReportsLeftNavComponent;
  let fixture: ComponentFixture<ReportsLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
