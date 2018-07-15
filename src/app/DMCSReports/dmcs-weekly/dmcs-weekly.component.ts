import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";
import {DmcsalertComponent} from "../dmcsalert/dmcsalert.component";
import {LocalStorageService,SessionStorageService} from 'ngx-webstorage';
import 'rxjs/Rx';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
// importing local component as reference for MatDialog
import {DmcsfileuploaderComponent} from "../dmcsfileuploader/dmcsfileuploader.component";
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dmcs-weekly',
  templateUrl: './dmcs-weekly.component.html',
  styleUrls: ['./dmcs-weekly.component.css']
})
export class DmcsWeeklyComponent implements OnInit {

  constructor(private PSCRoute: ActivatedRoute, private PSCReportService: PSCReportService,private PSCSessionStorage: SessionStorageService,
    private PSCLocalStorage: LocalStorageService, private DmcsWeeklyDialog: MatDialog, private PscRoute: Router) {
    this.subscription = this.PSCReportService.PScReportGetMessageAcross().subscribe((value) => {this.isDelete = value.isDeleteable}, (error)=> this.PSCReportService.PscErrorHandler(error));
  }
  FileNames: Array<object> = [];
  PSCReportId: any;
  DMCSWeekly: Array<object> = [];
  subscription: Subscription;
  DMCSWeeklyTitle: {Title: string, nSectionNumber: any} = {Title: '', nSectionNumber: ''};
  isWeeklyUpload: boolean = false;
  isDelete: boolean = false;
  isDeleteYN: boolean = false;
  ngOnInit() {this.DMCSWeeklyMethod()}
  DMCSWeeklyMethod() {
    this.PSCRoute.params.subscribe((params: Params) => {
      //   console.log(params['Pid']);
      this.PSCReportId = params['Pid'];
    }, (error)=> this.PSCReportService.PscErrorHandler(error));
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/reports/?DMCSUserID=" + UserName + "&p=" + this.PSCReportId;
    this.PSCReportService.GetReportJson(Url)
      .subscribe((response: HttpResponse<Object>) => {
        const ResponseBody = response['body'];
        if (ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== "") {
          //         console.log(ResponseBody);
          for (const x in ResponseBody) {
            //         console.log(ResponseBody[x].fileName);
            this.isWeeklyUpload = ResponseBody[x].uploadToSectionYN;            
              //             console.log(true);              
              this.DMCSWeeklyTitle.Title = ResponseBody[x].sSectionTitle;
              this.DMCSWeeklyTitle.nSectionNumber = (this.DMCSWeeklyTitle.nSectionNumber === "") ? ResponseBody[x].nSectionNum
                : this.DMCSWeeklyTitle.nSectionNumber;
              this.DMCSWeekly.push({
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
            
              //             console.log(false);
            }

          }        
      }, (error)=> this.PSCReportService.PscErrorHandler(error));
  }
  DownloadPDF(i) {
    //    console.log(i);
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const FileSize = parseInt(i.sFileSize);
    const Url = " https://dmcspatch.psc.gov/dmcswebapp/download/pdf?DMCSUserID="
      + UserName + "&s=" + i.nSectionNum + "&n=" + i.listOrder;
    if (FileSize !== null && FileSize > 0 && FileSize !== undefined) {
      this.PSCReportService.GetReportPdf(Url, i.fileName);
    } else {
      const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.DmcsWeeklyDialog.open(ReportsErrormessageComponent, {
        width: "400px",
        height: "200px"
      });
      ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: "DMCS Reports", ErrorMessage: "File is not available", responseType: 'Error'}
    }
  }
  alertMessage(i) {
    const AlertMsg: MatDialogRef<DmcsalertComponent> = this.DmcsWeeklyDialog.open(DmcsalertComponent, {
      width: "500px",
      height: "175px"
    });
    AlertMsg.componentInstance.alert = {Message: "Are you sure want to delete this file"};
    AlertMsg.afterClosed().subscribe(() => {
      this.DeleteFile(i);
    }, (error)=> this.PSCReportService.PscErrorHandler(error));
  }
  DeleteFile(i) {
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
          const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.DmcsWeeklyDialog.open(ReportsErrormessageComponent, {
            width: "800px",
            height: "400px"
          });
          ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: i.fileName, ErrorMessage: i.fileName + ' ' + ResponseBody, responseType: 'Error'};
          this.DMCSWeekly.length = 0;
          this.DMCSWeeklyMethod();
        }
      }, (error)=> this.PSCReportService.PscErrorHandler(error));
    }
  }
  DmcsWeeklyFileUploader() {
    const UFt = 'R';
    const UFr = this.DMCSWeeklyTitle.nSectionNumber;
    const UFa = null;
    const DmcsWeekly: MatDialogRef<DmcsfileuploaderComponent> = this.DmcsWeeklyDialog.open(DmcsfileuploaderComponent, {
      width: '800px',
      height: '300px'
    });
    DmcsWeekly.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
    DmcsWeekly.afterClosed().subscribe(()=>{
      this.DMCSWeekly.length = 0;
      this.DMCSWeeklyMethod();
     }, (error)=> this.PSCReportService.PscErrorHandler(error));
  }
   

}
