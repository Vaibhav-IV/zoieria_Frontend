import { Component, OnInit, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  routeSub: any;
  currentid: any

  @Input() currentProduct: Product = {
    title: '',
    description: '',
    cost: 10,
    published: false
  }

  currentIndex = -1
  relCurrentProduct: Product = {}
  products: any;  //saving related cat products here
  relatedProducts?: Product[] = []

  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.currentid = this.route.snapshot.paramMap.get('id');
      this.getProduct(this.currentid)
    });
  }


  getProduct(id: String): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          //particular product data
          this.currentProduct = data;
          console.log(data);
          //passing cat id of that particular data
          this.getRelatedProducts(this.currentProduct.categoryId)
        },
        error: (e) => console.error(e)
      })
  }

  getRelatedProducts(id: any): void {
    this.productService.getRelatedProducts(id)
      .subscribe({
        next: (data) => {
          this.relatedProducts = data
          console.log(this.relatedProducts);
        },
        error: (e) => console.error(e)
      })
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentIndex = index
    this.relCurrentProduct = product
    console.log(index, product);
  }


  //for displaying images

  imageSrc = '../../../assets/img/modernJwel.jpeg';
  imageButtons = [{ src: '../../../assets/img/necklace.jpg' },
                { src: '../../../assets/img/necklase2.jpg' }, 
                { src: '../../../assets/img/necklase3.jpeg' }, 
                { src: '../../../assets/img/rings.jpg' }]

  onClick(imageNameObject: any) {
    this.imageSrc = imageNameObject.src;
  }

  //end of displaying images

}
