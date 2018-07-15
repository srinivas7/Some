import {
  PscService
}
  from "../../assets/PSCServices/psc-service";
import {
  Component,
  OnInit
}
  from '@angular/core';
import {
  NgForm
}
  from '@angular/forms';
import {
  HttpResponse
}
  from '@angular/common/http';
import {
  LocalStorageService, SessionStorageService
}
  from 'ngx-webstorage';
import {
  Renderer2,
  ElementRef
}
  from '@angular/core';
@Component({
  selector: 'app-system-administration',
  templateUrl: './system-administration.component.html',
  styleUrls: ['./system-administration.component.css']
})
export class SystemAdministrationComponent implements OnInit {
   isTable: Boolean = false;
   SystemAdminArray: Array<object> = [];
   InboundHeader: string = "";
   AdhocReportHeader: string = "";
   ObDHeader: string = "";
   ObWHeader: string = "";
   ObMHeader: string = "";
   ObQHeader: string = "";
   ObYHeader: string = "";
   ObTHeader: string = "";
   ObAHeader: string = "";
   UserId: string = "";
   isAssigned: boolean = false;
   isAvailable: boolean = false;
   IsId: any = 0;
   PreviousElement: any;
   ParentAssignTable: any;
   ParentAvailableTable: any;
   CurrentSelectedString: string;
   data;
   showFileUpload = false;
   firstDropDown = true;
   secondDropDown = false;
  constructor(private PscHttp: PscService, private PSCLocalStorage: LocalStorageService, private PSCRenderer: Renderer2,
              private PSCSessionStorage: SessionStorageService) {}
  ngOnInit() {
    
    this.PscHttp.getFirstDropDownData().subscribe((response: HttpResponse<any>) => {
      this.data = response.body;
      console.log(response);
    });

    const url = 'https://dmcspatch.psc.gov/dmcswebapp/user/getUsersList';
    this.PscHttp.getUserDetails(url).subscribe((response) => {
      if (response) {
        const UserArray = response['body'];
//   console.log(UserArray);
        if (UserArray && UserArray.length > 0) {
          UserArray.forEach((i, k) => {
            this.SystemAdminArray.push({
              userID: i.userID,
              userName: i.userName
            });
          });
          if (this.SystemAdminArray.length > 0) {
            this.isTable = true;
          }
        }
      }
    }, (error)=>this.PscHttp.PscErrorHandler(error));
    this.DMCSSelectedUser(this.PSCLocalStorage.retrieve('PSCUserName'));
  }  
  DMCSSelectedUser(UserId):void {
//    console.log(UserId);
    this.UserId = UserId;
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
    const Url = " https://dmcspatch.psc.gov/dmcswebapp/userFolderACLList/?u=" + UserId + "&DMCSUserID=" + UserName + "&a=show";
    this.PscHttp.getFolderInfo(Url).subscribe((response: HttpResponse<object>) => {
      const ResponseBody = response['body'];
      if (ResponseBody !== undefined && ResponseBody !== null) {
        this.DMCSFolderUpdater(ResponseBody);
      }
    }, (error)=>this.PscHttp.PscErrorHandler(error));
  }
  DMCSFolderUpdater(ResponseBody):void {
    if (ResponseBody !== undefined && ResponseBody !== null) {
//      console.log(ResponseBody);
      this.isAssigned = true;
      this.isAvailable = true;
      setTimeout(() => {
        const ParentTable1 = document.getElementById('AssignedTable');
        const ParentTable = document.getElementById('AvailableTable');
        while (ParentTable1.firstChild) {
          ParentTable1.removeChild(ParentTable1.firstChild);
        }
        while (ParentTable.firstChild) {
          ParentTable.removeChild(ParentTable.firstChild);
        }
        if (ResponseBody['Assigned'].length > 0) {
          this.ParentAssignTable = ParentTable1;
          this.InboundHeader = "";
          this.AdhocReportHeader = "";
          this.ObDHeader = "";
          this.ObMHeader = "";
          this.ObQHeader = "";
          this.ObTHeader = "";
          this.ObWHeader = "";
          this.ObYHeader = "";
          this.ObAHeader = "";
          this.DMCSAvailableAssigned(ResponseBody['Assigned'], ParentTable1);
        }
        if (ResponseBody['Available'].length > 0) {
          this.ParentAvailableTable = ParentTable;
          this.InboundHeader = "";
          this.AdhocReportHeader = "";
          this.ObDHeader = "";
          this.ObMHeader = "";
          this.ObQHeader = "";
          this.ObTHeader = "";
          this.ObWHeader = "";
          this.ObYHeader = "";
          this.ObAHeader = "";
          this.DMCSAvailableAssigned(ResponseBody['Available'], ParentTable);
        }

      }, 100);
    }
  }
  DMCSAvailableAssigned(ResponseData, ParentTable):void {
    ResponseData.forEach((i, k) => {
      if (this.isAssigned === true) {
        if (i.descPath.indexOf('Inbound Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.InboundHeader.length === 0) {
            this.InboundHeader = i.descPath;
            thdata = (this.InboundHeader.length > 0) ? this.PSCRenderer.createText(`${this.InboundHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Adhoc Reports') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata
          if (this.AdhocReportHeader.length === 0) {
            this.AdhocReportHeader = i.descPath;
            thdata = (this.AdhocReportHeader.length > 0) ? this.PSCRenderer.createText(`${this.AdhocReportHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Outbound Files / Daily Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.ObDHeader.length === 0) {
            this.ObDHeader = i.descPath;
            thdata = (this.ObDHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObDHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;.0
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);

        } else if (i.descPath.indexOf('Outbound Files / Weekly Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.ObWHeader.length === 0) {
            this.ObWHeader = i.descPath;
            thdata = (this.ObWHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObWHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Outbound Files / Monthly Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.ObMHeader.length === 0) {
            this.ObMHeader = i.descPath;
            thdata = (this.ObMHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObMHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Outbound Files / Quarterly Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.ObQHeader.length === 0) {
            this.ObQHeader = i.descPath;
            thdata = (this.ObQHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObQHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Outbound Files / Yearly Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          let thdata;
          const thid = i.descPath;
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          if (this.ObYHeader.length === 0) {
            this.ObYHeader = i.descPath;
            thdata = (this.ObYHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObYHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Outbound Files / Adhoc Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.ObAHeader.length === 0) {
            this.ObAHeader = i.descPath;
            thdata = (this.ObAHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObAHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else if (i.descPath.indexOf('Outbound Files / Transmit Files') > -1) {
          const tdData = this.PSCRenderer.createText(`${i.folderName}`);
          const tdDataSeq = this.PSCRenderer.createText(`${i.seq}`);
          const thid = i.descPath;
          let thdata;
          if (this.ObTHeader.length === 0) {
            this.ObTHeader = i.descPath;
            thdata = (this.ObTHeader.length > 0) ? this.PSCRenderer.createText(`${this.ObTHeader}`) : console.log('Data is not Available');
          } else {
//            console.log('Header is Created');
            thdata = "";
          }
          this.IsId = this.IsId + 1;
          this.DMCSAssgnedUnassignedReports(this.IsId, tdData, thdata, thid, tdDataSeq, ParentTable);
        } else {
//          console.log('Zero Folder Avaliable  for assignment');
        }
      }
    });
  }
  DMCSAssgnedUnassignedReports(setId, tdata, thdata, thId, tdSeq, ParentTable):void {
//    console.log(setId);
    const tr = this.PSCRenderer.createElement('tr1');
    const td = this.PSCRenderer.createElement('td');
    const tdDSeq = this.PSCRenderer.createElement('td');
    const tr1 = this.PSCRenderer.createElement('tr');
    const th1 = this.PSCRenderer.createElement('th');
    const tbody = this.PSCRenderer.createElement('tbody');
    const thead = this.PSCRenderer.createElement('thead');
    const table = this.PSCRenderer.createElement('table');
    const lastTd = this.PSCRenderer.createElement('td');
    const lastTr = this.PSCRenderer.createElement('tr');
    this.PSCRenderer.appendChild(td, tdata);
    this.PSCRenderer.appendChild(tr, td);
    this.PSCRenderer.appendChild(tdDSeq, tdSeq);
    this.PSCRenderer.appendChild(tr, tdDSeq);
    this.PSCRenderer.appendChild(tbody, tr);
    if (thdata.length > 0) {
      this.PSCRenderer.appendChild(th1, thdata);
      this.PSCRenderer.appendChild(tr1, th1);
      this.PSCRenderer.appendChild(thead, tr1);
      this.PSCRenderer.setAttribute(th1, "id", thId);
      this.PSCRenderer.appendChild(table, thead);
    }
    this.PSCRenderer.appendChild(table, tbody);
    this.PSCRenderer.appendChild(lastTd, table);
    this.PSCRenderer.appendChild(lastTr, lastTd);
    this.PSCRenderer.appendChild(ParentTable, lastTr);
    this.PSCRenderer.addClass(table, "table");
    this.PSCRenderer.addClass(table, "table-responsive");
    this.PSCRenderer.addClass(table, "table-bordered");
    this.PSCRenderer.addClass(td, "SelectedR");
    this.PSCRenderer.addClass(tdDSeq, "SelectedSeq");
    this.PSCRenderer.setAttribute(td, "id", "SelectedFolder" + setId);
    this.PSCRenderer.listen(td, "click", (e) => {
      const elementId = e.currentTarget.id;
      const elementRef = document.getElementById(elementId);
      this.DMCSAssignUnAssign(elementRef.parentNode.firstChild.nextSibling.textContent);
      if (this.PreviousElement !== undefined && this.PreviousElement !== null) {
        this.PreviousElement.classList.remove("SelectedReport");
      }
      setTimeout(() => {
        elementRef.className = "SelectedReport";
        this.PreviousElement = elementRef;
      }, 100);

    });
  }
  DMCSAssignUnAssign(SearchString: string):void {
    this.CurrentSelectedString = SearchString;
  }
  DMCSAssign():void {
    const UserId = this.UserId;
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const SeqNumber = this.CurrentSelectedString;
    const Url = "  https://dmcspatch.psc.gov/dmcswebapp/userFolderACLList/?u=" + UserId + "&DMCSUserID=" + UserName +
      "&a=From_alAvailableFolders&f=" + SeqNumber;
    this.PscHttp.getFolderInfo(Url).subscribe((response: HttpResponse<object>) => {
//      console.log(response['body']);
      const ResponseBody = response['body'];
      if (ResponseBody !== undefined && ResponseBody !== null) {
        this.CurrentSelectedString = "";
        this.DMCSFolderUpdater(ResponseBody);
      }
    }, (error)=>this.PscHttp.PscErrorHandler(error));
  }
  DMCSUnAssign():void {
    const UserId = this.UserId;
    const SeqNumber = this.CurrentSelectedString;
     const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/userFolderACLList/?u=" + UserId + "&DMCSUserID=" + UserName +
      "&a=From_alAssignedFolders&f=" + SeqNumber;
    this.PscHttp.getFolderInfo(Url).subscribe((response: HttpResponse<object>) => {
//      console.log(response['body']);
      const ResponseBody = response['body'];
      if (ResponseBody !== undefined && ResponseBody !== null) {
        this.CurrentSelectedString = "";
        this.DMCSFolderUpdater(ResponseBody);
      }
    }, (error)=>this.PscHttp.PscErrorHandler(error));
  }
  
  onSelectFDD(value){
    console.log(value);
  }
  showSecondDD(){
    this.firstDropDown = false;
    this.secondDropDown = true;
    this.showFileUpload = false;
    this.PscHttp.getSecondDropDownData().subscribe((response: HttpResponse<any>) => {
      this.data = response.body;
    });
  }
  onSelectSDD(value){
    console.log(value);
  }
  secondNext(){
    this.showFileUpload = true;
    this.secondDropDown = false;
  }
  showFirstDD(){
    this.secondDropDown = false;
    this.firstDropDown = true;
  }
}