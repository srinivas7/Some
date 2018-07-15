import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PscnavigationComponent } from './pscnavigation.component';

describe('PscnavigationComponent', () => {
  let component: PscnavigationComponent;
  let fixture: ComponentFixture<PscnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PscnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PscnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
