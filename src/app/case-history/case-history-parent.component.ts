import {Component, OnInit, ViewChild, Input, Output, ElementRef, AfterViewInit, ChangeDetectionStrategy, Renderer2} from '@angular/core';
import {MatOption} from '@angular/material';
import {FormGroup, FormArray, FormControl, Validators, NgForm} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {PscService} from '../../assets/PSCServices/psc-service';
import {PscCurrenyCustomPipePipe} from '../../assets/PscCustomPipes/psc-curreny-custom-pipe.pipe';
import {ScrollToService, ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import {$} from 'protractor';
const jsPDF = require('jspdf');
require('jspdf-autotable');
import {PsXlsxService} from '../../assets/PSCServices/ps-xlsx-service';
import {PscPrintService} from '../../assets/PSCServices/psc-print-service';
import {Ng2DeviceService} from 'ng2-device-detector';
import {PsExcelService} from '../../assets/PSCServices/ps-excel.service';
import {PSCReportService} from '../../assets/PSCServices/psc-reports-service';
@Component({
  selector: 'app-case-history-parent',
  templateUrl: './case-history-parent.component.html',
  styleUrls: ['./case-history-parent.component.css']
})
export class CaseHistoryParentComponent implements OnInit {

  CaseHistoryCaseArray: Array<any> = [];
  isTable: Boolean = false;
  isInput: Boolean = false;
  isTable1: Boolean = false;
  isPdf: Boolean = false;
  isPrint: Boolean = false;
  isRequested: Boolean;
  p: any = 1;
  TotalCount:number;
  ELEMENT_DATA: Element[] = [];
  CaseHistoryHeaderObj = {
    CaseNo: 'Get Report By Case Number'
  };
  CaseHistoryHeader: String = 'CaseHistory By';
  CaseHistoryCaseObject: {
    tranCode: any, postDate: any, schedule: any,
    itemNo: any, sixmonType: any, principal: any,
    interest: any, other: any, total: any
  };
  totalBalance: Number;
  paginateValue: Number = 6;
  CurrentPage: Number = 1;
  CaseHistoryCaseNumber: any;
  CaseHistoryfirstName: string;
  CaseHistorylastName: String;
  CaseHistorySrCode: any;
  CaseHistorySSN: any;
  CaseHistoryStatus: any;  
  CaseHistoryFormSettings: any;
  displayedColumns = ['TranCode', 'PostDate', 'Schedule', 'ItemNo', 'SixmonType',
    'Principal', 'Interest', 'Other', 'Total'];
  viewList: any;
  pageNumber: number;
  some:any;
  @ViewChild('CasehistoryTable') element: ElementRef;
  @ViewChild('CasehistoryTableParent') elementParent: ElementRef;
  constructor(private PscHttp: PscService, private CustomCurrency: PscCurrenyCustomPipePipe,
    private CaseHistoryExcel: PsXlsxService, private CaseHistoryPrint: PscPrintService,
    private PSCCaseRender: Renderer2, private PSCScroll: ScrollToService,
    private PSCDeviceDetector: Ng2DeviceService, private PSCExcelService:PsExcelService) {
  }
  ngOnInit() {
    this.isRequested = false;
    this.pageNumber = 1;    
  }
  
  OnGetCaseChange($event) {
    this.isRequested = true;    
    let CasePrams: {CaseNo: any, FirstName: string, LastName: string, SrCode: any, SSN: any, StatusCode: any, DateRange: any, InvoiceNumber: any, } =
      {CaseNo: '', FirstName: '', LastName: '', SrCode: '', SSN: '', StatusCode: '', DateRange: '', InvoiceNumber: '', };
    this.CaseHistoryHeader = 'CaseHistory By Case Number';
    const url = 'https://dmcspatch.psc.gov/dmcswebapp/caseHistoryReport/caseHistory' + '?pageNumber='+this.pageNumber;
    const UrlProp = 'https://dmcspatch.psc.gov/dmcswebapp/caseHistoryReport/balance';
    const TotalCountUrl = 'https://dmcspatch.psc.gov/dmcswebapp/caseHistoryReport/caseHistoryCount';
    if ($event.CaseNo || $event.caseNo) {
      CasePrams.CaseNo = $event.CaseNo || $event.caseNo;
      this.CaseHistoryCaseNumber = $event.CaseNo || $event.caseNo;
    }
    if ($event.ServiceHeader) {
      $event.ServiceHeader.forEach((i, k) => {
        switch (i) {
          case this.CaseHistoryHeaderObj.CaseNo:
            this.CaseHistoryHeader = this.CaseHistoryHeader + ' ' + 'Case Number';
            break;
        }
      })
    }
    setTimeout(() => {
//      this.CaseParams = CasePrams;
      this.PscHttp.getCaseHistoryCaseNo(CasePrams, url).subscribe((response) => {
        this.isTable1 = true;
        if (response) {
          this.isTable1 = false;
          const CaseArray = response['body'];
          this.some = [1,2,3];
          if (CaseArray !== undefined && (CaseArray == null || CaseArray === '')) {
            this.isTable = true;
          }
          if (CaseArray !== undefined && CaseArray !== null) {
            this.isRequested = false;
            CaseArray.forEach((i, k) => {
              this.CaseHistoryCaseArray.push({
                tranCode: i.tranCode, postDate: i.postDate, schedule: i.schedule,
                itemNo: i.itemNo, sixmonType: i.sixmonType,
                principal: (i.principal === null || i.principal === "null") ? 0 : i.principal,
                interest: (i.interest === null || i.interest === "null") ? 0 : i.interest,
                other: (i.other === null || i.other === "null") ? 0 : i.other, total: i.total,
              });
              this.CaseHistoryfirstName = i.firstName;
              this.CaseHistorylastName = i.lastName;
              this.CaseHistorySSN = i.ssn;
              this.CaseHistoryStatus = i.status;
            });
            if (this.CaseHistoryCaseArray.length > 0) {
              this.onPSCScroll();
              this.isTable = false;
             
            }
            else {
              this.isTable = true;
            }
          }
        }

      }, (error)=>this.PscHttp.PscErrorHandler(error));
    }, 1500);
    this.PscHttp.getTotalBalance(CasePrams, UrlProp).subscribe((Balanceresponse: HttpResponse<any>) => {
      if (Balanceresponse) {
        const CaseBalance = Balanceresponse['body'];
        if (CaseBalance) {
          this.totalBalance = CaseBalance.balance;
        }
      }
    });
    
    // Total count 
    this.PscHttp.getTotalBalance(CasePrams, TotalCountUrl).subscribe((count: HttpResponse<any>) => {
            if(count !== null &&  count !== undefined){
              const countValue = count['body'];              
              if(countValue){
             this.TotalCount =countValue.count;
              }
            }
    });

  }
  OnGetReset($event) {
    this.CaseHistoryHeader = '';
    this.isTable = $event.isTable;
    this.isTable1 = $event.isTable1;
    this.isPdf = $event.isPdf;
    this.isPrint = false;
    this.CaseHistoryCaseArray.length = 0;
    this.p = 1;
    this.paginateValue = 6;
    this.pageNumber = 1;
    this.TotalCount = 0;
    //    this.viewList.length = 0;
  }
  PaginationController(p, PaginateValue, TotalItems,){
    var TotalPage = TotalItems / PaginateValue; 
    var TotalPageCount = Math.ceil(TotalPage);
//    console.log(TotalPageCount);
    if(p === TotalPageCount && TotalItems < this.TotalCount){
      this.pageNumber = this.pageNumber + 1;
       const Url = "https://dmcspatch.psc.gov/dmcswebapp/caseHistoryReport/caseHistory?pageNumber="+ this.pageNumber;
      let CasePrams: {CaseNo: any, FirstName: string, LastName: string, SrCode: any, SSN: any, StatusCode: any, DateRange: any, InvoiceNumber: any, } =
      {CaseNo: '', FirstName: '', LastName: '', SrCode: '', SSN: '', StatusCode: '', DateRange: '', InvoiceNumber: '', };      
      CasePrams.CaseNo = this.CaseHistoryCaseNumber;
      setTimeout(() => {
      this.PscHttp.getCaseHistoryCaseNo(CasePrams, Url).subscribe((response) => {
        this.isTable1 = true;
        if (response) {
          this.isTable1 = false;
          const CaseArray = response['body'];
          if (CaseArray !== undefined && (CaseArray == null || CaseArray === '')) {
            this.isTable = true;
          }
          if (CaseArray !== undefined && CaseArray !== null) {
            this.isRequested = false;
            CaseArray.forEach((i, k) => {
              this.CaseHistoryCaseArray.push({
                tranCode: i.tranCode, postDate: i.postDate, schedule: i.schedule,
                itemNo: i.itemNo, sixmonType: i.sixmonType,
                principal: (i.principal === null || i.principal === "null") ? 0 : i.principal,
                interest: (i.interest === null || i.interest === "null") ? 0 : i.interest,
                other: (i.other === null || i.other === "null") ? 0 : i.other, total: i.total,
              });
              this.CaseHistoryfirstName = i.firstName;
              this.CaseHistorylastName = i.lastName;
              this.CaseHistorySSN = i.ssn;
              this.CaseHistoryStatus = i.status;
            });
            if (this.CaseHistoryCaseArray.length > 0) {
              this.onPSCScroll();
              this.isTable = false;
            }
            else {
              this.isTable = true;
            }
          }
        }

      }, (error)=>this.PscHttp.PscErrorHandler(error));
    }, 1500);
    }
  }
  onPSCScroll() {
    setTimeout(() => {
      if (this.PSCDeviceDetector.browser === 'ie' && this.PSCDeviceDetector.browser_version >= '11.0') {
        window.scrollBy(0, 375);
      } else {
        const config: ScrollToConfigOptions = {
          target: 'CasehistoryTableParent'
        }
        this.PSCScroll.scrollTo(config);
      }
    }, 1600);
  }
  OnPdfDownload() {
    this.isPdf = true;
    const Pdfrows = [];
    const timeStamp = new Date();
    this.CaseHistoryCaseArray.forEach((i, k) => {
      const FormatedInterestVal = this.CustomCurrency.transform(i.interest, '$');
      const FormatedTotalVal = this.CustomCurrency.transform(i.total, '$');
      //        console.log();
      Pdfrows.push([
        `${i.tranCode}`, `${i.postDate}`, `${i.schedule}`,
        `${i.itemNo}`, `${i.sixmonType}`, `${i.principal}`,
        `${i.interest}`, `${i.other}`, `${i.total}`]);
    });
    const doc = new jsPDF('p', 'pt');
    let Pdfcolumns = this.displayedColumns;
    let PscHeaderRow = (cell, Data) => {

    }
    // Adding headers and footers.
    let PscTableContent = (data) => {
      const Base64Img = "data:image/png;base64,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";
      doc.setFontSize(15);
      doc.setTextColor(40);
      doc.setFontStyle('normal');

      if (Base64Img) {
        doc.addImage(Base64Img, 'JPEG', data.settings.margin.left, 15, 60, 30, 40);
      }
      doc.text(`${this.CaseHistoryHeader}`, data.settings.margin.left + 185, 35);
      doc.setFontSize(9);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text(`First Name: ${this.CaseHistoryfirstName}`, data.settings.margin.left + 8, 85);
      doc.text(`Last Name: ${this.CaseHistorylastName}`, data.settings.margin.left + 200, 85);
      doc.text(`SSN: ${this.CaseHistorySSN}`, data.settings.margin.left + 8, 95);
      doc.text(`Status: ${this.CaseHistoryStatus}`, data.settings.margin.left + 200, 95);
      doc.text(`Balance: ${'$' + this.totalBalance}`, data.settings.margin.left + 410, 85);
      doc.text(`Case Number: ${this.CaseHistoryCaseNumber}`, data.settings.margin.left + 410, 95);
      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text(`Transaction History`, data.settings.margin.left + 200, 68);
      doc.setFontSize(8);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text(`${timeStamp.getMonth() + 1}/${timeStamp.getDate()}/${timeStamp.getFullYear()}`,
        data.settings.margin.left + 440, 12);


    }
    doc.autoTable(Pdfcolumns, Pdfrows, {
      theme: 'striped',
      styles: {
        fontStyle: 'normal',
        halign: 'center'
      },
      columnStyles: {
        TranCode: {columnWidth: 10}
      },
      margin: {top: 105},
      tableWidth: '100%',
      startY: false,
      addPageContent: PscTableContent
    });
    doc.save("CaseHistoryReport.pdf");
  }

  Onprint(): void {
    this.isPdf = true;
    this.p = 1;
    this.paginateValue = this.CaseHistoryCaseArray.length;
    this.isPrint = true;
    this.CaseHistoryPrint.getPSCPrint(this.element.nativeElement,500, 1000, 3000);

  }
  OnExcelDownload() {
    const ExcelUrl = 'https://dmcspatch.psc.gov/dmcswebapp/caseHistoryReport/downloadCaseHistoryExcel?caseNumber='+ this.CaseHistoryCaseNumber;
   this.PSCExcelService.onGetCaseHistoryExcel(ExcelUrl, 'CaseHistory');
  }


}