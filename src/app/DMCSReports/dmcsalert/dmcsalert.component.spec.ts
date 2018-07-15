import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcsalertComponent } from './dmcsalert.component';

describe('DmcsalertComponent', () => {
  let component: DmcsalertComponent;
  let fixture: ComponentFixture<DmcsalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcsalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcsalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
