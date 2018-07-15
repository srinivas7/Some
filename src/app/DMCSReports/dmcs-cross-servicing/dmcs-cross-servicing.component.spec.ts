import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsCrossServicingComponent } from './dmcs-cross-servicing.component';

describe('DmcsCrossServicingComponent', () => {
  let component: DmcsCrossServicingComponent;
  let fixture: ComponentFixture<DmcsCrossServicingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsCrossServicingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsCrossServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
