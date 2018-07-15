import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsInboundFilesComponent } from './dmcs-inbound-files.component';

describe('DmcsInboundFilesComponent', () => {
  let component: DmcsInboundFilesComponent;
  let fixture: ComponentFixture<DmcsInboundFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsInboundFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsInboundFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
