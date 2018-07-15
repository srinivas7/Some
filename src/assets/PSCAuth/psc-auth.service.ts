import { ReportsErrormessageComponent } from "../../app/DMCSReports/reports-errormessage/reports-errormessage.component";
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { MatDialogRef, MatDialog } from "@angular/material";
import { AsyncLocalStorage} from 'angular-async-local-storage';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';
import {Ng2DeviceService} from 'ng2-device-detector';
import {Router} from '@angular/router';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
const UrlLogOff="https://dmcspatch.psc.gov/dmcswebapp/loginController/logout";
@Injectable()
export class PscAuthService {
  // tslint:disable-next-line:no-inferrable-types
   isUser:boolean = false;
  // tslint:disable-next-line:no-inferrable-types
   isResponse:boolean = false;
   PSCTimeInterval;
  constructor(private PSCAuth:HttpClient, private PSCLocalStorage:LocalStorageService, private MatDiaLog:MatDialog, 
              private PSCRoute: Router, private PSCCookie: CookieService, private PSCDeviceDetector: Ng2DeviceService,
              private PSCSessionStorageService:SessionStorageService) { }
  OnLogin(UrlProp:string, userName: string, password: string) {   
    const clientId= 'angularClient';
    const secretKey= 'secret';
   const Params = new HttpParams().set('username',userName)
                                  .append('password', password)
                                  .append('grant_type','password')
                                  .append('clientId',clientId);
    
//    const Params = new URLSearchParams();
//      Params.append('username',userName);
//                                 Params .append('password', password);
//                                  Params.append('grant_type','password');
//                                  Params.append('client_id',clientId);

 // tslint:disable-next-line:max-line-length
 const PscLoginHeaders = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("angularClient:secret")});
  const PSCLoginRequest = new HttpRequest('POST',UrlProp,Params.toString(),{headers:PscLoginHeaders});
 this.PSCAuth.request(PSCLoginRequest).map((data:HttpResponse<Object>)=>{
 return data;
 }).subscribe( (data)=> {
    this.PSCRoute.navigate(['NavigationPage']);   
   },(error)=> 
    this.PSCRoute.navigate(['NavigationPage'])
  );
  }
  onLogOut(UrlProp) {
   const UrlP = UrlProp;
    let token:string;   
           token = this.PSCSessionStorageService.retrieve('PSCToken');       
      const PSCLogout = new HttpRequest('DELETE', UrlP,{responseType:'text'});
      this.PSCAuth.request(PSCLogout).map((response:HttpResponse<Response>)=>{       
       return response;
      })
        .subscribe( (data) => {       
       const Response = data;
        if(Response !== undefined && Response !==null){
//        console.log(Response.status, Response.statusText);  
          if(Response.status === 200 && (Response.statusText === '200' || Response.statusText === 'OK')) {          
            this.PSCLocalStorage.clear();
            this.PSCSessionStorageService.clear();
            window.localStorage.clear();
            this.PSCRoute.navigate(['Login']);
          }
//          else{
//           this.PSCLocalStorage.clear();
//            this.PSCRoute.navigate(['Login']);
//          }      
        }
         }, (error)=> this.PSCErrorHandler(error));
        
  }
  PSCErrorHandler(error:HttpErrorResponse){
  const Error = error['error'];
     if(Error){
    const SessionError:MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent,{
     width:'800px',
     height:'300px'
    });
       SessionError.componentInstance.ErrorReport = {ErrorMessageTitle:'Session Expired', 
                                                     ErrorMessage: 'Your session has been expired', responseType:'Error'};
       SessionError.afterClosed().subscribe(()=>{
       this.PSCLocalStorage.clear();  
       this.PSCSessionStorageService.clear();      
       this.PSCRoute.navigate(['Login'])
       })
     }
  }
  PSCLoginErrorHandler(error:HttpErrorResponse){
    const Error = error['error'];
    const ErrorStatus = error['status'];
    const ErrorStatusText = error['statusText'];
    if(ErrorStatus === 409 && ErrorStatusText === '409'){
       const SessionError:MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent,{
     width:'800px',
     height:'300px'
    });
       SessionError.componentInstance.ErrorReport = {ErrorMessageTitle:'User Already LoggedIn', 
                                                     ErrorMessage: `You have already loggedIn in another browser Tab or browser Window 
                                                                    Or please come back after 30 minutes `,
                                                     responseType:'Error'};
       SessionError.afterClosed().subscribe(()=>{     
       window.location.reload();
       })
    }
  }
  PSCTimer(TimerValue, RefreshToken){
  const Timer= setTimeout(()=>{
     this.onLogOut(UrlLogOff);
     if(this.PSCLocalStorage.isStorageAvailable() && this.PSCSessionStorageService.isStorageAvailable()){
     this.PSCLocalStorage.clear();
     this.PSCSessionStorageService.clear();
       this.PSCCookie.deleteAll();
       window.localStorage.clear();
//       this.PSCRefreshTokenizer(RefreshToken,Timer); 
           this.PSCTokenClearer(Timer);
     }
     },TimerValue*60000);   
  }
  PSCTokenClearer(Timer){
    clearInterval(Timer);
    this.PSCRoute.navigate(['Login']);
  }
  PSCRefreshTokenizer(Token,PSCTimer){
   if(Token !==null && Token !== undefined && Token !==""){ 
        this.PSCLocalStorage.store('PSCToken', Token);   
        clearInterval(PSCTimer);
   }
    setInterval(()=>{
    this.PSCSessionStorageService.clear();
    this.PSCLocalStorage.clear();     
      this.PSCRoute.navigate(['Login']);
    },3600*1000);
  }
 
 isUserAuthenticated() {
   return this.PSCSessionStorageService.retrieve('PSCToken') !== null;  
//   return this.PSCLocalStorage.isStorageAvailable();  
   
 }
}
