import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RederChildComponent } from './reder-child.component';

describe('RederChildComponent', () => {
  let component: RederChildComponent;
  let fixture: ComponentFixture<RederChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RederChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RederChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
