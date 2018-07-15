import { Component, OnInit } from '@angular/core';

import {PscService} from "../../assets/PSCServices/psc-service";

@Component({
  selector: 'app-dmcsdashborad',
  templateUrl: './dmcsdashborad.component.html',
  styleUrls: ['./dmcsdashborad.component.css']
})
export class DmcsdashboradComponent implements OnInit {

  DashboardArray: Array<any> = [];

  index: any = 0;

  PSCDashBoardArray: object = {};

  constructor(private PscHttp: PscService) {}

  ngOnInit() {

    this.dashBoardInitiator();

  }

  dashBoardInitiator() {

    const url = "../../assets/PSCServices/maps.json";

    this.PscHttp.getDashboard(url).subscribe((response) => {

      if (response) {

        const Array: Array<any> = response['body'];

        if (Array !== undefined && Array !== null) {

          Array.forEach((i, k) => {

            this.DashboardArray.push

              ({

                debtType: i.debtType, regionCode: i.regionCode, balance: i.balance,

                debtOriginalLoan: i.debtOriginalLoan, debtPrincipal: i.debtPrincipal,

                debtInterestCharges: i.debtInterestCharges, date: i.date

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

      if (this.index < this.DashboardArray.length - 2) {

        this.PSCDashBoardArray = this.DashboardArray[this.index];

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
