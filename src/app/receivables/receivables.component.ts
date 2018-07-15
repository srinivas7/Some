import { PscService } from "../../assets/PSCServices/psc-service";
import { Component, OnInit, Input, AnimationSequenceMetadata } from '@angular/core';
import { ScrollToConfigOptions, ScrollToService } from "@nicky-lenaers/ngx-scroll-to";
import { Ng2DeviceService } from "ng2-device-detector";

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css']
})
export class ReceivablesComponent implements OnInit {
	[x: string]: any;
  @Input() CollectionsData;
    data;
    
    width = 600;
    height = 400;
    private element;
    type = 'pie3d';
    dataFormat = 'json';
    dataKeys;
    tableView;
    i : number = 0;
    dataSource = {
    chart: {
        "startingangle": "120",
        "showlabels": "0",
        "showlegend": "1",
        "enablemultislicing": "0",
        "slicingdistance": "15",
        "showpercentvalues": "1",
        "showpercentintooltip": "0",
         "legendPosition": "bottom",
        "plottooltext": " $label : $datavalue",
        "theme": "ocean"
    },
    data: [ ]
    };
   DashboardArray: Array<any> = [];
   dashBoardDataArray: Array<any> = [];
  index: any = 0;
  DashBoardMap : any = {};
  currentDepartment: string = "";
  constructor(private PscHttp: PscService,  private PSCDeviceDetector: Ng2DeviceService, private PSCScroll: ScrollToService) {}


  ngOnInit() {
    // setInterval(()=>{
    //   let some = document.getElementsByClassName('raphael-group-3-creditgroup');
    //       if(some.length > 0)
    //           some[0].remove();
    //   },100);
       this.receivablesInitiator();
      
  }
  receivablesInitiator() {
    const UrlProp = '../../assets/PSCServices/receivables.json';
    this.PscHttp.getDashboard(UrlProp).subscribe((response) => {
       if (response) {
        const Array: Array<any> = response['body'];
      if (Array !== undefined && Array !== null) {
          Array.forEach((i, k) => {
            if(i.status != "SKIP TRACE" && i.status != null && i.status != "null"){
              if(this.DashBoardMap[i.department]){
                this.DashBoardMap[i.department].push(i);
              }else{
                this.DashBoardMap[i.department] = [i];
              }
            }
            
					});
          this.dataSource.data = this.DashboardArray;
          this.dataKeys = Object.keys(this.DashBoardMap);
          this.renderGraph();
					this.prepareDepartmentObj();
          if (this.DashboardArray.length > 0) {
             this.onPSCScroll();
            this.PSCDashBoardArray = this.DashboardArray[this.index];
            this.Dashboard();
          }
        }
      }
    }, (error) => this.PscHttp.PscErrorHandler(error));
  }
      
  prepareDepartmentObj(){
    //let i = 0;
    //this.dataKeys = Object.keys(this.DashBoardMap);
    setInterval(() => {
      this.renderGraph();
    },7000);

  }

  renderGraph(){
    if(this.i > this.dataKeys.length - 1){
      this.i =0;
    }
    this.currentDepartment = this.dataKeys[this.i];
    let value = this.DashBoardMap[this.dataKeys[this.i]];
    this.tableView = value;
    console.log(value);
    this.prepareChartObj(value);
    this.i++;
  }
  ngOnChanges(changes) {
      if(changes.CollectionsData.currentValue){
        this.CollectionsData = changes.CollectionsData.currentValue;
      }
   }
  
   renderNextGraph(label){

    let cIndex = this.dataKeys.indexOf(label);
    if(cIndex >= (this.dataKeys.length - 1)){
      cIndex = 0;
    }else{
      cIndex += 1;
    }
    this.i = cIndex;
    this.currentDepartment = this.dataKeys[this.i];
    let value = this.DashBoardMap[this.dataKeys[this.i]];
    this.tableView = value;
    this.prepareChartObj(value);
    
  }
  
  renderPreviousGraph(label){
  
    let cIndex = this.dataKeys.indexOf(label);
    if(cIndex == 0){
      cIndex = this.dataKeys.length - 1;
    }else if(cIndex < (this.dataKeys.length - 1)){
      cIndex = 0;
    }else{
      cIndex -= 1;
    }
    this.i = cIndex;
    this.currentDepartment = this.dataKeys[this.i];
    let value = this.DashBoardMap[this.dataKeys[this.i]];
    this.tableView = value;
    this.prepareChartObj(value);
  }


  prepareChartObj(chartRawDataAry){
    this.data = [];
    if(!chartRawDataAry)
      return;
     chartRawDataAry.forEach((key) => {
       let pie = {
                label: '',
                value : 0,
                tooltext: ""
       } 
        
      pie.label = key.status;
      pie.value = key.amount;
      pie.tooltext = key.department +"-" + key.status + "-"+ Math.abs(key.amount)
      this.data.push(pie);

    });
      this.dataSource.data = this.data;
    }

 Dashboard() {
  
    const dashBoardUpdater = setInterval(() => {
      if (this.index < this.DashboardArray.length) {
        this.PSCDashBoardArray = this.DashboardArray[this.index];
        this.index = this.index + 1;
      } else {
        this.index = 0;
        this.DashboardArray.length = 0;
        clearInterval(dashBoardUpdater);
         this.receivablesInitiator();
      }
    }, 6000);
  }
   onPSCScroll() {
    setTimeout(() => {
      if (this.PSCDeviceDetector.browser === 'ie' && this.PSCDeviceDetector.browser_version >= '11.0') {
        window.scrollBy(0, 375);
      } else {
        const config: ScrollToConfigOptions = {
          target: 'DashboardTable'
        }
        this.PSCScroll.scrollTo(config);
      }
    }, 600);
  }
}
