import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs'

import { Category } from '../models/Category';
import { ErrorHandlerService } from './error-handler.service';

const baseUrl = "http://localhost:3000/admin/category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }


    getAll(): Observable<Category[]> {
      return this.http.get<Category[]>(baseUrl)
        .pipe(
          tap((_) => console.log("fetched Categories")),
          catchError(
            this.errorHandlerService.handleError<Category[]>("FetchALl error in services", [])
          ));
    }
  
    get(id: any): Observable<any> {
      return this.http.get(`${baseUrl}/${id}`)
        .pipe(
          tap((_) => console.log("fetched a Category")),
          catchError(
            this.errorHandlerService.handleError<Category[]>("Fetching a single Category error in services", [])
          ));
    }
  
    findById(id: any): Observable<Category[]> {
      return this.http.get<Category[]>(`${baseUrl}/${id}`)         //`${baseUrl}?title=${title}`
        .pipe(
          tap((_) => console.log("fetched searched Category by id")),
          catchError(
            this.errorHandlerService.handleError<Category[]>("Fetch searched error in services by id", [])
          ));
    }


    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data)
      .pipe(
        tap((_) => console.log("Category Created")),
        catchError(
          this.errorHandlerService.handleError<Category[]>("Category error in services")
        )
      )
    }
  
    update(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}/${id}`, data)
      .pipe(
        tap((_) => console.log("Category Upated")),
        catchError(
          this.errorHandlerService.handleError<Category[]>("Craete error in services")
        )
      )
    }
  
    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrl}/${id}`)
      .pipe(
        tap((_) => console.log("Single Category Deleted")),
        catchError(
          this.errorHandlerService.handleError<Category[]>("Craete error in services")
        )
      )
    }

}
