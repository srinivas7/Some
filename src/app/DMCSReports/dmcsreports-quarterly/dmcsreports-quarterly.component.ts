import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {PSCReportService} from '../../../assets/PSCServices/psc-reports-service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
// importing local component as reference for MatDialog
import {DmcsfileuploaderComponent} from '../dmcsfileuploader/dmcsfileuploader.component';
import {DmcsalertComponent} from '../dmcsalert//dmcsalert.component';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';

@Component({
  selector: 'app-dmcsreports-quarterly',
  templateUrl: './dmcsreports-quarterly.component.html',
  styleUrls: ['./dmcsreports-quarterly.component.css']
})
export class DmcsreportsQuarterlyComponent implements OnInit {
  Subpscription: Subscription;
  isDelete: boolean;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private PSCRoute: ActivatedRoute, private PSCReportService: PSCReportService,
    private PSCLocalStorage: LocalStorageService,private matDialog: MatDialog, private PscRoute: Router,
    private PSCSessionStorage: SessionStorageService) {
    this.Subpscription = this.PSCReportService.PScReportGetMessageAcross()
                             .subscribe ((value) => { this.isDelete = value.isDeleteable});
  }
   PSCReportId: any;
   DMKQTR04: Array<object> = [];
   DMKQTR05: Array<object> = [];
   DMKQTR06: Array<object> = [];
   DMKQTR07: Array<object> = [];
   DMKQTR04UploadBtn : boolean;
   DMKQTR05UploadBtn : boolean;
   DMKQTR06UploadBtn : boolean;
   DMKQTR07UploadBtn : boolean;
   DMCSQuarterlyTitle: {DMKQTR04: string, DMKQTR05: string, DMKQTR06: string, DMKQTR07: string, nSectionNumber: any} =
                              {DMKQTR04: '', DMKQTR05: '',DMKQTR06: '',DMKQTR07: '', nSectionNumber: ''};
  ngOnInit() { this.DMCSQuarterly();}
  DMCSQuarterly() {
    this.PSCRoute.params.subscribe((params: Params) => {
//      console.log(params['Pid']);
      this.PSCReportId = params['Pid'];
    }, (error)=>this.PSCReportService.PscErrorHandler(error));
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
    const Url = 'https://dmcspatch.psc.gov/dmcswebapp/reports/?DMCSUserID=' + UserName + '&p=' + this.PSCReportId;
    this.PSCReportService.GetReportJson(Url)
      .subscribe((response: HttpResponse<Object>) => {
        const ResponseBody = response['body'];
        if (ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== "") {
//          console.log(ResponseBody);
          for (const x in ResponseBody) {
//            console.log(ResponseBody[x].fileName);
            if (ResponseBody[x].sSectionTitle.indexOf('DMKQTR04') > -1) {
//              console.log(true);
              this.DMCSQuarterlyTitle.DMKQTR04 = ResponseBody[x].sSectionTitle;
              if(!this.DMKQTR04UploadBtn) { this.DMKQTR04UploadBtn = ResponseBody[x].uploadToSectionYN; }
              this.DMKQTR04.push({
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
            } else if (ResponseBody[x].sSectionTitle.indexOf('DMKQTR05') > -1) {
              this.DMCSQuarterlyTitle.DMKQTR05 = ResponseBody[x].sSectionTitle;
              if (!this.DMKQTR05UploadBtn) { this.DMKQTR05UploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMKQTR05.push({
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
            } else if (ResponseBody[x].sSectionTitle.indexOf('DMKQTR06') > -1) {
              this.DMCSQuarterlyTitle.DMKQTR06 = ResponseBody[x].sSectionTitle;
              if (!this.DMKQTR06UploadBtn) { this.DMKQTR06UploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMKQTR06.push({
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
            } else if (ResponseBody[x].sSectionTitle.indexOf('DMKQTR07') > -1) {
              this.DMCSQuarterlyTitle.DMKQTR07 = ResponseBody[x].sSectionTitle;
              if (!this.DMKQTR07UploadBtn) { this.DMKQTR07UploadBtn = ResponseBody[x].uploadToSectionYN;}
              this.DMKQTR07.push({
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
            }else {
//              console.log(false);
            }

          }
        }
      }, (error)=>this.PSCReportService.PscErrorHandler(error));

  }
  DownloadPDF(i) {
//    console.log(i);
    // tslint:disable-next-line:radix
    const FileSize = parseInt(i.sFileSize);
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
   const Url=' https://dmcspatch.psc.gov/dmcswebapp/download/pdf?DMCSUserID='
              +UserName+'&s='+i.nSectionNum+'&n='+i.listOrder;
     if(FileSize !== null && FileSize > 0 && FileSize !== undefined){
    this.PSCReportService.GetReportPdf(Url, i.fileName);
    } else {
        const ErrorMessage:MatDialogRef<ReportsErrormessageComponent> =  this.matDialog.open(ReportsErrormessageComponent,{
    width:'400px',
     height:'200px'
    });
    // tslint:disable-next-line:max-line-length
    ErrorMessage.componentInstance.ErrorReport ={ErrorMessageTitle:'DMCS Reports', ErrorMessage:'File is not available', responseType:'Error'};
     }
  }
  DmcsUpload(CaseName) {
    switch (CaseName) {
     case 'DMKQTR04':
       this.DMCSQuartlyFileUploader (this.DMKQTR04);
       break;
     case 'DMKQTR05' :
     this.DMCSQuartlyFileUploader (this.DMKQTR05);
      break ;
     case 'DMKQTR06' :
     this.DMCSQuartlyFileUploader (this.DMKQTR06);
     break ;
     case 'DMKQTR07' :
     this.DMCSQuartlyFileUploader (this.DMKQTR07);
     break;
     default:
//      console.log ('nothing selected');
      break;
    }
  }

  DMCSQuartlyFileUploader (i) {
   let secNum:number;
   i.forEach((i,k)=> { if (secNum === undefined) { secNum = i.nSectionNum } });
//    console.log(secNum);
    const UFt = 'R';
    const UFr = secNum.toString();
    const UFa = null;
    const DmcsQuarterly: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
      width: '800px',
      height: '300px'
    });
    DmcsQuarterly.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
    DmcsQuarterly.afterClosed().subscribe(()=> {
      i.length = 0;
      this.DMCSQuarterly();
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
          this.DMKQTR04.length = 0;
          this.DMKQTR05.length = 0;
          this.DMKQTR06.length = 0;
          this.DMKQTR07.length = 0;
          this.DMCSQuarterly();
        }
      }, (error)=> this.PSCReportService.PscErrorHandler(error));
    }
  }
}