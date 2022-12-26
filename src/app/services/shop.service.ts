import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

import { Product } from '../models/Product';
import { Image } from '../models/image';
import { Order } from '../models/Order';
import { OrderItem } from '../models/order-item';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/cart-item';

const baseUrl = "http://localhost:3000/user/cart/products"
const deletePrdURL = "http://localhost:3000/user/cart/delete/products"

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

    addProductToCart(data:any,id:any) : Observable<any>{
      return this.http.post(`${baseUrl}/${id}`,data) //add id here
      // .pipe(
      //   tap((_) => console.log("Product Added to cart succesfully")),
      //   catchError(
      //     this.errorHandlerService.handleError<Product[]>("adding to cart error in services")
      //   )
      // )
    }

    getCartProducts(id:any) : Observable<any>{
      return this.http.get(`${baseUrl}/${id}`) //add id here
      .pipe(
        tap((_) => console.log("Product received succesfully")),
        catchError(
          this.errorHandlerService.handleError<Product[]>("getting products of cart error in services")
        )
      )
    }

    deleteSingle(data:any,id:any) : Observable<any>{
      return this.http.post(`${deletePrdURL}/${id}`,data) //add id here
      .pipe(
        tap((_) => console.log("Product deleted to cart succesfully")),
        catchError(
          this.errorHandlerService.handleError<[]>("deleting to cart error in services")
        )
      )
    }

}
