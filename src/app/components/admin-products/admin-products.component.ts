import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';

import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  //for products
  products?: Product[]
  searchedProduct?: any
  currentProduct: Product = {}
  searchedProducts?: any
  currentIndex = -1
  title = ''

  //for category
  category?: Category[]
  currentCategory: Category = {}
  searchedCategory?: any

  constructor(private productService: ProductService,
    private categoryServices:CategoryService,
    public dialog: MatDialog) {
    this.refreshList()
  }

  ngOnInit(): void {
    this.retrieveProducts()
    this.retrieveCategory()
  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data
          console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

  refreshList(): void {
    this.retrieveProducts();
    this.retrieveCategory();
    this.currentProduct = {}
    this.currentIndex = -1
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentIndex = index
    this.currentProduct = product
    console.log(index,product.id);
  }

  removeAllProducts(): void {
    this.productService.deleteAll()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.refreshList();
        },
        error: (e) => console.error(e)
      })
  }

  searchTitle(): void {
    this.currentIndex = -1
    this.currentProduct = {}
    this.productService.findById(this.title)
      .subscribe({
        next: (data) => {
          this.searchedProducts = data
          console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

  searchByTitle(): void {
    this.currentIndex = -1
    this.currentProduct = {}

    this.productService.findByTitle(this.title)
    .subscribe({
      next: (data) => {
        console.log(this.title);
        this.searchedProducts = data
        console.log(data);
      },
      error: (e) => console.error(e)
    })
}

  retrieveCategory(): void {
    this.categoryServices.getAll()
      .subscribe({
        next: (data) => {
          this.category = data //initialized at line 17
          console.log(data);
          //console.log(this.products);
          //console.log(Product);
        },
        complete:() =>{
        //this.ngOnInit();
        },
        error: (e) => console.error(e)
      })
  }

  setActiveCategory(category: Category, index: number): void {
    this.currentIndex = index
    this.currentProduct = category
    console.log(index,category.id);
  }

  searchTitleCategory(): void {
    this.currentIndex = -1
    this.currentCategory = {}
    //console.log(this.title);
    
    this.categoryServices.findById(this.title)
      .subscribe({
        next: (data) => {
          this.searchedCategory = data
          console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      height: '600px',
      width: '450px',
    });
  }

  openDeleteDialog() {
    const dialog = this.dialog.open(DeleteConfirmDialogComponent)
  }

}
