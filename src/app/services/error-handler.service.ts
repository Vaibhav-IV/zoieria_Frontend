import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  //here T will be the product array like if we get empty product rray it will handle this error as well as 
  // we'll also knw which opeation caused it
  handleError<T>(operation="operation",result?:T){
    return (error:any) : Observable<T> =>{
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
