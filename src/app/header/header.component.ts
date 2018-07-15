import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {PscAuthService} from '../../assets/PSCAuth/psc-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   userName: string;
  constructor(private PscRoute: Router, private PSCAuth: PscAuthService,
     private PSCLocalStorage: LocalStorageService,private PSCSessionStorage: SessionStorageService, private PSCCookie: CookieService) { }

  ngOnInit() {  
      this.userName = this.PSCSessionStorage.retrieve('PSCUserName');   
  }
  
  OnLogOff() {
   const Url="https://dmcspatch.psc.gov/dmcswebapp/loginController/logout";
     const token = this.PSCSessionStorage.retrieve('PSCToken');    
      this.PSCAuth.onLogOut(Url);    
  }

}
