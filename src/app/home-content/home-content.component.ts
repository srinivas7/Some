import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { CarouselConfig} from 'ngx-bootstrap/carousel';
import {LocalStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css'],
  providers:[{provide: CarouselConfig, useValue: {interval:4000, noPause: true}}]  
})
export class HomeContentComponent implements OnInit {
  ImageArray: Array<any>;
  ImageUrl:{debt:string,hrsa:string, Higlas:string, Pheaa:string, Cms:string, c:string, collection:string,
            paid:string, flowchart:string, top: string, sallemie:string, doj:string};
  constructor(private PSCLocalStorage:LocalStorageService) { }

  ngOnInit() {     
    this.ImageUrl = {
        'debt': 'assets/images/Debt.JPG',
        'hrsa': 'assets/images/HRSA.jpg',
        'Higlas': 'assets/images/HIGLAS.jpg',
        'Pheaa': 'assets/images/PHEAA.png',
        'Cms': 'assets/images/CMS.jpeg',
        'c': 'assets/images/1099-C.jpg',
        'collection': 'assets/images/collection-agencies.JPG',
        'paid': 'assets/images/PAID DEBTS.jpg',
        'flowchart': 'assets/images/Flowchart.png',
        'top': 'assets/images/treasury.PNG',
        'sallemie': 'assets/images/Sallemie.jpg',
        'doj': 'assets/images/doj_color.JPG',
      };
  }
}