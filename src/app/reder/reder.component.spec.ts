import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RederComponent } from './reder.component';

describe('RederComponent', () => {
  let component: RederComponent;
  let fixture: ComponentFixture<RederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
