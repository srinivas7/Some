import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PscUserReportsComponent } from './psc-user-reports.component';

describe('PscUserReportsComponent', () => {
  let component: PscUserReportsComponent;
  let fixture: ComponentFixture<PscUserReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PscUserReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PscUserReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
