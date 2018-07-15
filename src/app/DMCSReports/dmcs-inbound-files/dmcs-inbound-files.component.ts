import {Component, OnInit, Renderer2, OnDestroy} from '@angular/core';
import {PSCReportService} from "../../../assets/PSCServices/psc-reports-service";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {PscUniqueIdentifierPipe} from '../../../assets/PscCustomPipes/psc-unique-identifier.pipe';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ReportsErrormessageComponent} from '../reports-errormessage/reports-errormessage.component';
import {DmcsalertComponent} from "../dmcsalert//dmcsalert.component";
import {Subscription} from 'rxjs';
import { AccordionConfig} from 'ngx-bootstrap/accordion';
import { DmcsfileuploaderComponent} from  "../dmcsfileuploader/dmcsfileuploader.component";

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true});
}
@Component({
  selector: 'app-dmcs-inbound-files',
  templateUrl: './dmcs-inbound-files.component.html',
  styleUrls: ['./dmcs-inbound-files.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class DmcsInboundFilesComponent implements OnInit, OnDestroy {
   subscription: Subscription;
  constructor(private PSCHttp: PSCReportService, private PSCLocalStorage: LocalStorageService,private PSCSessionStorage: SessionStorageService,
    private PscRenderer: Renderer2, private matDialog: MatDialog, private PscRoute: Router) {
    this.subscription = this.PSCHttp.PScReportGetMessageAcross().subscribe(value => {this.isDeleteable = value.isDeleteable}, (error)=>this.PSCHttp.PscErrorHandler(error));
  }
   FileNames: Array<object> = []; 
   oneAtATime: boolean = true;
   NavigationHeader: string = "";
   ElementIndex: any = 0;
   isReferenced: boolean = false;
   IsOpen: boolean = false;
   isDeleteable: boolean = false;
  isInboundUpload: boolean = false;
  SubFolders:Array<object>=[];
  ngOnInit() {
    this.DmcsInboundFiles();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  DmcsInboundFiles() {
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;   
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/folders/?DMCSUserID=" + UserName + "&rt=1";
    this.PSCHttp.GetReportJson(Url).subscribe((response: HttpResponse<any>) => {
      const ResponseBody = response['body'];
      const Inboundfiles: Array<object> = [];
      let ParentElementRef;
      if (ResponseBody !== undefined && ResponseBody !== null) {
     this.SubFolders =  ResponseBody.map((objectName, index) =>{
         return objectName;
       });     
//        console.log(this.SubFolders);
      }

    }, (error)=>this.PSCHttp.PscErrorHandler(error));
  }
  DownloadFile(ChildFolder, FileFolder) {
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const seqNumber = ChildFolder.folderSeq;
    const filePath = FileFolder.filePath;
    const EncodingLevel = FileFolder.encodingLevel;
    const FileSize = parseInt(FileFolder.sFileSize);
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/download/file?rt=" + seqNumber + "&f=" + filePath + "&c=" + EncodingLevel + "&DMCSUserID=" + UserName;
    if (FileSize !== null && FileSize > 0 && FileSize !== undefined) {
      this.PSCHttp.GetReportPdf(Url, FileFolder.fileName);
    } else {
      const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.matDialog.open(ReportsErrormessageComponent, {
        width: "400px",
        height: "200px"
      });
      ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: "DMCS Reports", ErrorMessage: "File is not available", responseType:'Error'}
    }
  }
  isAccordionlog($event) {
//    console.log($event);
    this.IsOpen = $event;
  }
  alertMessage(x,g,i,p) {
//    console.log(x);
//    console.log(g);
    const AlertMsg: MatDialogRef<DmcsalertComponent> = this.matDialog.open(DmcsalertComponent, {
      width: "500px",
      height: "200px"
    });
    AlertMsg.componentInstance.alert = {Message: "Are you sure want to delete this file"};
    AlertMsg.afterClosed().subscribe(() => {
      this.deleteFile(x, g);
    }, (error)=>this.PSCHttp.PscErrorHandler(error));
  }
  deleteFile(x, g) {
    const folderSeq = x.folderSeq;
    const filePath = g.filePath;
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const EncodingLevel = g.encodingLevel;
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/deleteFile/file?DMCSUserID=" + UserName +
      "&DFt=F&DFr=" + folderSeq + "&DFa=" + filePath + "&DFn=" + EncodingLevel;
    if (this.isDeleteable === true) {
      this.PSCHttp.uploadDeleteReports(Url, "DELETE").subscribe((response: HttpResponse<any>) => {
        const ResponseBody = response["body"];
        if (ResponseBody !== undefined && ResponseBody !== null && ResponseBody.length > 0) {
          const ErrorMessage: MatDialogRef<ReportsErrormessageComponent> = this.matDialog.open(ReportsErrormessageComponent, {
            width: "800px",
            height: "400px"
          });
          ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: g.fileName, ErrorMessage: g.fileName + " " + ResponseBody,responseType:'Error'}
          this.FileNames.length = 0;
          this.DmcsInboundFiles();
        }
      }, (error)=>this.PSCHttp.PscErrorHandler(error));
    } 

  }
  UploadFileSubfolder(x,l,i){
  const UFt ='F';
  const UFr=x.folderSeq;
  const ParentString:string = l.folderFiles[i].sFolderPath;
  const n = ParentString.lastIndexOf('/');
  const UFa ='/'+ ParentString.substring(n + 1);
//   console.log(UFa);
   if(x.uploadYN){
     const FileUploader:MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent,{
       width:'800px',
       height:'300px'
     });
     FileUploader.componentInstance.FileObject = {UFt:UFt, UFr:UFr, UFa:UFa};
     FileUploader.afterClosed().subscribe(()=>{
//     this.SubFolders.length = 0;
      this.DmcsInboundFiles();
     }, (error)=>this.PSCHttp.PscErrorHandler(error));
   }
 
  }
  OnFileUploadSection(x,i){
  const UFt = 'F';
  const UFr =x.folderSeq;
  const ParentString: string = x.folderPath;
//   console.log(ParentString);
  const ChildPath:string = x.folderFiles[i].sFolderPath;
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
     this.SubFolders.length = 0;
      this.DmcsInboundFiles();
     }, (error)=>this.PSCHttp.PscErrorHandler(error)) ;
  }
  }
 
  
}


