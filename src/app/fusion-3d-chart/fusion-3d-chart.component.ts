import { Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'fusion-3d-chart',
  templateUrl: './fusion-3d-chart.component.html',
  styleUrls: ['./fusion-3d-chart.component.css']
})
export class Fusion3dChartComponent implements OnInit, OnChanges {
    
    @Input() chartData;
    data;
    private element;
    
    width = 600;
    height = 400;
    type = 'pie3d';
    dataFormat = 'json';
    dataSource = {
    "chart": {
        "caption": "fusion chart",
        "subcaption": "sub caption",
        "startingangle": "120",
        "showlabels": "0",
        "showlegend": "1",
        "enablemultislicing": "0",
        "slicingdistance": "15",
        "showpercentvalues": "1",
        "showpercentintooltip": "0",
        "plottooltext": " $label : $datavalue",
        "theme": "ocean"
    },
    "data": [ ]
    };
  constructor() {
      
  }

  ngOnInit() {
     
  }
  
  ngOnChanges(changes) {
      if(changes.chartData.currentValue){
        this.chartData = changes.chartData.currentValue;
        this.prepareChartObj();
      }
      // setTimeout(()=>{
      //     let some = document.getElementsByClassName('raphael-group-3-creditgroup');
      //     if(some.length > 0)
      //        // some[0].remove();
      // },100)
   }
  
  prepareChartObj(){
     let keys = Object.keys(this.chartData);
     this.data = [];
      keys.forEach((key) => {
       let pie = {
               "label": '',
               "value" : 0
       } 
        if(key == "balance" || key == "debtOriginalLoan" ||
           key == "debtPrincipal" || key == "debtInterestCharges"){
              pie.label = key;
              pie.value = this.chartData[key];
              this.data.push(pie);
           }
  
      });
      this.dataSource.data = this.data;
    }
}
