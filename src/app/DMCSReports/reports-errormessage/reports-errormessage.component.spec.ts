import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsErrormessageComponent } from './reports-errormessage.component';

describe('ReportsErrormessageComponent', () => {
  let component: ReportsErrormessageComponent;
  let fixture: ComponentFixture<ReportsErrormessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsErrormessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsErrormessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
