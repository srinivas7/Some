import { Component, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'high-chart',
  templateUrl: './high-chart.component.html',
  styleUrls: ['./high-chart.component.css']
})
export class HighChartComponent {

  title = 'Highcharts + Angular 5 Demo';

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: Highcharts.ChartObject;
  
  ngAfterViewInit() {
    const options: Highcharts.Options = {
      chart: {
        type: 'bar',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
      }
      },
      title: {
        text: 'Fruit Consumption'
      },
      plotOptions: {
        column: {
            depth: 25
        }
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
      }, {
        name: 'John',
        data: [5, 7, 3]
      }]
    };
  
    this.chart = chart(this.chartTarget.nativeElement, options);
  }

  addSeries(){
    this.chart.addSeries({
      name:'Balram',
      data:[2,3,7]
    })    
  }
  depthFun(value){
    this.chart.options.chart.options3d['depth'] = parseFloat(value);
    this.chart.redraw(false);
  }

}
