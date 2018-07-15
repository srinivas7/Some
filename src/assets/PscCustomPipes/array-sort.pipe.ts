import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySort'
})
export class ArraySortPipe implements PipeTransform {

  transform(Array: any, x?: any): any {
     Array.sort((a: any, b: any) => {
      if ( a.statusCode< b.statusCode ){
        return -1;
      }else if( a.statusCode > b.statusCode){
          return 1;
      }else{
        return 0; 
      }
    });
    return Array;
  }

}
