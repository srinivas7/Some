import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponentComponent } from './pie-chart-component.component';

describe('PieChartComponentComponent', () => {
  let component: PieChartComponentComponent;
  let fixture: ComponentFixture<PieChartComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
