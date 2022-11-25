import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss']
})
export class SearchedProductsComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { 
  }
  searchedTitle:any
  routeSub: any;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.searchedTitle = this.route.snapshot.paramMap.get('msg');
      console.log(this.searchedTitle);
      this.searchByTitle(this.searchedTitle)
    });
  }

  //for products
  products?: Product[]
  currentProduct: Product = {}
  searchedProducts?: any
  currentIndex = -1
  //title = ''


  searchByTitle(title:string): void {
    this.currentIndex = -1
    this.currentProduct = {}

    this.productService.findByTitle(this.searchedTitle)
      .subscribe({
        next: (data) => {
          //console.log(this.searchedTitle);
          this.searchedProducts = data
          console.log(this.searchedProducts?.length);
          //console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentIndex = index
    this.currentProduct = product
    console.log(index, product.id);
  }

}
