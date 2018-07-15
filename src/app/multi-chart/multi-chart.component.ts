import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {PscService} from '../../assets/PSCServices/psc-service';
import { ScrollToService, ScrollToConfigOptions } from "@nicky-lenaers/ngx-scroll-to";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Ng2DeviceService } from "ng2-device-detector";


@Component({
  selector: 'app-multi-chart',
  templateUrl: './multi-chart.component.html',
  styleUrls: ['./multi-chart.component.css']
})
export class MultiChartComponent implements OnInit {

  DashboardArray: Array<any> = [];
  index: any = 0;
   PSCBoardArray: any = [];
  PSCDashBoardArray: any = [];
  [x: string]: any;
  @Input() parentData;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  chartsData;
  processedChartsData: Object = {};
 public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
   obj: this.chartsData
  };
  public barChartLabels:string[] = [];
  public barInfo: any;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public status: string = "";
  public nullOrSkipTraceCount: number = 0;
 
  public barChartData:any[] = [
    {data: [], label: 'legalBalance'},
    {data: [], label: 'totalCases'}
  ];
 
  constructor(private pscService: PscService,  private PSCDeviceDetector: Ng2DeviceService, private PSCScroll: ScrollToService) { }

  ngOnInit() {
    const url = '../../assets/PSCServices/receivables2.json'
    this.pscService.getReceivables1(url).subscribe((data) => {
      this.chartsData = data['body'];
      if(this.chartsData)
        this.processChartsData(this.chartsData);
       const Array: Array<any> = data['body'];
        if (Array !== undefined && Array !== null) {
          Array.forEach((i, k) => {
            
            if(i.status != "SKIP TRACE" && i.status != null && i.status != "null"){
              this.DashboardArray.push
              ({
                department:(i.debtType === null || i.debtType === "null") ? '' : i.department, 
                status:i.status,
                amount: i.amount, 
              });
            }else{
              this.nullOrSkipTraceCount++;
            }
            
          });
          if (this.DashboardArray.length > 0) {
             this.onPSCScroll();
            this.PSCDashBoardArray = this.DashboardArray[this.index];
          }
        }
      
    }, (error) => this.PscHttp.PscErrorHandler(error));
  }

  processChartsData(chartsData){
    let i = 0;
   let value;
   let dataKeys;
    chartsData.forEach(record => {
      if(record.status != "SKIP TRACE" && record.status != null){
        if(this.processedChartsData[record.status]){
          this.processedChartsData[record.status].push(record);
        }else{
          this.processedChartsData[record.status] = [record];
        }
      }else{
        this.nullOrSkipTraceCount++;
      }
      
    });
    setInterval(() => {
      if(i > dataKeys.length - 1){
        i =0;
      }
      let value = this.processedChartsData[dataKeys[i]];
      this.prepareChartObj(value);
      i++;
    },6000);
    dataKeys = Object.keys(this.processedChartsData);
    value = this.processedChartsData[dataKeys[i]];
    this.prepareChartObj(value);
  }
  
    onPSCScroll() {
    setTimeout(() => {
      if (this.PSCDeviceDetector.browser === 'ie' && this.PSCDeviceDetector.browser_version >= '11.0') {
        window.scrollBy(0, 475);
      } else {
        const config: ScrollToConfigOptions = {
          target: 'receivalbes'
        }
        this.PSCScroll.scrollTo(config);
      }
    }, 500);
  }

renderNextGraph(barChartLabel){
    let cGraph = barChartLabel;
    let dataKeys = Object.keys(this.processedChartsData);
    let cIndex = dataKeys.indexOf(cGraph);
    if(cIndex >= (dataKeys.length - 1)){
      cIndex = 0;
    }else{
      cIndex += 1;
    }
    let value = this.processedChartsData[dataKeys[cIndex]];
    this.prepareChartObj(value);
  }
  
renderPreviousGraph(barChartLabel){
    let cGraph = barChartLabel;
    let dataKeys = Object.keys(this.processedChartsData);
    let cIndex = dataKeys.indexOf(cGraph);
    if(cIndex <= 0){
      cIndex = dataKeys.length - 1;
    }else{
      cIndex -= 1;
    }
    let value = this.processedChartsData[dataKeys[cIndex]];
    this.prepareChartObj(value);
  }
  prepareChartObj(currentChart){
      let data0 = [];
      let data1 = [];
      let labels = [];
      this.barChartLabels = [];
      this.barChartData = [
        {data: [], label: 'totalCases'},
        {data: [], label: 'legalBalance'}
      ];

      Object.keys(currentChart).forEach((bar) => {
        bar = currentChart[bar];
        this.department = bar['department'];
         this.status = bar['status'];
        labels.push(bar['department']);
        data0.push(bar['totalCases']);
        data1.push(bar['legalBalance']);
      });
 
      this.barChartLabels = labels;
      this.barChartData[0].data = data0;
      this.barChartData[1].data = data1;
      this.barInfo = currentChart;

      setTimeout(() => {
        if (this.chart && this.chart.chart && this.chart.chart.config) {
          this.chart.chart.config.data.labels = this.barChartLabels;
          this.chart.chart.update();
        }
      });
  }

}
