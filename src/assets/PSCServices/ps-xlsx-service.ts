import { Injectable } from '@angular/core';
import * as PSCFileSaver from 'file-saver';
import * as PSCXLSX from 'xlsx';
 //Creating public file extension notations
 const  PSCExcel_Type ='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
 const  PSCExcel_Extension ='.xlsx';
@Injectable()
export class PsXlsxService {
 constructor(){}
 public PSCExcelExporter(PSCInquiryJson: any[], excelfileName: String):void{  
  const PSCWorkSheet:PSCXLSX.WorkSheet = PSCXLSX.utils.json_to_sheet(PSCInquiryJson);
  const PSCWorkBook:PSCXLSX.WorkBook = { Sheets:{ 'data': PSCWorkSheet}, SheetNames:['data']};
  const PSCExcelBuffer:any = PSCXLSX.write(PSCWorkBook, { bookType:'xlsx', type:'buffer'});
 this.PSCFileSaver(PSCExcelBuffer, excelfileName);
 }
 public PSCFileSaver(buffer:any, fileName: String):void{
     const PSCData:  Blob = new Blob([buffer], {
       type:'EXCEL_TYPE'
     });
     PSCFileSaver.saveAs(PSCData, fileName +' '+ '_export_'+ new Date().getTime()+ PSCExcel_Extension);
 }
}
