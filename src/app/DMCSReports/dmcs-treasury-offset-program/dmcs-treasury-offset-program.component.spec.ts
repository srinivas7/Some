import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsTreasuryOffsetProgramComponent } from './dmcs-treasury-offset-program.component';

describe('DmcsTreasuryOffsetProgramComponent', () => {
  let component: DmcsTreasuryOffsetProgramComponent;
  let fixture: ComponentFixture<DmcsTreasuryOffsetProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsTreasuryOffsetProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsTreasuryOffsetProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
