import {Component, OnInit, ViewChild, Input, Output, ElementRef, AfterViewInit, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {MatSelect} from '@angular/material';
import {FormArray, FormControl, FormGroup, NgForm, Validator, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {PscService} from '../../assets/PSCServices/psc-service';
import {Ng2DeviceService} from 'ng2-device-detector';
import { ArraySortPipe } from '../../assets/PscCustomPipes/array-sort.pipe';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit, AfterViewInit {
  ServiceBool: any = {
    InquiryByCaseNo: Boolean,
    InquiryBySrCode: Boolean,
    InquiryBySSN: Boolean,
    InquiryByFName: Boolean,
    InquiryByLName: Boolean,
    InquiryByInvoiceNumber: Boolean,
    InquiryByOpenClose: Boolean,
    InquiryByStatusCode: Boolean
  };
  InquiryCaseForm: FormGroup;
  InquiryCaseNo: any;
  InquiryFirstName: string;
  InquiryLastName: string;
  InquiryStatusCode: any;
  InquirySrCode: any;
  InquirySSN: any;
  InquiryByInvoiceNumber: any;
  InquiryCaseStatus: string;
  ItemPerPage: Number = 6;
  SrCodeMaxLength: Number;
  SrCodeMinLength: Number;
  SSNMaxLength: Number;
  SSNMinLength: Number;
  CaseNoMinLength: Number;
  CaseNoMaxLength: Number;
  InvoiceNumber: any;
  CollectionSize: Number;
  statusCodelength: Number;
  CurrentPage: Number = 1;
  InquiryBtn: Boolean = false;
  ServiceMsg: String = 'Select The Request Fields';
  Services: Array<any> = [];
  ServiceHolder: String;
  servicesSelected: Array<any> = [];
  InquirySettings: Object = {};
  MultiServices = new FormControl();
  resetValues: Object;
  StatusCodes: Array<Object> = [];
  disabled: Boolean = true;
  errorText: string = '';


  constructor(private PscInquiryHttp: PscService, private PSCDeviceDetector: Ng2DeviceService) {}
  @ViewChild('SelectedServices') element: ElementRef;
  @ViewChild('CaseNoId') CaseNoField: ElementRef;
  @ViewChild('InquiryList') InquiryForm: NgForm;
  @Output() SelectedServiceValue: EventEmitter<object> = new EventEmitter<object>();
  @Output() SelectedServiceValueNoCaseNum: EventEmitter<object> = new EventEmitter<object>(); // added
  @Output() SelectedServiceReset: EventEmitter<object> = new EventEmitter<object>();
  ngOnInit() {
    const StatusCodeUrl = 'https://dmcspatch.psc.gov/dmcswebapp/lookups/statusCodeValues';
    this.ServiceBool.InquiryByCaseNo = false;
    this.ServiceBool.InquiryBySrCode = false;
    this.ServiceBool.InquiryBySSN = false;
    this.ServiceBool.InquiryByDateRange = false;
    this.ServiceBool.InquiryService = false;
    this.ServiceBool.InquiryByTranSaction = false;
    this.ServiceBool.InquiryByStatusCode = false;
    this.ServiceBool.InquiryByOpenClose = false;
    this.ServiceBool.InquiryByFName = false;
    this.ServiceBool.InquiryByLName = false;
    this.ServiceBool.InquiryByInvoiceNumber = false;
    this.SrCodeMaxLength = 5;
    this.SrCodeMinLength = 4;
    this.SSNMaxLength = 4;
    this.SSNMinLength = 4;
    this.CaseNoMaxLength = 8;
    this.CaseNoMinLength = 8;

    this.Services = [
      {'id': 1, 'itemName': 'Get Report By Case Number'},
      {'id': 2, 'itemName': 'Get Report By First Name'},
      {'id': 3, 'itemName': 'Get Report By Last Name'},
      {'id': 4, 'itemName': 'Get Report By SSN Last 4 Digits'},
      {'id': 5, 'itemName': 'Get Report By SRCode'},
      {'id': 6, 'itemName': 'Get Report By Invoice Number'},
      {'id': 7, 'itemName': 'Get Report By Status Code'},
      {'id': 8, 'itemName': 'Get Report By Open/Close'},
    ];
    this.InquirySettings = {
      singleSelection: false,
      text: this.ServiceMsg,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class-example',
      badgeShowLimit: 2,
      searchPlaceholderText: 'Search'
    };

    // Fetching the Status Codes reference data
    this.PscInquiryHttp.getStatusCode(StatusCodeUrl).subscribe((response: HttpResponse<any>) => {
      if (response) {
        const Status = response['body'];
        for (const x in Status) {
          if(Status[x] !== null && Status[x] !== 'null' && x !== null && x !== 'null'){
          this.StatusCodes.push({statusCode: `${x}`,
                                 viewValue: `${ Status[x]}`}); 
          }
        }        
      }

    });

//    this.StatusCodes.sort((a:any, b:any) => {
//      if(a.statusCode < b.statusCode) {
//        return -1;
//      } else if(a.statusCode > b.statusCode) {
//        return 1;
//      } else {
//        return 0;
//      }
//    });
  }
  ngAfterViewInit() {}
  GetCase(InquiryList: NgForm) {
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:prefer-const
    let CasePram: {CaseNo: any, FirstName: string, LastName: string, SrCode: any, SSN: any, InvoiceNumber: any, DateRange: {StartDate: any, EndDate: any}, ServiceHeader: Array<any>, StatusCode: any, CaseStatus: string} =
      // tslint:disable-next-line:one-line
      {CaseNo: '', FirstName: '', LastName: '', SrCode: '', SSN: '', InvoiceNumber: '', DateRange: {StartDate: '', EndDate: ''}, ServiceHeader: [], StatusCode: '', CaseStatus: ''};
    // tslint:disable-next-line:one-line
    // this.IsSubmitted = true;
    if (this.InquiryCaseNo) {
      CasePram.CaseNo = this.InquiryCaseNo;
      InquiryList.controls['InquiryCaseNoInput'].reset({value: CasePram.CaseNo, disabled: true});
    }
    if (this.InquirySrCode) {
      CasePram.SrCode = this.InquirySrCode;
      InquiryList.controls['InquirySrCodeInput'].reset({value: CasePram.SrCode, disabled: true});
    }
    // tslint:disable-next-line:one-line
    if (this.InquirySSN) {
      CasePram.SSN = this.InquirySSN;
      InquiryList.controls['InquirySSNVDTN'].reset({value: CasePram.SSN, disabled: true});
    }

    if (this.InvoiceNumber) {
      CasePram.InvoiceNumber = this.InvoiceNumber;
      InquiryList.controls['InvoiceNumberInput'].reset({value: CasePram.InvoiceNumber, disabled: true});
    }

    if (this.InquiryStatusCode) {
      CasePram.StatusCode = this.InquiryStatusCode;
      InquiryList.controls['InquiryStatusCodeInput'].reset({value: CasePram.StatusCode, disabled: true});
    }

    if (this.InquiryCaseStatus) {
      CasePram.CaseStatus = this.InquiryCaseStatus;
      //           console.log(CasePram.CaseStatus);
      InquiryList.controls['InquiryCaseStatusInput'].reset({value: CasePram.CaseStatus, disabled: true});
    }

    if (this.servicesSelected) {
      CasePram.ServiceHeader = this.servicesSelected;
    }

    if (this.InquiryFirstName) {
      CasePram.FirstName = this.InquiryFirstName;
      InquiryList.controls['InquiryFirstNameInput'].reset({value: CasePram.FirstName, disabled: true});
    }

    if (this.servicesSelected) {
      CasePram.ServiceHeader = this.servicesSelected;
    }

    if (this.InquiryLastName) {
      CasePram.LastName = this.InquiryLastName;
      InquiryList.controls['InquiryLastNameInput'].reset({value: CasePram.LastName, disabled: true});
    }
    if (this.servicesSelected) {
      CasePram.ServiceHeader = this.servicesSelected;
    }
    if (this.InquiryForm.controls['InquiryCaseNoInput']) {
      this.SelectedServiceValue.emit(CasePram);
    } else {
      this.SelectedServiceValueNoCaseNum.emit(CasePram);
    }

  }
  OnReset() {
    setTimeout(() => {
      if (this.InquiryForm) {
        if (this.PSCDeviceDetector.browser === "ie" && this.PSCDeviceDetector.browser_version >= "11.0") {
          (this.InquiryForm.controls['InquiryCaseNoInput']) ?
            this.InquiryForm.controls['InquiryCaseNoInput'].enable() : console.log(' Service Not Selected');
          (this.InquiryForm.controls['InquiryFirstNameInput']) ?
            this.InquiryForm.controls['InquiryFirstNameInput'].enable() : console.log('Service Not Selected');
          (this.InquiryForm.controls['InquiryLastNameInput']) ?
            this.InquiryForm.controls['InquiryLastNameInput'].enable() : console.log('Service Not Selected');
          (this.InquiryForm.controls['InvoiceNumberInput']) ?
            this.InquiryForm.controls['InvoiceNumberInput'].enable() : console.log('Service Not Selected');
          (this.InquiryForm.controls['InquirySrCodeInput']) ?
            this.InquiryForm.controls['InquirySrCodeInput'].enable() : console.log(' Service Not Selected');
          (this.InquiryForm.controls['InquirySSNVDTN']) ?
            this.InquiryForm.controls['InquirySSNVDTN'].enable() : console.log('Service Not Selected');
          this.InquiryForm.controls['InquiryStatusCodeInput'] ? this.InquiryForm.controls['InquiryStatusCodeInput'].enable() : console.log('Service Not Selected');
          this.InquiryForm.controls['InquiryCaseStatusInput'] ? this.InquiryForm.controls['InquiryCaseStatusInput'].enable() : console.log('Service Not Selected');
        } else {
          (this.servicesSelected.includes('Get Report By Case Number')) ?
            this.InquiryForm.controls['InquiryCaseNoInput'].enable() : console.log(' Service Not Selected');
          (this.servicesSelected.includes('Get Report By SRCode')) ?
            this.InquiryForm.controls['InquirySrCodeInput'].enable() : console.log(' Service Not Selected');
          (this.servicesSelected.includes('Get Report By First Name')) ?
            this.InquiryForm.controls['InquiryFirstNameInput'].enable() : console.log(' Service Not Selected');
          (this.servicesSelected.includes('Get Report By Last Name')) ?
            this.InquiryForm.controls['InquiryLastNameInput'].enable() : console.log(' Service Not Selected');
          (this.servicesSelected.includes('Get Report By Invoice Number')) ?
            this.InquiryForm.controls['InvoiceNumberInput'].enable() : console.log('Service Not Selected');
          (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ?
            this.InquiryForm.controls['InquirySSNVDTN'].enable() : console.log('Service Not Selected');


          (this.servicesSelected.includes('Get Report By Status Code')) ? this.InquiryForm.controls['InquiryStatusCodeInput'].enable() : console.log('Service Not Selected');
          (this.servicesSelected.includes('Get Report By Open/Close')) ? this.InquiryForm.controls['InquiryCaseStatusInput'].enable() : console.log('Service Not Selected');
        }
      }
    }, 150);
    this.InquiryCaseNo = '';
    this.InquirySrCode = '';
    this.InquirySSN = '';
    this.InvoiceNumber = '';
    this.InquiryFirstName = '';
    this.InquiryLastName = '';
    this.InquiryStatusCode = '';
    this.InquiryCaseStatus = '';
    this.errorText = '';
    this.resetValues = {
      'isTable': false,
      'isTable1': false,
      'isPdf': false,
      'isExcel': false
    };

    this.SelectedServiceReset.emit(this.resetValues);
  }
  onSelectAllServices(services: any) {

  }
  onService(serviceSelected) {
    if (serviceSelected) {
      this.servicesSelected = [];
      if (serviceSelected.length > 0) {
        serviceSelected.forEach((i, k) => {
          this.servicesSelected.push(i.itemName);

        });

      } else {

        this.ServiceBool.InquiryService = false;
        this.servicesSelected.length = 0;
      }
    }

  }
  //  getListData(){
  ////    console.log('submit');
  //    let CasePrams = {firstName: 'abc'};
  //    let url = 'https://dmcspatch.psc.gov/dmcswebapp/lookups/inquiryReportCases?pageNumber=1';
  //    this.PscInquiryHttp.getFName(CasePrams, url).subscribe((response) => {
  ////      console.log(response,'res got!!')
  //    });
  //    
  //  }
  GetSelectedForm() {
    this.OnReset();
    //      console.log();
    if (this.servicesSelected) {
      if (this.servicesSelected.length > 0) {
        this.servicesSelected.forEach((i, k) => {
          this.ServiceBool.InquiryService = true;
          if (this.PSCDeviceDetector.browser === "ie" && this.PSCDeviceDetector.browser_version >= "11.0") {
            switch (i) {
              case 'Get Report By Case Number':
                this.ServiceBool.InquiryByCaseNo = true;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By DateRange') > -1) ? this.ServiceBool.InquiryByDateRange = true
                  : this.ServiceBool.InquiryByDateRange = false;
                // tslint:disable-next-line:no-unused-expression
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By First Name':
                this.ServiceBool.InquiryByFName = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By DateRange') > -1) ? this.ServiceBool.InquiryByDateRange = true
                  : this.ServiceBool.InquiryByDateRange = false;
                // tslint:disable-next-line:no-unused-expression         
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.indexOf('Get Report By Invoice Number') > -1) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By Last Name':
                this.ServiceBool.InquiryByLName = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Invoice Number') > -1) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;

                break;
              case 'Get Report By SRCode':
                this.ServiceBool.InquiryBySrCode = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By DateRange') > -1) ? this.ServiceBool.InquiryByDateRange = true
                  : this.ServiceBool.InquiryByDateRange = false;
                // tslint:disable-next-line:no-unused-expression
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Invoice Number') > -1) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By SSN Last 4 Digits':
                this.ServiceBool.InquiryBySSN = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.indexOf('Get Report By Invoice Number') > -1) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By Invoice Number':
                this.ServiceBool.InquiryByInvoiceNumber = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;

                break;
              case 'Get Report By Status Code':
                this.ServiceBool.InquiryByStatusCode = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.indexOf('Get Report By Invoice Number') > -1) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By Open/Close') > -1) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By Open/Close':
                this.ServiceBool.InquiryByOpenClose = true;
                (this.servicesSelected.indexOf('Get Report By Case Number') > -1) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.indexOf('Get Report By SRCode') > -1) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.indexOf('Get Report By First Name') > -1) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.indexOf('Get Report By Last Name') > -1) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.indexOf('Get Report By Invoice Number') > -1) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.indexOf('Get Report By SSN Last 4 Digits') > -1) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.indexOf('Get Report By Status Code') > -1) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                break;

              default:
                this.ServiceBool.InquiryByCaseNo = false;
                this.ServiceBool.InquiryBySrCode = false;
                this.ServiceBool.InquiryBySSN = false;
                this.ServiceBool.InquiryByFName = false;
                this.ServiceBool.InquiryByLName = false;
                this.ServiceBool.InquiryByInvoiceNumber = false;
                this.ServiceBool.InquiryByStatusCode = false;
                this.ServiceBool.InquiryByOpenClose = false;
                break;
            }

          } else {
            switch (i) {
              case 'Get Report By Case Number':
                this.ServiceBool.InquiryByCaseNo = true;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By DateRange')) ? this.ServiceBool.InquiryByDateRange = true
                  : this.ServiceBool.InquiryByDateRange = false;
                // tslint:disable-next-line:no-unused-expression
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By First Name':
                this.ServiceBool.InquiryByFName = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By DateRange')) ? this.ServiceBool.InquiryByDateRange = true
                  : this.ServiceBool.InquiryByDateRange = false;
                // tslint:disable-next-line:no-unused-expression         
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By Last Name':
                this.ServiceBool.InquiryByLName = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;

                break;
              case 'Get Report By SRCode':
                this.ServiceBool.InquiryBySrCode = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By DateRange')) ? this.ServiceBool.InquiryByDateRange = true
                  : this.ServiceBool.InquiryByDateRange = false;
                // tslint:disable-next-line:no-unused-expression
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By SSN Last 4 Digits':
                this.ServiceBool.InquiryBySSN = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By Invoice Number':
                this.ServiceBool.InquiryByInvoiceNumber = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;

                break;
              case 'Get Report By Status Code':
                this.ServiceBool.InquiryByStatusCode = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By Open/Close')) ? this.ServiceBool.InquiryByOpenClose = true : this.ServiceBool.InquiryByOpenClose = false;
                break;
              case 'Get Report By Open/Close':
                this.ServiceBool.InquiryByOpenClose = true;
                (this.servicesSelected.includes('Get Report By Case Number')) ? this.ServiceBool.InquiryByCaseNo = true
                  : this.ServiceBool.InquiryByCaseNo = false;
                (this.servicesSelected.includes('Get Report By SRCode')) ? this.ServiceBool.InquiryBySrCode = true
                  : this.ServiceBool.InquiryBySrCode = false;
                (this.servicesSelected.includes('Get Report By First Name')) ? this.ServiceBool.InquiryByFName = true
                  : this.ServiceBool.InquiryByFName = false;
                (this.servicesSelected.includes('Get Report By Last Name')) ? this.ServiceBool.InquiryByLName = true
                  : this.ServiceBool.InquiryByLName = false;
                (this.servicesSelected.includes('Get Report By Invoice Number')) ? this.ServiceBool.InquiryByInvoiceNumber = true
                  : this.ServiceBool.InquiryByInvoiceNumber = false;
                (this.servicesSelected.includes('Get Report By SSN Last 4 Digits')) ? this.ServiceBool.InquiryBySSN = true
                  : this.ServiceBool.InquiryBySSN = false;
                (this.servicesSelected.includes('Get Report By Status Code')) ? this.ServiceBool.InquiryByStatusCode = true : this.ServiceBool.InquiryByStatusCode = false;
                break;

              default:
                this.ServiceBool.InquiryByCaseNo = false;
                this.ServiceBool.InquiryBySrCode = false;
                this.ServiceBool.InquiryBySSN = false;
                this.ServiceBool.InquiryByFName = false;
                this.ServiceBool.InquiryByLName = false;
                this.ServiceBool.InquiryByInvoiceNumber = false;
                this.ServiceBool.InquiryByStatusCode = false;
                this.ServiceBool.InquiryByOpenClose = false;
                break;
            }
          }
        });
      } else {
        this.ServiceBool.InquiryByCaseNo = false;
        this.ServiceBool.InquiryBySrCode = false;
        this.ServiceBool.InquiryBySSN = false;
        this.ServiceBool.InquiryByFName = false;
        this.ServiceBool.InquiryByLName = false;
        this.ServiceBool.InquiryByInvoiceNumber = false;
        this.ServiceBool.InquiryByStatusCode = false;
        this.ServiceBool.InquiryByOpenClose = false;
      }
    }
    
   
    if (this.ServiceBool.InquiryByOpenClose == true) {
    
      if (this.ServiceBool.InquiryByCaseNo == false && this.ServiceBool.InquiryByFName == false &&
        this.ServiceBool.InquiryByLName == false && this.ServiceBool.InquiryBySSN == false &&
          this.ServiceBool.InquiryBySrCode == false && this.ServiceBool.InquiryByInvoiceNumber == false &&
             this.ServiceBool.InquiryByStatusCode == false) {

                this.errorText = 'Please Select one more option from above fields';
                this.setServiceBoolToFalse();
      }
    }
      
  }
  //    }   
   
   setServiceBoolToFalse() {
    this.ServiceBool.InquiryByCaseNo = false;
    this.ServiceBool.InquiryBySrCode = false;
    this.ServiceBool.InquiryBySSN = false;
    this.ServiceBool.InquiryByFName = false;
    this.ServiceBool.InquiryByLName = false;
    this.ServiceBool.InquiryByInvoiceNumber = false;
    this.ServiceBool.InquiryByStatusCode = false;
    this.ServiceBool.InquiryByOpenClose = false;
    this.ServiceBool.InquiryService = false;
  }
}
