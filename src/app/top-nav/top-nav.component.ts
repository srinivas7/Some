import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {PscAuthService} from '../../assets/PSCAuth/psc-auth.service'

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(private PSCLocalStorage: LocalStorageService, private PSCAuth: PscAuthService, private PSCRoute: Router) {}
  UserName: string;
  @Output() LeftNavHomeEmitter: EventEmitter<object> = new EventEmitter<object>();
  ngOnInit() {
    this.UserName = this.PSCLocalStorage.retrieve('PSCUserName');
  }
  OnLogOff() {
    const Url = "https://dmcspatch.psc.gov/dmcswebapp/loginController/logout";
    const token = this.PSCLocalStorage.retrieve('PSCToken');
    this.PSCAuth.onLogOut(Url);
  }
  OnGoHome() {
    const Home = {
      "IsLeftNav": false
    }
    this.LeftNavHomeEmitter.emit(Home);
    this.PSCRoute.navigate(['NavigationPage']);
  }
}
