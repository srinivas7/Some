import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { Chart, getDashboard, Point } from 'chart.js';
import {Color} from 'ng2-charts';
import {PscService} from '../../assets/PSCServices/psc-service';

@Component({
  selector: 'app-pie-chart-component',
  templateUrl: './pie-chart-component.component.html',
  styleUrls: ['./pie-chart-component.component.css']
})
export class PieChartComponentComponent implements OnInit, OnChanges {
   @Input() chartData;
  name: string;
  labels:string[] = ['BALANCE','DEBT_ORGINAL_LOAN','DEBT_PRINCIPAL','DEBT_INTEREST_CHARGES']
  data: number[] = []; 
   type:string = 'pie';
  public chartColors: any[] = [
    { 
      backgroundColor:["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"] 
    }];
   
   datasets: any[] = [
   {
     data: this.data,
    hoverBackgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"]
   }];
  
  public options: any = {
	hover: { 
		onHover: function(event, active) { 
			//console.log("hover");
		} 
  	},
	tooltips: {
		callbacks: {
			label: function(tooltipItem, data) {
			console.log(tooltipItem, data);
			let index = tooltipItem.index;
			let quantity = parseInt(data.datasets[0].data[index]);
			let text = "$" +quantity.toLocaleString();
			return text;
			}
		 }
		}
  }
 
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
 