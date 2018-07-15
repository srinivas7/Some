import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PscReportsComponent } from './psc-reports.component';

describe('PscReportsComponent', () => {
  let component: PscReportsComponent;
  let fixture: ComponentFixture<PscReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PscReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PscReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
