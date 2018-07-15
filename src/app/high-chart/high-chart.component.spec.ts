import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighChartComponent } from './high-chart.component';

describe('HighChartComponent', () => {
  let component: HighChartComponent;
  let fixture: ComponentFixture<HighChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
