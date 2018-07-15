import { Component, OnInit, Renderer2} from '@angular/core';
import { PscService } from "../../assets/PSCServices/psc-service";
import {SessionStorageService} from 'ngx-webstorage';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reports-left-nav',
  templateUrl: './reports-left-nav.component.html',
  styleUrls: ['./reports-left-nav.component.css']
})
export class ReportsLeftNavComponent implements OnInit {
  navigationValues:Array<any>; 
  UlReport:any;
  constructor(private PscHttp: PscService, private PSCSessionStorage: SessionStorageService, private PSCRenderer: Renderer2, private PSCRouter:Router) { }

  ngOnInit() {
    this.UlReport = document.getElementById('reportNav');
    const UserName = this.PSCSessionStorage.retrieve('PSCUserName');
    const Url = " https://dmcspatch.psc.gov/dmcswebapp/userFolderACLList/?u=" + UserName + "&DMCSUserID=SA10"+ "&a=show";
    this.PscHttp.getFolderInfo(Url).subscribe((response: HttpResponse<object>) => {
      const ResponseBody = response['body'];
      if(ResponseBody !== undefined && ResponseBody !==null){
        const Assigned = ResponseBody['Assigned'];
        const navigationValues = Assigned.map((objectName,i)=> {
//           console.log(i);
          return objectName.descPath});
     this.navigationValues= navigationValues.filter((el,k,self)=>{            
            if(self.indexOf(el) === k){
             return  navigationValues.slice(el, k);
            }
          });
//        console.log(this.navigationValues);        
         if (this.navigationValues.indexOf('Inbound Files') > -1){
      const li = this.PSCRenderer.createElement('li');
       const lia = this.PSCRenderer.createElement('a');
       this.PSCRenderer.setAttribute(lia,'routerLink','dmcsinboundfiles');
       const liaText = this.PSCRenderer.createText('Inbound Files');
        this.PSCRenderer.appendChild(lia,liaText);
        this.PSCRenderer.appendChild(li,lia);
        this.PSCRenderer.appendChild(this.UlReport, li);  
         this.PSCRenderer.addClass(li,'dynamicReportLeftNav');
        this.PSCRenderer.listen(lia,'click', ($event)=>{
        this.PSCRouter.navigate(['DMCSReports/dmcsinboundfiles']);
        })
      }

        if(this.navigationValues.indexOf("Outbound Files / Daily Files") > -1 || this.navigationValues.indexOf("Outbound Files / Weekly Files") >-1 
           || this.navigationValues.indexOf("Outbound Files / Monthly Files") > -1 || this.navigationValues.indexOf("Outbound Files / Quarterly Files") > -1
           || this.navigationValues.indexOf("Outbound Files / Yearly Files")> -1 || this.navigationValues.indexOf("Outbound Files / Adhoc Files") > -1
           || this.navigationValues.indexOf("Outbound Files / Transmit Files") > -1){
          const liOut = this.PSCRenderer.createElement('li');
       const liaOut = this.PSCRenderer.createElement('a');
       this.PSCRenderer.setAttribute(liaOut,'routerLink','dmcsoutboundfiles');
       const liaText = this.PSCRenderer.createText('Outbound Files');
        this.PSCRenderer.appendChild(liaOut,liaText);
        this.PSCRenderer.appendChild(liOut,liaOut);
        this.PSCRenderer.appendChild(this.UlReport, liOut);
          this.PSCRenderer.addClass(liaOut,'dynamicReportLeftNav');  
        this.PSCRenderer.listen(liaOut,'click', ($event)=>{
        this.PSCRouter.navigate(['DMCSReports/dmcsoutboundfiles']);
        });
        }      
      if(this.navigationValues.indexOf("Adhoc Reports") > -1){
      const liAdhoc = this.PSCRenderer.createElement('li');
       const liaAdhoc = this.PSCRenderer.createElement('a');
       this.PSCRenderer.setAttribute(liaAdhoc,'routerLink','dmcsadhocfiles');
       const liaText = this.PSCRenderer.createText('Adhoc Files');
        this.PSCRenderer.appendChild(liaAdhoc,liaText);
        this.PSCRenderer.appendChild(liAdhoc,liaAdhoc);
        this.PSCRenderer.appendChild(this.UlReport, liAdhoc);
        this.PSCRenderer.addClass(liAdhoc,'dynamicReportLeftNav');  
        this.PSCRenderer.listen(liaAdhoc,'click', ($event)=>{
        this.PSCRouter.navigate(['DMCSReports/dmcsadhocfiles']);
        });
      }
      }
     
      });
  }

}
