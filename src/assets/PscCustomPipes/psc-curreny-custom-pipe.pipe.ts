import { Pipe, PipeTransform, Injectable } from '@angular/core';
Injectable();
@Pipe({
  name: 'pscCurrenyCustomPipe'
})
export class PscCurrenyCustomPipePipe implements PipeTransform {

  transform(value:number, before:string): any {
    if(value){
     let currencyval = (value * 1).toPrecision(5);      
     let Currency = `${before} ${currencyval}`;
     return Currency;
    }
  }

}
