import {Component, OnInit, OnDestroy} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";
import {ReportsErrormessageComponent} from "../reports-errormessage/reports-errormessage.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import 'rxjs/Rx';
import {DmcsalertComponent} from "../dmcsalert//dmcsalert.component";
import {DmcsfileuploaderComponent} from "../dmcsfileuploader/dmcsfileuploader.component";
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-dmcs-daily',
  templateUrl: './dmcs-daily.component.html',
  styleUrls: ['./dmcs-daily.component.css']
})
export class DmcsDailyComponent implements OnInit {

  constructor(private PSCRoute: ActivatedRoute, private PSCReportService: PSCReportService,
    private PSCLocalStorage: LocalStorageService, private PSCSessionStorage: SessionStorageService, private matDialog: MatDialog, private PscRoute: Router) {
    this.subscription = this.PSCReportService.PScReportGetMessageAcross().subscribe((value) => {this.isDelete = value.isDeleteable}, (error) => this.PSCReportService.PscErrorHandler(error));
  }
  PSCReportId: any;
  DMCSDailyTOP: Array<object> = [];
  DMCSDailyCROR1: Array<object> = [];
  DMCSDailyCROR2: Array<object> = [];
  DMCSDailyCOD: Array<object> = [];
  DMCSDailyCOS: Array<object> = [];
  DMCSDailyTOPUploadBtn: boolean;
  DMCSDailyCROR1UploadBtn: boolean;
  DMCSDailyCROR2UploadBtn: boolean;
  DMCSDailyCODUploadBtn: boolean;
  DMCSDailyCOSUploadBtn: boolean;
  subscription: Subscription;
  isDelete: boolean = false;
  isDeleteYN: boolean = false;
  DMCDailyTitle: {TopProcessing: string, CORP1: string, CORP2: string, COD: string, COS: string} =
  {TopProcessing: '', CORP1: '', CORP2: '', COD: '', COS: ''};
  ngOnInit() {

    this.DMcsDaily();
  }
  DMcsDaily() {
    this.PSCRoute.params.subscribe((params: Params) => {
      //   console.log(params['Pid']);
      this.PSCReportId = params['Pid'];
    }, (error) => this.PSCReportService.PscErrorHandler(error));
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/reports/?DMCSUserID=" + UserName + "&p=" + this.PSCReportId;
    this.PSCReportService.GetReportJson(Url)
      .subscribe((response: HttpResponse<Object>) => {
        const ResponseBody = response['body'];
        if (ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== "") {
          //                   console.log(ResponseBody);
          for (const x in ResponseBody) {
            //                  console.log(ResponseBody[x].fileName);
            if (ResponseBody[x].fileName.indexOf('TOPCV') > -1) {
              //             console.log(true);
              this.isDeleteYN = ResponseBody[x].deleteYN;
              this.DMCDailyTitle.TopProcessing = ResponseBody[x].sSectionTitle;
              if (!this.DMCSDailyTOPUploadBtn) {this.DMCSDailyTOPUploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMCSDailyTOP.push({
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
            } else {
              //             console.log(false);
            }
            if (ResponseBody[x].fileName.indexOf('CS001') > -1) {
              this.DMCDailyTitle.CORP1 = ResponseBody[x].sSectionTitle;
              if (!this.DMCSDailyCROR1UploadBtn) {this.DMCSDailyCROR1UploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMCSDailyCROR1.push({
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
            } else {
              //             console.log(false);
            }
            if (ResponseBody[x].fileName.indexOf('CS002') > -1) {
              this.DMCDailyTitle.CORP2 = ResponseBody[x].sSectionTitle;
              if (!this.DMCSDailyCROR2UploadBtn) {this.DMCSDailyCROR2UploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMCSDailyCROR2.push({
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
            } else {
              //             console.log(false);
            }
            if (ResponseBody[x].fileName.indexOf('COLCVDET') > -1) {
              this.DMCDailyTitle.COD = ResponseBody[x].sSectionTitle;
              if (!this.DMCSDailyCODUploadBtn) {this.DMCSDailyCODUploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMCSDailyCOD.push({
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
            } else {
              //             console.log(false);
            }
            if (ResponseBody[x].fileName.indexOf('COLCVSUM') > -1) {
              this.DMCDailyTitle.COS = ResponseBody[x].sSectionTitle;
              if (!this.DMCSDailyCOSUploadBtn) {this.DMCSDailyCOSUploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMCSDailyCOS.push({
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
            } else {
              //             console.log(false);
            }
            //           console.log(this.DMCSDailyTOP);
          }
        }
      }, (error) => this.PSCReportService.PscErrorHandler(error));
  }
  DownloadPDF(i) {
    //    console.log(i);
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const Url = " https://dmcspatch.psc.gov/dmcswebapp/download/pdf?DMCSUserID="
      + UserName + "&s=" + i.nSectionNum + "&n=" + i.listOrder;
    //    this.PSCReportService.GetReportPdf(Url, i.fileName);
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
      case 'DMCSDailyTOP':
        this.DMCSDailyFileUploader(this.DMCSDailyTOP);
        break;
      case 'DMCSDailyCROR1':
        this.DMCSDailyFileUploader(this.DMCSDailyCROR1);
        break;
      case 'DMCSDailyCROR2':
        this.DMCSDailyFileUploader(this.DMCSDailyCROR2);
        break;
      case 'DMCSDailyCOD':
        this.DMCSDailyFileUploader(this.DMCSDailyCOD);
        break;
      case 'DMCSDailyCOS':
        this.DMCSDailyFileUploader(this.DMCSDailyCOS);
        break;
      default:
//        console.log('nothing selected');
        break;
    }
  }
  DMCSDailyFileUploader(i) {
    let secNum: number;
    i.forEach((i, k) => {if (secNum === undefined) {secNum = i.nSectionNum} });
//    console.log(secNum);
    const UFt = 'R';
    const UFr = secNum.toString();
    const UFa = null;
    const DmcsDaily: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
      width: '800px',
      height: '300px'
    });
    DmcsDaily.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
    DmcsDaily.afterClosed().subscribe(() => {
      i.length = 0;
      this.DMcsDaily();
    }, (error) => this.PSCReportService.PscErrorHandler(error));
  }
  alertMessage(i) {
    const DmcsAlert: MatDialogRef<DmcsalertComponent> = this.matDialog.open(DmcsalertComponent, {
      width: '500px',
      height: '175px'
    });
    DmcsAlert.componentInstance.alert = {Message: 'Do you want to delete this file'};
    DmcsAlert.afterClosed().subscribe(() => {this.deleteFile(i)});
  }
  deleteFile(i) {
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
          this.DMCSDailyTOP.length = 0;
          this.DMCSDailyCROR1.length = 0;
          this.DMCSDailyCROR2.length = 0;
          this.DMCSDailyCOD.length = 0;
          this.DMCSDailyCOS.length = 0;
          this.DMcsDaily();
        }
      }, (error) => this.PSCReportService.PscErrorHandler(error));
    }
  }
}
