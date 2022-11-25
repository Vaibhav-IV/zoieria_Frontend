import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute, Router } from '@angular/router';


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Product ={
    title: '',
    description:'',
    cost: 10,
    image: '',
    published:false
  }

  message = ''

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(!this.viewMode){
      this.message = ''
      this.getProduct(this.route.snapshot.params["id"])
    }
  }

  getProduct(id:string): void{
    this.productService.get(id)
    .subscribe({
      next: (data) =>{
        this.currentProduct = data
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateProduct():void{
    this.message = ''

    this.productService.update(this.currentProduct.id,this.currentProduct)
    .subscribe({
      next: (res) =>{
        console.log(res);
        this.message = res.message ? res.message: 'This product has been updated sucesfully'
        this.openSnackBar()
      },
      complete() {

      },
      error: (e) => console.error(e)
    })
  }

  deleteProduct():void{
    this.productService.delete(this.currentProduct.id)
    .subscribe({
      next: (res)=>{
        console.log(res);
        this.openSnackBar()
        this.router.navigate(['/admin/products'])
        //this.retrieveProducts()
      },
      error: (e) => console.error(e)
    })
  }

  // products?: Product[]
  // retrieveProducts():void{
  //   this.productService.getAll()
  //   .subscribe({
  //     next:(data) =>{
  //       this.products = data
  //       console.log(data);
  //     },
  //     error: (e) => console.error(e)
  //   })
  // }


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('Operation succesfull!!', 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.router.navigate(['/admin/products'])
  }
}
