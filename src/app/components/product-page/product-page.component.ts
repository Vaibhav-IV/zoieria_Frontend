import { Component, OnInit, Input } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/models/Product';
import { Image } from 'src/app/models/image';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/cart-item';
import { ShopService } from 'src/app/services/shop.service';
import { StorageService } from 'src/app/services/storage.service';

const imgSRC = "./../../../../assets/img"

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

  productImages?: Image[] = []

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private shopService: ShopService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.currentid = this.route.snapshot.paramMap.get('id');
      this.getProduct(this.currentid);      
      this.getProductImages(this.currentid)
    });
  }


  getProduct(id: String): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          //particular product data
          this.currentProduct = data;
          console.log(this.currentProduct);
          //passing cat id of that particular data
          this.getRelatedProducts(this.currentProduct.categoryId)
        },
        error: (e) => console.error(e)
      })
  }

  getProductImages(id: any): void {
    console.log("usdhucyhsadocjiadbc98hdc aso9dhhsd voiHSD IU", id);
    this.productService.getImages(id)
      .subscribe({
        next: (data) => {
          this.productImages = data
          console.log(this.productImages, "udhc98hdou80dvshds oiDVH");
          this.imageSrc = this.productImages[0].name!;
          console.log(this.imageSrc);

          for (let j = 1; j < this.productImages.length; j++) {
            this.imageButtons = [{ src: `${imgSRC}/${this.productImages[j].name}` }]
            console.log(this.imageButtons, "suhviuhsfvoijsovjisudhf87abguh");

          }

        }
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
  imageButtons = [
    { src: '../../../assets/img/necklase2.jpg' },
    { src: '../../../assets/img/necklase3.jpeg' },
    { src: '../../../assets/img/rings.jpg' }] //{ src: `${imgSRC}/${this.productImages[0].name}` }

  onClick(imageNameObject: any) {
    this.imageSrc = imageNameObject.src;
  }

  //end of displaying images

  cart: CartItem = {
    quantity: ''
  };

  //add to cart
  uid = this.storageService.getUser();
  id = this.uid.id

  addToCart(): void {
    const data = {
      quantity: this.cart.quantity,
      productId : parseInt(this.currentid)
    }

    console.log(data,"ajhciuhdiuc",this.id);

    this.shopService.addProductToCart(data, this.id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      })
  }

}
