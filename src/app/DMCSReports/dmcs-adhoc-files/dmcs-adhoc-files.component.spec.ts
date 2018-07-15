import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsAdhocFilesComponent } from './dmcs-adhoc-files.component';

describe('DmcsAdhocFilesComponent', () => {
  let component: DmcsAdhocFilesComponent;
  let fixture: ComponentFixture<DmcsAdhocFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsAdhocFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsAdhocFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
