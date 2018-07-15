import { Injectable} from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders} from '@angular/common/http';
import {ResponseContentType} from '@angular/http';
import * as PSCFileSaver from 'file-saver';
import {Router} from '@angular/router';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ReportsErrormessageComponent} from '../../app/DMCSReports/reports-errormessage/reports-errormessage.component';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
 const PSCPDF_Extension ='.pdf';
const PSCTEXT_Extension ='.txt';
const PSCXlSX_Extension =".xlsx";
const form_data = require('form-data');
@Injectable()
export class PSCReportService{
  constructor(private PSCHttp: HttpClient, private MatDiaLog:MatDialog, private PscRoute: Router, 
    private PSCLocalStorage: LocalStorageService, private PSCSessionStorage: SessionStorageService ){}
    PSCSubject = new Subject<any>();
  GetReportJson(Url){
    const GetReportJsonRequest = new HttpRequest('GET', Url, {
    observe:'response',
      content:'application/json'
    });
    return this.PSCHttp.request(GetReportJsonRequest).catch(this.PSCReportErrorHandler);
  }
  GetReportPdf(Url, FileName){
  const GetReportPdfRequest = new HttpRequest('GET', Url,{
//    observe:'response',
//    content:'application/octet-stream'
      responseType:"arraybuffer"
  });
    this.PSCHttp.request(GetReportPdfRequest).catch(this.PSCReportErrorHandler).subscribe((response:HttpResponse<any>)=>{
      const ResponseBody= response['body'];
      if(ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== ""){
//    console.log(response['body']);
        const FileType ="";
       const Buffer = ResponseBody;
//        console.log(Buffer);
//        this.saveAsBlob(Buffer);
      this.PSCFileSaver(Buffer, FileName, FileType);
      }else{
//        const ErrorReport:MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent,{
//         width:"500px",
//         height:'400px'
//        });
//        ErrorReport.componentInstance.ErrorReport  ={ErrorMessageTitle:'Response', ErrorMessage:'No Files Available'}
      }
    },(error)=>this.PscErrorHandler(error));
  }  
   public PSCFileSaver(buffer:any, fileName: String,fileType:string):void{
     const PSCData:  Blob = new Blob([buffer], {
       type:''
     });
     if(fileName.length > 0){
       if(fileName.indexOf(PSCTEXT_Extension) > -1 || fileName.indexOf(PSCPDF_Extension)  > -1 || fileName.indexOf(PSCXlSX_Extension )   > -1){
         PSCFileSaver.saveAs(PSCData, fileName);
       }else{
         switch(fileType){
           case "PDF":
             PSCFileSaver.saveAs(PSCData, fileName+PSCPDF_Extension);
             break;
           case "Text":
             PSCFileSaver.saveAs(PSCData, fileName+PSCTEXT_Extension);
             break;
           case "Excel":
             PSCFileSaver.saveAs(PSCData, fileName+PSCXlSX_Extension);
             break;
            default:
             PSCFileSaver.saveAs(PSCData, fileName);
             break;
       }
        
     }  
 }
  } 
   
 // File Uploader Post Method
  fileUploader(Url,FilePayload){ 
//    const header = new HttpHeaders().set('Content-Type','multipart/form-data'); 
    const form = new FormData();   
  return this.PSCHttp.post(Url,FilePayload, {
  responseType:'text'
  }).map((response)=>{
  const data = response;
    return data;
   }).catch(this.PSCReportErrorHandler);
  }
 uploadDeleteReports(Url,Method){
   const UploadDelteReports = new HttpRequest(Method,Url,{
    observe:"response.body",
 responseType: "text",    
   });
   return this.PSCHttp.request(UploadDelteReports).catch(this.PSCReportErrorHandler);
 }
   PScReportSendMessageAcross(value:boolean){
     this.PSCSubject.next({isDeleteable:value});
   } 
  PScReportGetMessageAcross():Observable<any>{
    return this.PSCSubject.asObservable();
  }
  PSCReportErrorHandler(Error:Response){
//    console.log(Error);
    return Observable.throw(Error);
  }
 PscErrorHandler(error) {
    const Error = error;
//    console.log(Error);
    if (Error.status === 401 && Error.statusText ==='401') {
      const SessionError: MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent, {
        width: '800px',
        height: '300px'
      });
      SessionError.componentInstance.ErrorReport = {
        ErrorMessageTitle: 'Session Expired',
        ErrorMessage: 'Your session has been expired', responseType: 'Error'
      };
      SessionError.afterClosed().subscribe(() => {
        this.PSCSessionStorage.clear();
        this.PscRoute.navigate(['Login'])
      })
    }
     else if(Error.status === 500 && Error.statusText === '500'){
       const InternalServer:MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent, {
       width:'800px',
       height:'300px'
       });
       InternalServer.componentInstance.ErrorReport = {ErrorMessageTitle:'Internal Server Error', ErrorMessage:'Server Responded with a 500 internal server error',
                                                       responseType:'error'}
     }
  }
}
