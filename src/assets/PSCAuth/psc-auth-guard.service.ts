import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { PscAuthService } from './psc-auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PscAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private PSCAuthRoute: Router, private PSCAuthService: PscAuthService) { }
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
   if(this.PSCAuthService.isUserAuthenticated()){
  return this.PSCAuthService.isUserAuthenticated();
   }else{
     this.PSCAuthRoute.navigate(['Login']);
   }
 }
 canActivateChild(route: ActivatedRouteSnapshot, state:RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
   return this.canActivate(route, state);
 }
}
