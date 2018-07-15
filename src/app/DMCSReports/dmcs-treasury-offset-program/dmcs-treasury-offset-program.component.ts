import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";
import { DmcsalertComponent } from "../dmcsalert/dmcsalert.component";
import { DmcsfileuploaderComponent } from "../dmcsfileuploader/dmcsfileuploader.component";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import 'rxjs/Rx';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-dmcs-treasury-offset-program',
  templateUrl: './dmcs-treasury-offset-program.component.html',
  styleUrls: ['./dmcs-treasury-offset-program.component.css']
})
export class DmcsTreasuryOffsetProgramComponent implements OnInit {

  constructor(private PSCRoute: ActivatedRoute, private PSCReportService: PSCReportService,
    private PSCLocalStorage: LocalStorageService, private PSCSessionStorage: SessionStorageService, private matDialog: MatDialog) {
  this.Subpscription = this.PSCReportService.PScReportGetMessageAcross()
                             .subscribe ((value) => { this.isDelete = value.isDeleteable});
  }
  PSCReportId: any;
 Subpscription: Subscription;
 isDelete: boolean;
  Production: Array<object> = [];
  Adhoc: Array<object> = [];
  ProductionUploadBtn: boolean;
  AdhocUploadBtn: boolean;
  DMCStopTitle: {Production: string, Adhoc: string} = {Production: '', Adhoc: ''};
  ngOnInit() {this.DMCSTreasury();}
  DMCSTreasury() {
    this.PSCRoute.params.subscribe((params: Params) => {
      //      console.log(params['Pid']);
      this.PSCReportId = params['Pid'];
    }, (error) => this.PSCReportService.PscErrorHandler(error));
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/reports/?DMCSUserID=" + UserName + "&p=" + this.PSCReportId;
    this.PSCReportService.GetReportJson(Url)
      .subscribe((response: HttpResponse<Object>) => {
        const ResponseBody = response['body'];
        if (ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== "") {
          //          console.log(ResponseBody);
          for (const x in ResponseBody) {
            //            console.log(ResponseBody[x].fileName);
            if (ResponseBody[x].sSectionTitle.indexOf('Production') > -1) {
              //              console.log(true);
              this.DMCStopTitle.Production = ResponseBody[x].sSectionTitle;
              if(!this.ProductionUploadBtn) { this.ProductionUploadBtn = ResponseBody[x].uploadToSectionYN; }
              this.Production.push({
                deleteYN: ResponseBody[x].deleteYN,
                fileDesc: ResponseBody[x].fileDesc,
                fileName: ResponseBody[x].fileName,
                filePath: ResponseBody[x].filePath,
                lastModified: ResponseBody[x].lastModified,
                listOrder: ResponseBody[x].listOrder,
                nSectionNum: ResponseBody[x].nSectionNum,
                sFileSize: ResponseBody[x].sFileSize,
                sFolderPath: ResponseBody[x].sFolderPath,
                sNavigationId: ResponseBody[x].sNavigationId,
                sSectionTitle: ResponseBody[x].sSectionTitle
              });
            } else if (ResponseBody[x].sSectionTitle.indexOf('Ad Hoc') > -1) {
              //              console.log(true);
              this.DMCStopTitle.Adhoc = ResponseBody[x].sSectionTitle;
              if(!this.AdhocUploadBtn) { this.AdhocUploadBtn = ResponseBody[x].uploadToSectionYN; }
              this.Adhoc.push({
                deleteYN: ResponseBody[x].deleteYN,
                fileDesc: ResponseBody[x].fileDesc,
                fileName: ResponseBody[x].fileName,
                filePath: ResponseBody[x].filePath,
                lastModified: ResponseBody[x].lastModified,
                listOrder: ResponseBody[x].listOrder,
                nSectionNum: ResponseBody[x].nSectionNum,
                sFileSize: ResponseBody[x].sFileSize,
                sFolderPath: ResponseBody[x].sFolderPath,
                sNavigationId: ResponseBody[x].sNavigationId,
                sSectionTitle: ResponseBody[x].sSectionTitle
              });
            }
          }
        }
      }, (error) => this.PSCReportService.PscErrorHandler(error));

  }
  DownloadPDF(i) {
    //    console.log(i);
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const Url = " https://dmcspatch.psc.gov/dmcswebapp/download/pdf?DMCSUserID="
      + UserName + "&s=" + i.nSectionNum + "&n=" + i.listOrder;
    const FileSize = parseInt(i.sFileSize);
    if (FileSize !== null && FileSize > 0 && FileSize !== undefined) {
      this.PSCReportService.GetReportPdf(Url, i.fileName);
    } else {
      const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.matDialog.open(ReportsErrormessageComponent, {
        width: "400px",
        height: "200px"
      });
      ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: "DMCS Reports", ErrorMessage: "File is not available", responseType: 'Error'}
    }
  }
   DmcsUpload(CaseName) {
    switch (CaseName) {
     case 'Production':
       this.DMCSTOPFileUploader (this.Production);
       break;
     case 'Adhoc' :
     this.DMCSTOPFileUploader (this.Adhoc);
      break ;
     default:
//      console.log ('nothing selected');
      break;
    }
  }
  DMCSTOPFileUploader(i){
   let secNum:number;
   i.forEach((i,k)=> { if (secNum === undefined) { secNum = i.nSectionNum } });
//    console.log(secNum);
    const UFt = 'R';
    const UFr = secNum.toString();
    const UFa = null;
    const DmcsTreasury: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
      width: '800px',
      height: '300px'
    });
    DmcsTreasury.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
    DmcsTreasury.afterClosed().subscribe(()=> {
      i.length = 0;
      this.DMCSTreasury();
     }, (error)=> this.PSCReportService.PscErrorHandler(error));
  }
  alertMessage(i){
  const DmcsAlert: MatDialogRef<DmcsalertComponent> = this.matDialog.open(DmcsalertComponent, {
   width:'500px',
   height: '175px'
  });
   DmcsAlert.componentInstance.alert = { Message: 'Do you want to delete this file' };
   DmcsAlert.afterClosed().subscribe(() => { this.deleteFile(i) });
  }
  deleteFile(i){
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const SectionNumber = i.nSectionNum;
    const listOrder = i.listOrder;
    const c = i.encodingLevel;
    const URL = "https://dmcspatch.psc.gov/dmcswebapp/deleteFile/pdf?DMCSUserID=" + UserName +
      "&DFt=R&DFr=" + SectionNumber + "&DFa=" + listOrder + "&DFn" + c;
    if (this.isDelete === true) {
      this.PSCReportService.uploadDeleteReports(URL, "DELETE").subscribe((response: HttpResponse<any>) => {
        const ResponseBody = response['body'];
        if (ResponseBody !== undefined && ResponseBody !== null && ResponseBody.length > 0) {
          const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.matDialog.open(ReportsErrormessageComponent, {
            width: "800px",
            height: "400px"
          });
          ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: i.fileName, ErrorMessage: i.fileName + ' ' + ResponseBody, responseType: 'Error'};
          this.Production.length = 0;
          this.Adhoc.length = 0;
          
          this.DMCSTreasury();
        }
      }, (error)=> this.PSCReportService.PscErrorHandler(error));
    }
  }
}


