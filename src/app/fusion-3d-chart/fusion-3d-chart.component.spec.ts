import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fusion3dChartComponent } from './fusion-3d-chart.component';

describe('Fusion3dChartComponent', () => {
  let component: Fusion3dChartComponent;
  let fixture: ComponentFixture<Fusion3dChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fusion3dChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fusion3dChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
