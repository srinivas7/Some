import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsreportsQuarterlyComponent } from './dmcsreports-quarterly.component';

describe('DmcsreportsQuarterlyComponent', () => {
  let component: DmcsreportsQuarterlyComponent;
  let fixture: ComponentFixture<DmcsreportsQuarterlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsreportsQuarterlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsreportsQuarterlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
