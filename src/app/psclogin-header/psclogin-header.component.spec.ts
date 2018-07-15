import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PscloginHeaderComponent } from './psclogin-header.component';

describe('PscloginHeaderComponent', () => {
  let component: PscloginHeaderComponent;
  let fixture: ComponentFixture<PscloginHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PscloginHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PscloginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
