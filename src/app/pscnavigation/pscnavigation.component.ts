import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-pscnavigation',
  templateUrl: './pscnavigation.component.html',
  styleUrls: ['./pscnavigation.component.css']
})
export class PscnavigationComponent implements OnInit {

  constructor(private PSCRouter:Router, private PSCLocalStorage: LocalStorageService) { }
  
 IsLeftNav:boolean = false;
  ngOnInit() {    
   
    if(this.PSCRouter.url === "/NavigationPage/systemadministration"){
     this.IsLeftNav = true;
   }else{
      this.IsLeftNav = false;
    } 
   
       
//    console.log(this.PSCRouter.url);
  }
  OnBrowserClose(){
    const Message = "Are you sure want to close the window";
    return Message;
  }
  OnSysAdmin($event){
  this.IsLeftNav = $event.IsLeftNav;
  }
  OnHome($event){
    this.IsLeftNav = $event.IsLeftNav;
  }

}
