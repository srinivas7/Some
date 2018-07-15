import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Chart, ChartData, Point } from 'chart.js';
import {Color} from 'ng2-charts';

import {PscService} from '../../assets/PSCServices/psc-service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() chartData;
  
  name:string;
  labels:string[] = ['balance', 'debtOriginalLoan', 'debtPrincipal','debtIntrestCharges'];
  data:number[] = [];
  type:string = 'pie';
  //type:string = 'doughnut';
  public chartColors: any[] = [
    { 
      backgroundColor:["#FF7360", "#6FC8CE", "#BBFFF6", "#FFBCC4"] 
    }];
  
  datasets: any[] = [
  {
    data: this.data,
    hoverBackgroundColor: ["#FF7360", "#6FC8CE", "#BBFFF6", "#FFBCC4"]
  }];

  constructor(private PscHttp: PscService) { 
    this.name = 'Angular2';
   }

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
    this.data = [];
    keys.forEach((key) => {
      
      if(key == "balance" || key == "debtOriginalLoan" ||
          key == "debtPrincipal" || key == "debtInterestCharges"){
            console.log("value is ...", this.chartData[key]);
            this.data.push(this.chartData[key]);

      }

    });
    this.datasets[0].data = this.data;
    console.log(this.data);
  }

}
