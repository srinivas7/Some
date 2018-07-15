import {Component, OnInit, Renderer2, OnDestroy, ViewChild, AfterViewInit, ViewContainerRef} from '@angular/core';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";
import {LocalStorageService,SessionStorageService} from 'ngx-webstorage';
import {HttpResponse} from '@angular/common/http';
import {PscUniqueIdentifierPipe} from '../../../assets/PscCustomPipes/psc-unique-identifier.pipe';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTabChangeEvent} from '@angular/material';
import {Router} from '@angular/router';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import {DmcsalertComponent} from "../dmcsalert//dmcsalert.component";
import {Subscription} from 'rxjs';
import { DmcsfileuploaderComponent} from  "../dmcsfileuploader/dmcsfileuploader.component";
@Component({
  selector: 'app-dmcs-outbound-files',
  templateUrl: './dmcs-outbound-files.component.html',
  styleUrls: ['./dmcs-outbound-files.component.css']
})
export class DmcsOutboundFilesComponent implements OnInit,  OnDestroy {
   subscription:Subscription;
  constructor(private PSCHttp: PSCReportService, private PSCLocalStorage: LocalStorageService, private PscRenderer: Renderer2,
              private matDialog: MatDialog, private PscRoute: Router,private PSCSessionStorage: SessionStorageService) { 
  this.subscription = this.PSCHttp.PScReportGetMessageAcross().subscribe(value => {this.isDeleteable = value.isDeleteable}, (error)=>this.PSCHttp.PscErrorHandler(error));
  } 
   folderFiles:Array<object>=[];  
   oneAtATime:boolean;  
   isReferenced:boolean = false;  
   IsOpen:boolean = false;
   isDeleteable:boolean = false;
  isOutboundUpload: boolean = false;
   folderPath:string;
   indexValue:number;
   isTable:boolean = false;
  ngOnInit() {
   this.DMCSOutBound();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  DMCSOutBound(){
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;   
    this.oneAtATime = true;    
   const Url = "https://dmcspatch.psc.gov/dmcswebapp/folders/?DMCSUserID="+UserName+"&rt=2";
   this.PSCHttp.GetReportJson(Url).subscribe((response:HttpResponse<any>)=>{
    const ResponseBody = response['body'];
    const Outboundfiles:Array<object> =[];
    let ParentElementRef; 
    if(ResponseBody !== undefined && ResponseBody !== null){
       this.folderFiles = ResponseBody.map((objectName, index) => {
        return objectName;
       });
      
//      console.log(this.folderFiles);
     }
//     console.log(this.sNavigationId);
    
   }, (error)=>this.PSCHttp.PscErrorHandler(error));
  }
  CreatingOutBound(folderName,element){
  const ParentElement= document.getElementById('outBoundParent');
  this.PscRenderer.setAttribute(element,"label",folderName);
  this.PscRenderer.appendChild(ParentElement,element);
  }
  tabChanged($event:MatTabChangeEvent){
    if($event.index===1){
     var Element =$event.tab.content.viewContainerRef.element.nativeElement;
      
//      console.log(typeof Element);
    
    }
//   console.log($event.tab.content.templateRef.elementRef.nativeElement.ownerDocument);
// console.log($event.tab.content.viewContainerRef.element);
  }
  
DownloadFile(ChildFolder, FileFolder){
 const UserName=this.PSCSessionStorage.retrieve('PSCUserName');
 const seqNumber = ChildFolder.folderSeq;
 const filePath = FileFolder.filePath;
 const EncodingLevel = FileFolder.encodingLevel;
 const FileSize = parseInt( FileFolder.sFileSize);
 const Url = "https://dmcspatch.psc.gov/dmcswebapp/download/file?rt="+seqNumber+"&f="+filePath+"&c="+EncodingLevel+"&DMCSUserID="+UserName;
  if(FileSize !== null && FileSize > 0 && FileSize !== undefined){
  this.PSCHttp.GetReportPdf(Url,FileFolder.fileName);
  }else {
    const ErrorMessage:MatDialogRef<ReportsErrormessageComponent> =  this.matDialog.open(ReportsErrormessageComponent,{
    width:"400px",
     height:"200px"
    });
    ErrorMessage.componentInstance.ErrorReport ={ErrorMessageTitle:"DMCS Outbound", ErrorMessage:"File is not available", responseType:'Error'} 
  }
}
  isAccordionlog($event){
//  console.log($event);
    this.IsOpen = $event;
  }
  alertMessage(f,k){
  const AlertMsg:MatDialogRef<DmcsalertComponent> = this.matDialog.open(DmcsalertComponent,{
   width:"500px",
   height:"400px"
  });
    AlertMsg.componentInstance.alert={Message:"Are you sure want to delete this file"};
  AlertMsg.afterClosed().subscribe(()=>{ this.deleteFile(f,k)}, (error)=>this.PSCHttp.PscErrorHandler(error));
  }
  deleteFile(f,k){ 
  const folderSeq=f.folderSeq;
//    console.log(f);
//    console.log(k);
  const filePath = k.filePath;
   const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
  const EncodingLevel = k.encodingLevel;    
  const Url ="https://dmcspatch.psc.gov/dmcswebapp/deleteFile/file?DMCSUserID="+UserName+
             "&DFt=F&DFr="+folderSeq+"&DFa="+filePath+"&DFn="+EncodingLevel;
    if(this.isDeleteable === true){
    this.PSCHttp.uploadDeleteReports(Url,"DELETE").subscribe((response:HttpResponse<any>)=>{
     const ResponseBody = response["body"];
      if (ResponseBody !== undefined && ResponseBody !== null && ResponseBody.length > 0) {
         const ErrorMessage:MatDialogRef<ReportsErrormessageComponent> =  this.matDialog.open(ReportsErrormessageComponent,{
          width:"800px",
         height:"400px"
       });
       ErrorMessage.componentInstance.ErrorReport ={ErrorMessageTitle:k.fileName, ErrorMessage:k.fileName+" "+ResponseBody, responseType:'Error'} 
//        this.FileNames.length = 0;
       this.DMCSOutBound();
  }  
      }, (error)=>this.PSCHttp.PscErrorHandler(error));
    } else{
      this.DMCSOutBound();
    }
  
}  

  OnFileUploadSection(x,q){
  const UFt = 'F';
  const UFr =x.folderSeq;
  const ParentString: string = x.folderPath;
//   console.log(ParentString);
  const ChildPath:string = x.folderFiles[q].sFolderPath;
//   console.log(ChildPath);
  const n = (ParentString === ChildPath)? '' : ChildPath.lastIndexOf('/');
  const UFa = (n === '')? n : '/'+ ChildPath.substring(n + 1);
  if(x.uploadYN){
   const FileUploader:MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent,{
       width:'800px',
       height:'300px'
     });
     FileUploader.componentInstance.FileObject = {UFt:UFt, UFr:UFr, UFa:UFa};
     FileUploader.afterClosed().subscribe(()=>{
//     this.folderFiles.length = 0;
      this.DMCSOutBound();
     }, (error)=>this.PSCHttp.PscErrorHandler(error)) ;
  }
  }
  uploadSubFolderSection(j,h,z,y){
  const UFt = 'F';
    const UFr = j.folderSeq;
    const ParentString: string = j.folderPath;
//      console.log(ParentString);
    const ChildPath: string = h.folderFiles[y].sFolderPath;
    const n =(ParentString === ChildPath)?'': ChildPath.lastIndexOf('/');
    const UFa = (n === '')? n : '/' + ChildPath.substring(n + 1);
//    console.log(UFa);
    if(j.uploadYN){
    const FileUploader:MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent,{
       width:'800px',
       height:'300px'
     });
     FileUploader.componentInstance.FileObject = {UFt:UFt, UFr:UFr, UFa:UFa};
     FileUploader.afterClosed().subscribe(()=>{
     this.folderFiles.length = 0;
      this.DMCSOutBound();
     }, (error)=>this.PSCHttp.PscErrorHandler(error)) ;
  }    
  }
  UploadFileOuterSubfolder(x,j,q,z){
  const UFt = 'F';
  const UFr = j.folderSeq;
  const ParentString: string = j.folderPath;
//    console.log(ParentString); 
//    console.log(j);   
   const path = j.folderFiles.filter((n)=> n.sFolderPath === j.folderPath).map((item)=> {return item.sFolderPath});
    const [ChildPath] = path;
//    console.log(ChildPath);   
    const n =(ParentString === ChildPath)? '': ChildPath.lastIndexOf('/');
    const UFa = (n === '')? n :'/' + ChildPath.substring(n+1);    
    if(j.uploadYN){
    const FileUploader:MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent,{
       width:'800px',
       height:'300px'
     });
    FileUploader.componentInstance.FileObject = {UFt:UFt, UFr:UFr, UFa:UFa};
     FileUploader.afterClosed().subscribe(()=>{
     this.folderFiles.length = 0;
      this.DMCSOutBound();
     }, (error)=>this.PSCHttp.PscErrorHandler(error)) ;
  }    
  }
  
  
}
