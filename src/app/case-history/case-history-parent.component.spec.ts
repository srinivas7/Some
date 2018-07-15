import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseHistoryParentComponent } from './case-history-parent.component';

describe('CaseHistoryParentComponent', () => {
  let component: CaseHistoryParentComponent;
  let fixture: ComponentFixture<CaseHistoryParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseHistoryParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHistoryParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
