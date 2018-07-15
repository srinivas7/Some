import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
let UniqueName:string = "";
@Pipe({
  name: 'pscUniqueIdentifier'
})  
export class PscUniqueIdentifierPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   if(UniqueName !== value){
    UniqueName = value;
     return UniqueName;
   }
    
  }

}
