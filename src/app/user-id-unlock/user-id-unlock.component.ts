import { PsExcelService } from "../../assets/PSCServices/ps-excel.service";
import { Component, OnInit, ViewChild, Input, Output, ElementRef, AfterViewInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import {MatSelect, MatDatepickerInputEvent} from '@angular/material';
import { FormArray, FormControl, FormGroup, NgForm, Validator, Validators } from '@angular/forms';
import { HttpResponse} from '@angular/common/http';
import { PscService } from '../../assets/PSCServices/psc-service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-id-unlock',
  templateUrl: './user-id-unlock.component.html',
  styleUrls: ['./user-id-unlock.component.css']
})
export class UserIdUnlockComponent implements OnInit {
  [x: string]: any;
  public InquiryCaseForm: FormGroup;
  public DatePickerGroup: FormGroup;
  public FiscalEnddate: any;
  public FiscalEndDateBindValue: String;
   public ServiceHolder: String;
   public InquirySettings: Object = {};
   public resetValues: Object;
   public FiscalYears: Array<Object> = [];
   public FiscalMonths: Array<Object> = [];
   public DateRangeFiscalYear: any;
   public  disabled: Boolean = true;
   public FiscalStartdateValidation;
   public reportType: String = "yearMonth";
   public disableDatePicker: boolean;
   public disableYearAndMonth: boolean;
   private DateRangeFiscalMonth: any;
   public formDisable: boolean;
   public minDate: Date =  new Date();

    @ViewChild('SelectedServices') element: ElementRef ;
    @Output() SelectedServiceValue: EventEmitter<object> = new EventEmitter<object>();
    @Output() SelectedServiceReset: EventEmitter<object> = new EventEmitter<object>();
      constructor(public PscHttp: PscService ) {
        this.environment = environment;
      }
    ngOnInit() {
      this.FiscalYears = ['2018', '2017', '2016'];
      // tslint:disable-next-line:max-line-length
      this.FiscalMonths = ['January', 'February', 'March',
                           'April', 'May', 'June', 'July',
                           'August', 'September', 'October',
                           'November', 'December'];
      //this.FiscalStartdateValidation = new FormControl( [Validators.required]);
      //this.FiscalEndDateValidation = new FormControl( [Validators.required]);
      this.InquiryCaseForm = new FormGroup({
        InquiryCaseFormGroup: new FormGroup({
          InquiryDateRangeByYear : new FormControl({value: '', disabled: false},
                                                [ Validators.required]),
            InquiryDateRangeByMonth: new FormControl({value: '', disabled: false},
                                                      [ Validators.required])
            
          }),
          DatePickerGroup : new FormGroup({
            FiscalStartDateValidation: new FormControl({value:null, disabled: true}, [ Validators.required]),
            FiscalEndDateValidation: new FormControl({value:null, disabled: true}, [ Validators.required])
          })
        
      });

      this.formDisable = true;
      
    //   this.InquiryCaseForm.controls.InquiryCaseFormGroup.valueChanges.subscribe(() => {
    //   //   this.InquiryDateRangeByYear.valueChanges.forEach(value => {
    //   //     if(value) {
    //   //       this.InquiryCaseForm['controls'].InquiryCaseFormGroup['controls'].InquiryDateRangeByMonth.enable();
    //   //     } else{
    //   //       this.InquiryCaseForm['controls'].InquiryCaseFormGroup['controls'].InquiryDateRangeByMonth.disable();
    //   //     }
    //   //   });
        
    //   //     this.InquiryCaseForm['controls'].InquiryCaseFormGroup['controls'].InquiryDateRangeByMonth.disable();
          
    //   //     this.InquiryCaseForm.controls.InquiryCaseFormGroup.patchValue({
    //   //       emitEvent : false
    //   //     })
       
    //   //     this.InquiryCaseForm['controls'].InquiryCaseFormGroup['controls'].InquiryDateRangeByMonth.enable();
        
    //   //  return;
    //   if(this.reportType == "yearMonth"){
    //     if( this.InquiryCaseForm['controls'].InquiryCaseFormGroup['controls'].InquiryDateRangeByYear.valid &&  this.InquiryCaseForm['controls'].InquiryCaseFormGroup['controls'].InquiryDateRangeByMonth.valid){
    //       this.formDisable = false;
    //     }else{
    //       this.formDisable = true;
    //     }
    //   }else{
    //     if(this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalStartDateValidation.valid && this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalEndDateValidation.valid){
    //       this.formDisable = false;
    //     }else{
    //       this.formDisable = true;
    //     }
    //   }
    //  });

    //  this.InquiryCaseForm.controls.DatePickerGroup.valueChanges.subscribe(() => {
    //    console.log(this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalEndDateValidation.valid);
    //    console.log(this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalEndDateValidation.value);
    //    console.log(this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalStartDateValidation.valid);
    //   if(this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalStartDateValidation.valid && this.InquiryCaseForm['controls'].DatePickerGroup['controls'].FiscalEndDateValidation.valid){
    //     this.formDisable = false;
    //   }else{
    //     this.formDisable = true;
    //   }
    //  })
      
     
    }

