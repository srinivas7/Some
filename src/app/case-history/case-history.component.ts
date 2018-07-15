import {Component, OnInit, ViewChild, Input, Output, ElementRef, AfterViewInit, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {MatSelect} from '@angular/material';
import {FormArray, FormControl, FormGroup, NgForm, Validator, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {PscService} from '../../assets/PSCServices/psc-service';
import {PSC} from '../../assets/PSCNameSpace/PSCNameSpace';
import {Ng2DeviceService} from 'ng2-device-detector';
import * as _ from "lodash";

@Component({
  selector: 'app-case-history',
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.css']
})
export class CaseHistoryComponent implements OnInit {
//  [x: string]: any;

   ServiceBool: any = {
    CaseHistoryCaseNo: Boolean,
    InquiryService: Boolean,
  };
   InquiryCaseForm: FormGroup;
//  isTable: Boolean = false;
   CaseHistoryCaseNo: any;
   ItemPerPage: Number = 6;
   CaseNoLength: Number;
   IsSubmitted: Boolean = true;
   CurrentPage: Number = 1;
   InquiryBtn: Boolean = false;
   Services: Array<any> = [];
   ServiceHolder: String;
   isRequested:Boolean;
   servicesSelected: Array<any> = [];
   InquirySettings: Object = {};
//   MultiServices = new FormControl();
   resetValues: Object;
//   StatusCodes: Array<Object> = [];
   disabled: Boolean = true;


  @ViewChild('some') someElement : ElementRef;
  @ViewChild('SelectedServices') element: ElementRef;
  @ViewChild('CaseNoId') CaseNoField: ElementRef;
  @ViewChild('InquiryList') InquiryForm: NgForm;
  @Output() eventName = new EventEmitter();
  @Output() SelectedServiceValue: EventEmitter<object> = new EventEmitter<object>();
  @Output() SelectedServiceReset: EventEmitter<object> = new EventEmitter<object>();
  @Output() NoCase: EventEmitter<object> = new EventEmitter<object>();
  @Input() caseHistory;

  constructor(private PscInquiryHttp: PscService, private PSCDeviceDetector: Ng2DeviceService) {}
  ngOnInit() {
//    console.log(this.PSCDeviceDetector.browser_version);
    this.ServiceBool.CaseHistoryCaseNo = true;
    this.ServiceBool.InquiryService = true;;
    this.CaseNoLength = 8;
    this.isRequested = false;

    this.Services = [
      {'id': 1, 'itemName': 'Get Report By Case Number'},
    ];
  }
  
  ngAfterViewInit() {}
  
  GetCase(InquiryList: NgForm) {
    this.isRequested = true; 
 let CasePram: {CaseNo: any,  } =
      {CaseNo: ''};
    
    if (this.CaseHistoryCaseNo) {
      CasePram.CaseNo = this.CaseHistoryCaseNo;
      InquiryList.controls['CaseHistoryCaseNoInput'].reset({value: CasePram.CaseNo, disabled: true});
    }
    if (this.InquiryForm.controls['CaseHistoryCaseNoInput']) {
      this.SelectedServiceValue.emit(CasePram);
    } else {
      this.NoCase.emit(CasePram);
    }
  }
  
  OnReset() {
    setTimeout(() => {
      if (this.InquiryForm) {       
          (this.InquiryForm.controls['CaseHistoryCaseNoInput']) ?
            this.InquiryForm.controls['CaseHistoryCaseNoInput'].enable() : console.log(' Service Not Selected');         
     
//          (this.servicesSelected.includes('Get Report By Case Number')) ?
//            this.InquiryForm.controls['CaseHistoryCaseNoInput'].enable() : console.log(' Service Selected');
        
      }
    }, 150);
    this.CaseHistoryCaseNo = '';
    this.resetValues = {
      'isTable': false,
      'isTable1': false,
      'isPdf': false
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
}



