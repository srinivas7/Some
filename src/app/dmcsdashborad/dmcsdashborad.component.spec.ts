import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsdashboradComponent } from './dmcsdashborad.component';

describe('DmcsdashboradComponent', () => {
  let component: DmcsdashboradComponent;
  let fixture: ComponentFixture<DmcsdashboradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsdashboradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsdashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