    GetCase() {
      let  CasePram: { DateRange: {StartDate: any, EndDate: any}} =
              // tslint:disable-next-line:one-line
              { DateRange: {StartDate: '', EndDate: ''}};
           // tslint:disable-next-line:one-line
    }

    updateToDate(event){
      console.log(event, this.minDate);
      //this.minDate = event;
      this.minDate = new Date(event.getFullYear(), event.getMonth(), event.getDate() + 1);
    }
    
      Reset() {
   
        if(this.DateRangeFiscalYear){
          this.InquiryCaseForm.get('InquiryCaseFormGroup.InquiryDateRangeByYear').enable();
        }
      this.FiscalStartdateValidation = new FormControl( [Validators.required]);
      this.FiscalEndDateValidation = new FormControl( [Validators.required]);
      this.InquiryCaseForm.reset();
      this.SelectedServiceReset.emit(this.resetValues);
      
      }
    
      OnFiscalYear($event) {
        console.log($event);
       if ($event) {
         if ($event.length > 0) {
        this.disabled = false;
         } else {
           this.disabled = true;
         }
       }
      }
  
    OnDownloadExcel() {
      
      let UrlProp = 'http://localhost:8080/assets/Debt Collection Center Performance Matrix as of 12-31-2017.xlsx';
      if(this.reportType === "datePicker"){
          let fromDate = this.convertDate(this.InquiryCaseForm.controls.DatePickerGroup['controls'].FiscalStartDateValidation.value);
          let toDate = this.convertDate(this.InquiryCaseForm.controls.DatePickerGroup['controls'].FiscalEndDateValidation.value);
          UrlProp = `http://localhost:8080/abcd/${fromDate}/${toDate}`;
      }else if(this.reportType === "yearMonth"){
        //service with year and 
          let monthNum: any;
          monthNum = this.monthNameToNum(this.InquiryCaseForm.controls.InquiryCaseFormGroup['controls'].InquiryDateRangeByMonth.value);
          monthNum = monthNum+"";
          if(monthNum.length == 1){
            monthNum = "0"+ monthNum;
          }
          let dateFormat = `${monthNum}-01-${this.InquiryCaseForm.controls.InquiryCaseFormGroup['controls'].InquiryDateRangeByYear.value}`;
          //let month = this.InquiryCaseForm.controls.InquiryCaseFormGroup.get('InquiryDateRangeByMonth').value[0].text;
          UrlProp = `http://localhost:8080/abcd/${dateFormat}`;
      }

     this.PscHttp.getexcel(UrlProp).subscribe((response: HttpResponse<any>) => {
        //console.log(response);
        if (response.body)
          this.data = response.body;
        console.log(response);
        
        }, (error) => {
         
          this.PscHttp.PscErrorHandler(error);
        });
    }

    convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      let d = new Date(inputFormat);
      return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join("");
    }

    monthNameToNum(monthName){
      let months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
        ];

     let month = months.indexOf(monthName);
     if(month == 0){
      return 1;
     }else{
      return month ? month + 1 : 0;
     }
     
    }

    getReportType(type){
      this.reportType = type;
      if(this.reportType == "yearMonth"){
        // this.disableDatePicker = true;
        // this.disableYearAndMonth = false;
        this.InquiryCaseForm['controls'].InquiryCaseFormGroup.enable();
        this.InquiryCaseForm['controls'].DatePickerGroup.disable();
      }else{
        // this.disableDatePicker = false;
        // this.disableYearAndMonth = true;
        this.InquiryCaseForm['controls'].InquiryCaseFormGroup.disable();
        this.InquiryCaseForm['controls'].DatePickerGroup.enable();
      }
       
    }
}
