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
import {DmcsfileuploaderComponent} from "../dmcsfileuploader/dmcsfileuploader.component";

@Component({
  selector: 'app-dmcs-adhoc-files',
  templateUrl: './dmcs-adhoc-files.component.html',
  styleUrls: ['./dmcs-adhoc-files.component.css']
})
export class DmcsAdhocFilesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private PSCHttp: PSCReportService, private PSCLocalStorage: LocalStorageService, private PscRenderer: Renderer2,
    private matDialog: MatDialog, private PscRoute: Router, private PSCSessionStorage: SessionStorageService) {
    this.subscription = this.PSCHttp.PScReportGetMessageAcross().subscribe(value => {this.isDeleteable = value.isDeleteable}, (error)=>this.PSCHttp.PscErrorHandler(error));
  }

  FileNames: Array<object> = [];
  oneAtATime: boolean;
  NavigationHeader: string = "";
  ElementIndex: any = 0;
  isReferenced: boolean = false;
  IsOpen: boolean = false;
  isDeleteable: boolean = false;
  isAdhocUpload: boolean = false;
  SubFolders: Array<object> = [];
  ngOnInit() {
    this.DmcsAdhocFiles();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  DmcsAdhocFiles() {
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;

    this.oneAtATime = true;
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/folders/?DMCSUserID=" + UserName + "&rt=3";
    this.PSCHttp.GetReportJson(Url).subscribe((response: HttpResponse<any>) => {
      const ResponseBody = response['body'];
      const Inboundfiles: Array<object> = [];
      let ParentElementRef;
      if (ResponseBody !== undefined && ResponseBody !== null) {
        this.SubFolders = ResponseBody.map((objectName, index) => {
          return objectName;
        });
        //        console.log(this.SubFolders);
      }

    }, (error) => this.PSCHttp.PscErrorHandler(error));
  }
  Upload() {}
  DownloadFile(ParentFolder, FileFolder) {
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
    const seqNumber = ParentFolder.folderSeq;
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
      ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: "DMCS Reports", ErrorMessage: "File is not available", responseType: 'Error'}
    }
  }
  isAccordionlog($event) {
    //    console.log($event);
    this.IsOpen = $event;
  }
  alertMessage(f, k, findex, kindex) {
    const AlertMsg: MatDialogRef<DmcsalertComponent> = this.matDialog.open(DmcsalertComponent, {
      width: "500px",
      height: "175px"
    });
    AlertMsg.componentInstance.alert = {Message: "Are you sure want to delete this file"};
    AlertMsg.afterClosed().subscribe(() => {
      this.deleteFile(f, k, findex, kindex);
    }, (error)=>this.PSCHttp.PscErrorHandler(error));
  }
  deleteFile(f, k, findex, kindex) {
    const folderSeq = f.folderSeq;
    const filePath = k.filePath;
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const EncodingLevel = k.encodingLevel;
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
          ErrorMessage.componentInstance.ErrorReport = {ErrorMessageTitle: k.fileName, ErrorMessage: k.fileName + " " + ResponseBody, responseType: 'Error'};
          this.SubFolders.length = 0;
          this.DmcsAdhocFiles();
        }
      }, (error) => this.PSCHttp.PscErrorHandler(error));
    } else {
      //      this.FileNames.length = 0;
      //      this.DmcsAdhocFiles();
    }

  }
  UploadFileSubfolder(x, h, i, j) {
    const UFt = 'F';
    const UFr = x.folderSeq;
    const ParentString: string = h.folderFiles[j].sFolderPath;
    const n = ParentString.lastIndexOf('/');
    const UFa = '/' + ParentString.substring(n + 1);
    //   console.log(UFa);
    if (x.uploadYN) {
      const FileUploader: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
        width: '800px',
        height: '300px'
      });
      FileUploader.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
      FileUploader.afterClosed().subscribe(() => {
        this.SubFolders.length = 0;
        this.DmcsAdhocFiles();
      }, (error)=>this.PSCHttp.PscErrorHandler(error));
    }

  }
  OnFileUploadSubSection(x, h, d, i, c, o) {
    const UFt = 'F';
    const UFr = x.folderSeq;
    const ParentString: string = h.folderFiles[c].sFolderPath;
    //    console.log(ParentString);
    const p = ParentString.lastIndexOf('/');
    const ChildPath: string = d.folderFiles[o].sFolderPath;
    const n = (ParentString === ChildPath) ? '' : ChildPath.lastIndexOf('/');
    const UFa = (n === '') ? n : '/' + ParentString.substring(p + 1) + '/' + ChildPath.substring(n + 1);
    //    console.log(UFa);
    if (x.uploadYN) {
      const FileUploader: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
        width: '800px',
        height: '300px'
      });
      FileUploader.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
      FileUploader.afterClosed().subscribe(() => {
        this.SubFolders.length = 0;
        this.DmcsAdhocFiles();
      }, (error)=>this.PSCHttp.PscErrorHandler(error));
    }
  }
  OnFileUploadSection(x, i) {
    const UFt = 'F';
    const UFr = x.folderSeq;
    const ParentString: string = x.folderPath;
    //   console.log(ParentString);
    const ChildPath: string = x.folderFiles[i].sFolderPath;
    //   console.log(ChildPath);
    const n = (ParentString === ChildPath) ? '' : ChildPath.lastIndexOf('/');
    const UFa = (n === '') ? n : '/' + ChildPath.substring(n + 1);
    //    console.log(UFa);
    if (x.uploadYN) {
      const FileUploader: MatDialogRef<DmcsfileuploaderComponent> = this.matDialog.open(DmcsfileuploaderComponent, {
        width: '800px',
        height: '300px'
      });
      FileUploader.componentInstance.FileObject = {UFt: UFt, UFr: UFr, UFa: UFa};
      FileUploader.afterClosed().subscribe(() => {
        this.SubFolders.length = 0;
        this.DmcsAdhocFiles();
      }, (error)=>this.PSCHttp.PscErrorHandler(error));
    }
  }

}

