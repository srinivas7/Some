import {Component, OnInit} from '@angular/core';
import {PSCReportService} from '../../../assets/PSCServices//psc-reports-service';
import { DmcsalertComponent } from "../dmcsalert/dmcsalert.component";
import { DmcsfileuploaderComponent } from "../dmcsfileuploader/dmcsfileuploader.component";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dmcsreports-monthly',
  templateUrl: './dmcsreports-monthly.component.html',
  styleUrls: ['./dmcsreports-monthly.component.css']
})
export class DmcsreportsMonthlyComponent implements OnInit {

  constructor(private PSCReport: PSCReportService, private PSCLocalStorage: LocalStorageService, private PSCSessionStorage: SessionStorageService,
    private PSCActivatedRoute: ActivatedRoute, private matDialog: MatDialog, private PscRoute: Router) {
    this.Subpscription = this.PSCReport.PScReportGetMessageAcross()
                             .subscribe ((value) => { this.isDelete = value.isDeleteable});
  }
  PSCReportId: any;
  DMKJCL01: Array<object> = [];
  DMKMNTJ2: Array<object> = [];
  DMKMNTJ3: Array<object> = [];
  DMKMNTJ4: Array<object> = [];
  DMKMNTJ5: Array<object> = [];
  DMKMNTJ6: Array<object> = [];
  DMKMNTJ7: Array<object> = [];
  DMKMNTJ8: Array<object> = [];
  DMKMNTH2: Array<object> = [];
  DMKMNTH3: Array<object> = [];
  DMKM155M: Array<object> = [];
  DMKCOLAG: Array<object> = [];
  ERRP: Array<object> = [];
  DMKJCL01UploadBtn: boolean;
  DMKMNTJ2UploadBtn: boolean;
  DMKMNTJ3UploadBtn: boolean;
  DMKMNTJ4UploadBtn: boolean;
  DMKMNTJ5UploadBtn: boolean;
  DMKMNTJ6UploadBtn: boolean;
  DMKMNTJ7UploadBtn: boolean;
  DMKMNTJ8UploadBtn: boolean;
  DMKMNTH2UploadBtn: boolean;
  DMKMNTH3UploadBtn: boolean;
  DMKM155MUploadBtn: boolean;
  DMKCOLAGUploadBtn: boolean;
  ERRPUploadBtn: boolean;
  isDelete: boolean;
  Subpscription: Subscription;
  DMCMonthlyTitle: {
    DMKJCL01: string, DMKMNTJ2: string, DMKMNTJ3: string, DMKMNTJ4: string, DMKMNTJ5: string,
    DMKMNTJ6: string, DMKMNTJ7: string, DMKMNTJ8: string, DMKMNTH2: string, DMKMNTH3: string,
    DMKM155M: string, DMKCOLAG: string, ERRP: string
  } =
  {
    DMKJCL01: '', DMKMNTJ2: '', DMKMNTJ3: '', DMKMNTJ4: '', DMKMNTJ5: '', DMKMNTJ6: '', DMKMNTJ7: '',
    DMKMNTJ8: '', DMKMNTH2: '', DMKMNTH3: '', DMKM155M: '', DMKCOLAG: '', ERRP: ''
  };
  ngOnInit() {this.DMCSMonthly();}
  DMCSMonthly() {
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    this.PSCActivatedRoute.params.subscribe((params: Params) => {
      this.PSCReportId = params['Pid'];
    }, (error) => this.PSCReport.PscErrorHandler(error));
    const URL = "https://dmcspatch.psc.gov/dmcswebapp/reports/?DMCSUserID=" + UserName + "&p=" + this.PSCReportId;
    this.PSCReport.GetReportJson(URL).subscribe((response: HttpResponse<Object>) => {
      const ResponseBody = response['body'];
      if (ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== "") {
        //        console.log(ResponseBody);
        for (const x in ResponseBody) {
          if (ResponseBody[x].sSectionTitle.indexOf('DMKJCL01') > -1) {
            //             console.log(true);
            this.DMCMonthlyTitle.DMKJCL01 = ResponseBody[x].sSectionTitle;
            if (!this.DMKJCL01UploadBtn) {this.DMKJCL01UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKJCL01.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ2') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ2 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ2UploadBtn) {this.DMKMNTJ2UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ2.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ3') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ3 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ3UploadBtn) {this.DMKMNTJ3UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ3.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ4') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ4 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ4UploadBtn) {this.DMKMNTJ4UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ4.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ5') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ5 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ5UploadBtn) {this.DMKMNTJ5UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ5.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ6') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ6 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ6UploadBtn) {this.DMKMNTJ6UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ6.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ7') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ7 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ7UploadBtn) {this.DMKMNTJ7UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ7.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTJ8') > -1) {
            this.DMCMonthlyTitle.DMKMNTJ8 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTJ8UploadBtn) {this.DMKMNTJ8UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTJ8.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTH2') > -1) {
            this.DMCMonthlyTitle.DMKMNTH2 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTH2UploadBtn) {this.DMKMNTH2UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTH2.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKMNTH3') > -1) {
            this.DMCMonthlyTitle.DMKMNTH3 = ResponseBody[x].sSectionTitle;
            if (!this.DMKMNTH3UploadBtn) {this.DMKMNTH3UploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKMNTH3.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKM155M') > -1) {
            this.DMCMonthlyTitle.DMKM155M = ResponseBody[x].sSectionTitle;
            if (!this.DMKM155MUploadBtn) {this.DMKM155MUploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKM155M.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('DMKCOLAG') > -1) {
            this.DMCMonthlyTitle.DMKCOLAG = ResponseBody[x].sSectionTitle;
            if (!this.DMKCOLAGUploadBtn) {this.DMKCOLAGUploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.DMKCOLAG.push({
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
          } else if (ResponseBody[x].sSectionTitle.indexOf('ERRP') > -1) {
            this.DMCMonthlyTitle.ERRP = ResponseBody[x].sSectionTitle;
            if (!this.ERRPUploadBtn) {this.ERRPUploadBtn = ResponseBody[x].uploadToSectionYN;}
            this.ERRP.push({
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
            //        console.log(false);
          }
        }
      }
    }, (error) => this.PSCReport.PscErrorHandler(error));
  }
  DownloadPDF(i) {
    //  console.log(i    
    const UserName = this.PSCLocalStorage.retrieve('PSCUserName');
    const Url = " https://dmcspatch.psc.gov/dmcswebapp/download/pdf?DMCSUserID="
      + UserName + "&s=" + i.nSectionNum + "&n=" + i.listOrder;
    const FileSize = parseInt(i.sFileSize);
    if (FileSize !== null && FileSize > 0 && FileSize !== undefined) {
      this.PSCReport.GetReportPdf(Url, i.fileName);
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
      case 'DMKJCL01':
        this.DMCSMonthlyFileUploader(this.DMKJCL01);
        break;
      case 'DMKMNTJ2':
        this. DMCSMonthlyFileUploader(this.DMKMNTJ2);
        break;
      case 'DMKMNTJ3':
        this. DMCSMonthlyFileUploader(this.DMKMNTJ3);
        break;
      case 'DMKMNTJ4':
        this. DMCSMonthlyFileUploader(this.DMKMNTJ4);
        break;
      case 'DMKMNTJ5':
        this.DMCSMonthlyFileUploader(this.DMKMNTJ5);
        break;
      case 'DMKMNTJ6':
        this. DMCSMonthlyFileUploader(this.DMKMNTJ6);
        break;
      case 'DMKMNTJ7':
        this. DMCSMonthlyFileUploader(this.DMKMNTJ7);
        break;
      case 'DMKMNTJ8':
        this. DMCSMonthlyFileUploader(this.DMKMNTJ8);
        break;
        case 'DMKMNTH2':
        this. DMCSMonthlyFileUploader(this.DMKMNTH2);
        break;
      case 'DMKMNTH3':
        this. DMCSMonthlyFileUploader(this.DMKMNTH3);
        break;
      case 'DMKM155M':
        this. DMCSMonthlyFileUploader(this.DMKM155M);
        break;
      case 'DMKCOLAG':
        this.DMCSMonthlyFileUploader(this.DMKCOLAG);
        break;
      case 'ERRP':
        this. DMCSMonthlyFileUploader(this.ERRP);
        break;
      default:
//        console.log('nothing selected');
        break;
    }
  }
  DMCSMonthlyFileUploader (i) {
   let secNum:number;
   i.forEach((i,k)=> { if (secNum === undefined) { secNum = i.nSectionNum } });
//    console.log(secNum);
    const UFt = 'R';
    const UFr = secNum.toString();
    const UFa = null;
    const DmcsMonthly: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
      width: '800px',
      height: '300px'
    });
    DmcsMonthly.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
    DmcsMonthly.afterClosed().subscribe(()=> {
      i.length = 0;
      this.DMCSMonthly();
     }, (error)=> this.PSCReport.PscErrorHandler(error));
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
      this.PSCReport.uploadDeleteReports(URL, "DELETE").subscribe((response: HttpResponse<any>) => {
        const ResponseBody = response['body'];
        if (ResponseBody !== undefined && ResponseBody !== null && ResponseBody.length > 0) {
          const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.matDialog.open(ReportsErrormessageComponent, {
            width: "800px",
            height: "400px"
          });
          ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: i.fileName, ErrorMessage: i.fileName + ' ' + ResponseBody, responseType: 'Error'};
          this.DMKJCL01.length = 0;
          this.DMKMNTJ2.length = 0;
          this.DMKMNTJ3.length = 0;
          this.DMKMNTJ4.length = 0;
          this.DMKMNTJ5.length = 0;
          this.DMKMNTJ6.length = 0;
          this.DMKMNTJ7.length = 0;
          this.DMKMNTJ8.length = 0;
          this.DMKMNTH2.length = 0;
          this.DMKMNTH3.length = 0;
          this.DMKM155M.length = 0;
          this.DMKCOLAG.length = 0;
          this.ERRP.length = 0;
          this.DMCSMonthly();
        }
      }, (error)=> this.PSCReport.PscErrorHandler(error));
    }
  }
}
