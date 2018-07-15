import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material'
import { FileUploader } from 'ng2-file-upload';
import {Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router'
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage'
import {PSCReportService} from '../../../assets/PSCServices/psc-reports-service';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
// const URL = '/api/';
@Component({
  selector: 'app-dmcsfileuploader',
  templateUrl: './dmcsfileuploader.component.html',
  styleUrls: ['./dmcsfileuploader.component.css']
})
  
export class DmcsfileuploaderComponent implements OnInit {

  constructor(private DMCSFileUploaderRef:MatDialogRef<DmcsfileuploaderComponent>, private FileRenderer2:Renderer2,
               private PSCFileLocalStorage: LocalStorageService, private PSCHttp:PSCReportService,
               private PScFormBuilder: FormBuilder, private PSCMatDialog:MatDialog,
               private PscRoute:Router, private PSCSessionStorage: SessionStorageService) {}
 @ViewChild('FileUploaderRef') FileUploader: ElementRef;
  FileUploadElement: any;
  FileUploaderValue: any = 0;
  width: any = 0;
  FileName:string;
  FileSize:number;
  isFile:boolean = false;
  FilePayload: File;
//UFt=  R (for first 6 sections. daily,weekly etc.)
//UFr=  nSectionNum
//UFa =  (If sType = R then it can be null)
//filePart (which contains file)
 public FileObject:{UFt:any, UFr:string, UFa: any};
  ngOnInit() {
  this.FileUploadElement = document.getElementById('filePart');
  this.FileRenderer2.listen(this.FileUploadElement, 'change', (e) => {
   // tslint:disable-next-line:forin
   this.isFile = true;
   for (const i in this.FileUploadElement.files) {
    if (this.FileUploadElement.files[i].name !== null && this.FileUploadElement.files[i].name !== undefined
      && this.FileUploadElement.files[i].size !== null && this.FileUploadElement.files[i].size !== undefined ) {
      this.FileName = this.FileUploadElement.files[i].name;
      this.FileSize = this.FileUploadElement.files[i].size;
      this.FilePayload = this.FileUploadElement.files[i];
//      console.log(this.FileUploadElement.files[i]);
    }
      
   } 
     const files = e.target.files || e.srcElement.files;
     this.FilePayload = files[0];
//    console.log(this.FilePayload); 
     
  });
  }
  OnFileUpload() {
//    console.log(this.FilePayload);
    const progressBar = document.getElementById('Progress');
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
    const UploadUrl = "https://dmcspatch.psc.gov/dmcswebapp/uploadFile/?UFt="+this.FileObject.UFt+
                      "&UFr="+this.FileObject.UFr+"&UFa="+this.FileObject.UFa+"&DMCSUserID="+ UserName;
  if (this.FileUploadElement.files.length > 0) {
    const TimerFunc = () => {
     if (this.width >= 100) {
       clearInterval(Timer);
//       console.log(this.FileObject.UFr);
//       console.log(this.FilePayload);      
//       console.log(this.FilePayload);
       let formData:FormData = new FormData();
       formData.append('filePart', this.FilePayload, this.FilePayload.name);
//       console.log(formData);
       this.PSCHttp.fileUploader(UploadUrl,formData)
       .subscribe((response)=> {
         const PSCMessage:MatDialogRef<ReportsErrormessageComponent> = this.PSCMatDialog.open(ReportsErrormessageComponent, {
           width:'800px',
           height:'300px'
         });
        PSCMessage.componentInstance.ErrorReport = {ErrorMessageTitle:'Success Message', ErrorMessage:response, responseType:'success'};
       },  (error)=>this.PSCHttp.PscErrorHandler(error));
       
     }else{
       this.width++;
       progressBar.style.width = this.width + '%';

     }
    };
  const Timer = setInterval(TimerFunc, 10);
 }   
  }
  onFileCancel() {
    const progressBar = document.getElementById('Progress');
    this.isFile = false;
    if (this.FileUploadElement.files.length > 0) {
      const TimeDescFun = () => {
        if (this.width === 0) {
        this.FileName = '';
        this.FileSize = 0;
//          console.log(TimerDesc);
         clearInterval(TimerDesc);
        }else {
          this.width--;
          progressBar.style.width = this.width + '%';
        }
      };
      const TimerDesc = setInterval(TimeDescFun, 10);      
    }
  }
  OnClose() {
  this.DMCSFileUploaderRef.close();
  }
  
}
