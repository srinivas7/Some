import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsOutboundFilesComponent } from './dmcs-outbound-files.component';

describe('DmcsOutboundFilesComponent', () => {
  let component: DmcsOutboundFilesComponent;
  let fixture: ComponentFixture<DmcsOutboundFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsOutboundFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsOutboundFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
