import { Component, OnInit, Input } from '@angular/core';
import {PscService} from '../../assets/PSCServices/psc-service';
import {Color} from 'ng2-charts';

@Component({
selector: 'app-pie-chart-parent-component',
  templateUrl: './pie-chart-parent-component.component.html',
  styleUrls: ['./pie-chart-parent-component.component.css']
})
export class PieChartParentComponentComponent implements OnInit{
  DashboardArray: Array<any> = [];
  index: any = 0;
  PSCDashBoardArray: object = {};
  obj;
  
  constructor(private PscHttp: PscService) {}
 
   ngOnInit() {

    this.dashBoardInitiator();
  }

  dashBoardInitiator() {
    const url = '../../assets/PSCServices/maps.json';
    this.PscHttp.getDashboard(url).subscribe((response) => {

      if (response) {
        const Array: Array<any> = response['body'];
        if (Array !== undefined && Array !== null) {
          Array.forEach((i, k) => {
            this.DashboardArray.push
              ({
                debtType: i.debtType, regionCode: i.regionCode, balance: i.balance,
                debtOriginalLoan: i.debtOriginalLoan, debtPrincipal: i.debtPrincipal,
                debtInterestCharges: i.debtIntrestCharges, date: i.date
              });
          });

          if (this.DashboardArray.length > 0) {
            this.PSCDashBoardArray = this.DashboardArray[this.index];
            this.Dashboard();
          }
        }
      }
     });
   }
 
  Dashboard() {
    const dashBoardUpdater = setInterval(() => {
      if (this.index < this.DashboardArray.length ) {
        this.PSCDashBoardArray = this.DashboardArray[this.index];
        this.obj = this.PSCDashBoardArray;
        this.index = this.index + 1;
      } else {
        this.index = 0;
        this.DashboardArray.length = 0;
        clearInterval(dashBoardUpdater);
        this.dashBoardInitiator();
      }
    }, 20000);
  }
 }