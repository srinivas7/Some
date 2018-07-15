import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PscAuthService} from '../../assets/PSCAuth/psc-auth.service';
import {PscService} from '../../assets/PSCServices/psc-service';
import { CookieService} from 'ngx-cookie-service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage'

@Component({
  selector: 'app-left-nav',
  templateUrl:'./left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  constructor(private PscRoute: Router, private PSCAuth: PscAuthService, private PSCLocalStorage: LocalStorageService,
              private PSCCookie: CookieService, private PSCActivatedRoute: ActivatedRoute,
              private PscService: PscService,private PSCSessionStorage: SessionStorageService) { }
  @Output() LeftNavEmitter:EventEmitter<object> = new EventEmitter<object>();
   IsAdmin:boolean = false;
  ngOnInit() {  
    if(this.PSCSessionStorage.retrieve('PSCUserName')){
        const UserName = this.PSCSessionStorage.retrieve('PSCUserName');;
      const Url="https://dmcspatch.psc.gov/dmcswebapp/user/isAdmin?DMCSUserID="+UserName;
      this.PscService.getISAdmin(Url).subscribe((response)=>{
        const responseBody = response['body'];
        for(const x in responseBody){
//          console.log(responseBody[x]);
          this.IsAdmin = responseBody[x];
        }
      }, (error)=>this.PscService.PscErrorHandler(error));
    }
//   console.log(this.PscRoute.url);
  }
//  OnLogOff() {
//   const Url="https://dmcspatch.psc.gov/dmcswebapp/loginController/logout";
////   const token = this.PSCLocalStorage.retrieve('PSCToken');
//    const token = this.PSCCookie.get('PSC_TOKENCOOKIE');
//    if(token){
//      this.PSCAuth.onLogOut(Url);
//    }
//  }
  OnReportNavigation(){
    this.PscRoute.navigate(['DMCSReports']);
  }
  OnSysAdmin(){
    const SysAdmin ={
      "IsLeftNav": true
    }
    this.LeftNavEmitter.emit(SysAdmin);
    this.PscRoute.navigate(['/NavigationPage/systemadministration']);
  } 
  OnUserReports(){
    const SysAdmin ={
      "IsLeftNav": true
    }
    this.LeftNavEmitter.emit(SysAdmin);
    this.PscRoute.navigate(['/NavigationPage/UserReports']);
  } 
 
 
}
