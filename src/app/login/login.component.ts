import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PscAuthService} from '../../assets/PSCAuth/psc-auth.service';
import {HttpResponse} from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   LoginFormGroup: FormGroup;
   LoginName: string;
   LoginPassword: string;
  invalidLogin: String;
  constructor(private PScRouter: Router, private PSCActivatedRoute: ActivatedRoute, private PscAuth: PscAuthService,
    private PSCLocalStorage: LocalStorageService, private PSCCookie: CookieService, private PSCSessionStorageService:SessionStorageService) {}

  ngOnInit() {  
    this.PSCLocalStorage.clear();           
    this.logincomponent(); 
    window.onbeforeunload = function () {
return "Are you sure";
};
    }
  logincomponent(){
  this.LoginFormGroup = new FormGroup({
      'LoginForm': new FormGroup({
        'LoginUserName': new FormControl({value: '', disabled: false},
          [Validators.required]),
        'LoginUserPassword': new FormControl({value: '', disabled: false},
          [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
      })
    });
  }
  userLogin() {
    const UrlProp = 'https://dmcspatch.psc.gov/dmcswebapp/oauth/token';
    const UserName = this.LoginFormGroup.get('LoginForm.LoginUserName').value;
    const username = UserName.toUpperCase();
    const Password = this.LoginFormGroup.get('LoginForm.LoginUserPassword').value;
    //    console.log(this.PScRouter);
    //    console.log(this.PSCActivatedRoute);
    //    console.log(this.LoginFormGroup.get('LoginForm.LoginUserName').value);
    //    console.log(this.LoginFormGroup.get('LoginForm.LoginUserPassword').value);
    //     this.invalidLogin = this.PSCLocalStorage.retrieve('InValidLogin') || false;
    //    this.invalidLogin = this.PSCCookie.ch'PSC_TOKENCOOKIE');

    //    this.invalidLogin = this.PSCCookie.get('InValidLogin');    
    //    console.log(this.invalidLogin);
    this.PscAuth.OnLogin(UrlProp, username, Password);
    // setTimeout(() => {
    //   if (!this.PSCCookie.check('PSC_TOKENCOOKIE')) {
    //     this.invalidLogin = 'Invalid Username or Password';
    //   } else {
    //     this.invalidLogin = '';

    //   }
    // }, 6000);
 }
}


