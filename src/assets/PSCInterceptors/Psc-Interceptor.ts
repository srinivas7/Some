import {HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie-service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Ng2DeviceService} from 'ng2-device-detector';
//import {PscAuthService} from '../PSCAuth/psc-auth.service';

@Injectable()
export class PscInterceptors implements HttpInterceptor {
  constructor(private PSCCookie: CookieService, private PSCDeviceDetector: Ng2DeviceService, private PSCLocalStorage: LocalStorageService,
    private PSCSessionStorageService: SessionStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    token = this.PSCSessionStorageService.retrieve('PSCToken');
    //    console.log(token);
    let ClonedReq;
    if (token !== null && token !== "" && token !== undefined) {
      ClonedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer' + ' ' + token)});

//    console.log(ClonedReq);


    } else {
    ClonedReq = req.clone({});
    }
// console.log(ClonedReq);
    try {
      return next.handle(ClonedReq);
    } catch (error) {
      //      console.log(error);
    }
  }

}


