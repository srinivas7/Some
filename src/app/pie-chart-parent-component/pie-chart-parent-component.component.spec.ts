import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartParentComponentComponent } from './pie-chart-parent-component.component';

describe('PieChartParentComponentComponent', () => {
  let component: PieChartParentComponentComponent;
  let fixture: ComponentFixture<PieChartParentComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartParentComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartParentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
