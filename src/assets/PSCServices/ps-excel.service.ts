import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders} from '@angular/common/http';
import {ResponseContentType} from '@angular/http';
import * as PSCFileSaver from 'file-saver';
import {PSCReportService} from '../PSCServices/psc-reports-service';
import { HttpParams } from "@angular/common/http";
const  PSCExcel_Extension ='.xls';
@Injectable()
export class PsExcelService {

  constructor(private PSCHttp: HttpClient, private PSCReport: PSCReportService) { }
  
     onGetCaseHistoryExcel(Url, FileName){
  const GetReportPdfRequest = new HttpRequest('GET', Url,{
//    observe:'response',
//    content:'application/x-www-form-urlencoded',
   content:'application/octet-stream',
    responseType:"arraybuffer"
  });
    this.PSCHttp.request(GetReportPdfRequest).catch(this.PSCReport.PSCReportErrorHandler).subscribe((response:HttpResponse<any>)=>{
      const ResponseBody= response['body'];
      if(ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== ""){
//    console.log(response['body']);
        const FileType ="";
       const Buffer = ResponseBody;
//        console.log(Buffer);
//        this.saveAsBlob(Buffer);
      this.PSCFileSaver(Buffer, FileName, FileType);
      }else{

      }
    },(error)=>this.PSCReport.PscErrorHandler(error));
  }  
   public PSCFileSaver(buffer:any, fileName: String,fileType:string):void{
     const PSCData:  Blob = new Blob([buffer], {
       type:''
     });
     if(fileName.length > 0){      
             PSCFileSaver.saveAs(PSCData, fileName + PSCExcel_Extension);            
       }        
      
 } 
   

  onGetInquiryCaseExcel(url,filename){
    const GetInqyuiryExcelRequest = new HttpRequest('GET', url,{
    responseType:"arraybuffer"
  });
    this.PSCHttp.request(GetInqyuiryExcelRequest).catch(this.PSCReport.PSCReportErrorHandler).subscribe((response:HttpResponse<any>)=>{
      const ResponseBody= response['body'];
      if(ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== ""){
//    console.log(response['body']);
        const FileType ="";
       const Buffer = ResponseBody;
//        console.log(Buffer);
//        this.saveAsBlob(Buffer);
      this.PSCFileSaver(Buffer, filename, FileType);
      }else{

      }
    },(error)=>this.PSCReport.PscErrorHandler(error));
  }  
    
  
  
  onGetDetailedInquiry(url, CaseParams: {FirstName: any, LastName: any, SrCode: any, SSN: any, StatusCode: any, InvoiceNumber: any, CaseStatus: string}, Filename){
  const Prams = CaseParams;
  const GetDetailedInqyuiryExcelRequest = new HttpRequest('GET', url,{
        params: new HttpParams().set('firstName', Prams.FirstName || '').append('lastName', Prams.LastName || '')
          .append('srCode', Prams.SrCode || '').append('ssn', Prams.SSN || '').append('statusCode', Prams.StatusCode || '').append('invoice', Prams.InvoiceNumber || '').append('caseStatus', Prams.CaseStatus || ''),
        observe: 'response.body',
        content: 'application/json',
        responseType:"arraybuffer"
      });
    this.PSCHttp.request(GetDetailedInqyuiryExcelRequest).catch(this.PSCReport.PSCReportErrorHandler).subscribe((response:HttpResponse<any>)=>{
      const ResponseBody= response['body'];
      if(ResponseBody !== null && ResponseBody !== undefined && ResponseBody !== ""){
//    console.log(response['body']);
        const FileType ="";
       const Buffer = ResponseBody;
//        console.log(Buffer);
//        this.saveAsBlob(Buffer);
      this.PSCFileSaver(Buffer, Filename, FileType);
      }else{

      }
    },(error)=>this.PSCReport.PscErrorHandler(error));
  }  
    
}
