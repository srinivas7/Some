import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";

@Component({
  selector: 'app-dmcsalert',
  templateUrl: './dmcsalert.component.html',
  styleUrls: ['./dmcsalert.component.css']
})
export class DmcsalertComponent implements OnInit {
  constructor(private MatDialog: MatDialogRef<DmcsalertComponent>, private PSCHTTP:PSCReportService  ) { }
public alert:{Message:string};
 isDelete:boolean;
  ngOnInit() {}
OnClose(value:boolean){
  this.isDelete = value;
  this.PSCHTTP.PScReportSendMessageAcross(this.isDelete);
  this.MatDialog.close();
}  
}
