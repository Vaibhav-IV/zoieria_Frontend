import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs'

import { Product } from '../models/Product';
import { Image } from '../models/image';
import { ErrorHandlerService } from './error-handler.service';

const baseUrl = "http://localhost:3000/admin/products"
const catBaseUrl = "http://localhost:3000/admin/products/productCategory"
const catRelBaseUrl =  "http://localhost:3000/admin/products/productCategory/related"
const baseSearchUrl = "http://localhost:3000/admin/products/search" 

const imgURL = "http://localhost:3000/imageProduct"
const allImgURL = "http://localhost:3000/images/all"

const wedURL = "http://localhost:3000/admin/products/cat/wedding"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   // httpOptions: { headers: HttpHeaders} = {
  //   headers: new HttpHeaders({"Content-Type": "application/json"})
  // }

  // constructor(private http: HttpClient,
  //   private errorHandlerService: ErrorHandlerService) { }

  //   //when the 'get' request is made we can 'tap' into it and if error occurs we can handle error in services
  //   //here in errorhandler service FtechAll is the operation we mentioned earlier in service method and 
  //   // and it will return empty array (coz we want to return empty array)
  // fetchAll(): Observable<Product[]> {
  //   return this.http
  //     .get<Product[]>(this.url, { responseType: "json" })
  //     .pipe(
  //       tap((_) => console.log('fetched Products')),
  //       catchError(
  //         this.errorHandlerService.handleError<Product[]>("fetchAll error in services", [])
  //       ));
  // }


  // post(productInputName:Partial<Product>): Observable<any>{
  //   return this.http.post<Partial<Product>>(this.url,productInputName,this.httpOptions).pipe(
  //     catchError(
  //       this.errorHandlerService.handleError<any[]>("Post error in services")
  //     )
  //   )
  // }

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl)
      .pipe(
        tap((_) => console.log("fetched products")),
        catchError(
          this.errorHandlerService.handleError<Product[]>("FetchALl error in services", [])
        ));
  }

  getImages(id:any): Observable<Image[]> {
    return this.http.get<Image[]>(`${imgURL}/${id}`)   //change baseURL here
  }

  getAllImages(): Observable<Image[]>{
    return this.http.get<Image[]>(`${allImgURL}`) 
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`)
      .pipe(
        tap((_) => console.log("fetched a product")),
        catchError(
          this.errorHandlerService.handleError<Product[]>("Fetching a single product error in services", [])
        ));
  }

  getByCat(id:any): Observable<any>{
    return this.http.get<Product[]>(`${catBaseUrl}/${id}`)
    .pipe(
      tap((_) => console.log("fetched products by categories")),
      catchError(
        this.errorHandlerService.handleError<Product[]>("getBycat error in services", [])
      ));
  }

  getRelatedProducts(id:any): Observable<any>{
    return this.http.get<Product[]>(`${catRelBaseUrl}/${id}`)
    .pipe(
      tap((_) => console.log("fetched products by categories related")),
      catchError(
        this.errorHandlerService.handleError<Product[]>("getBycat error in services", [])
      ));
  }

  getWeddingProducts():Observable<any>{
    return this.http.get<Product[]>(wedURL)
  }

  findById(id: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/${id}`)         //`${baseUrl}?title=${title}`
      .pipe(
        tap((_) => console.log("fetched searched product by id")),
        catchError(
          this.errorHandlerService.handleError<Product[]>("Fetch searched error in services by id", [])
        ));
  }

  findByTitle(title: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseSearchUrl}/${title}`)         //`${baseUrl}?title=${title}`
      .pipe(
        tap((_) => console.log("fetched searched product by title")),
        catchError(
          this.errorHandlerService.handleError<Product[]>("Fetch searched error in services by title", [])
        ));
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data)
    .pipe(
      tap((_) => console.log("Product Created")),
      catchError(
        this.errorHandlerService.handleError<Product[]>("Craete error in services")
      )
    )
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data)
    .pipe(
      tap((_) => console.log("Product Upated")),
      catchError(
        this.errorHandlerService.handleError<Product[]>("Craete error in services")
      )
    )
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
    .pipe(
      tap((_) => console.log("Single Product Deleted")),
      catchError(
        this.errorHandlerService.handleError<Product[]>("Craete error in services")
      )
    )
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl)
    .pipe(
      tap((_) => console.log("All Products deleted")),
      catchError(
        this.errorHandlerService.handleError<Product[]>("Craete error in services")
      )
    )
  }
}
