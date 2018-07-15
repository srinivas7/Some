import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";
import {DmcsalertComponent} from "../dmcsalert/dmcsalert.component";
import {DmcsfileuploaderComponent} from "../dmcsfileuploader/dmcsfileuploader.component";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import 'rxjs/Rx';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-dmcs-cross-servicing',
  templateUrl: './dmcs-cross-servicing.component.html',
  styleUrls: ['./dmcs-cross-servicing.component.css']
})
export class DmcsCrossServicingComponent implements OnInit {

  constructor(private PSCRoute: ActivatedRoute, private PSCReportService: PSCReportService,
    private PSCLocalStorage: LocalStorageService, private PSCSessionStorage: SessionStorageService, private matDialog: MatDialog) {
    this.subscription = this.PSCReportService.PScReportGetMessageAcross().subscribe((value) => {this.isDelete = value.isDeleteable}, (error) => this.PSCReportService.PscErrorHandler(error));
  }
  PSCReportId: any;
  Cross: Array<object> = [];
  isDelete: boolean = false;
  subscription: Subscription;
  isCrossServicingUpload: boolean = false;
  isDeleteYN: boolean = false;
  DMCScsvTitle: {Cross: string, nSectionNumber: any} = {Cross: '', nSectionNumber: ''};
  ngOnInit() {this.DMCSCrossServicing();}
  DMCSCrossServicing() {
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
            //              console.log(true);
            this.isCrossServicingUpload = ResponseBody[x].uploadToSectionYN;
            this.DMCScsvTitle.Cross = ResponseBody[x].sSectionTitle;
            this.Cross.push({
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
      }, (error) => this.PSCReportService.PscErrorHandler(error));

  }
  DownloadPDF(i) {
    //    console.log(i);
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
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
  alertMessage(i) {
    const AlertMsg: MatDialogRef<DmcsalertComponent> = this.matDialog.open(DmcsalertComponent, {
      width: "500px",
      height: "175px"
    });
    AlertMsg.componentInstance.alert = {Message: "Are you sure want to delete this file"};
    AlertMsg.afterClosed().subscribe(() => {
      this.DeleteFile(i);
    }, (error) => this.PSCReportService.PscErrorHandler(error));
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
          const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.matDialog.open(ReportsErrormessageComponent, {
            width: "800px",
            height: "400px"
          });
          ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: i.fileName, ErrorMessage: i.fileName + ' ' + ResponseBody, responseType: 'Error'};
          this.Cross.length = 0;
          this.DMCSCrossServicing();
        }
      }, (error) => this.PSCReportService.PscErrorHandler(error));
    }
  }
  CrossServicingUploader() {
    const UFt = 'R';
    const UFr = this.DMCScsvTitle.nSectionNumber;
    const UFa = null;
    const DmcsCrossServicing: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
      width: '800px',
      height: '300px'
    });
    DmcsCrossServicing.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
    DmcsCrossServicing.afterClosed().subscribe(() => {
      this.Cross.length = 0;
      this.DMCSCrossServicing();
    }, (error) => this.PSCReportService.PscErrorHandler(error));
  }
}
