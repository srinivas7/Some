import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Chart, ChartData, Point } from 'chart.js';
import {Color} from 'ng2-charts';
import { BarChartData } from  './bar-chart-data';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() chartData;
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65], label: 'Series A'},
    {data: [28], label: 'Series B'}
  ];
 
  ngOnChanges(changes) {
    console.log("changes data..", changes);
    if(changes.chartData.currentValue){
      this.chartData = changes.chartData.currentValue;
      this.prepareChartObj();
    }
   }

  ngOnInit() {

  }

  prepareChartObj(){
	
	let keys = Object.keys(this.chartData);
    console.log("key is..",keys);
    this.barChartData = [];
    keys.forEach((key) => {
	  //let bar = new BarChartData();
	  let bar : {data:Array<any>, label: string} = {data:[], label: ''} ;
      if(key == "balance" || key == "debtOriginalLoan" ||
          key == "debtPrincipal" || key == "debtInterestCharges"){
            console.log("value is ...", this.chartData[key]);
			bar.data = [parseInt(this.chartData[key])];
			bar.label = key;
			this.barChartData.push(bar);
      }

	});
	console.log("bar chart final data is..", this.barChartData)
	
	

  }
  
 
}
