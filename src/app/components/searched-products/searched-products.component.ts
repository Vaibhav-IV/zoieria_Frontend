import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


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
    this.getProductImages()
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

  productImages?: Image[] = []
  imageSrc = '../../../assets/img/modernJwel.jpeg';
  getProductImages(): void {
    console.log("usdhucyhsadocjiadbc98hdc aso9dhhsd voiHSD IU");
    this.productService.getAllImages()
      .subscribe({
        next: (data) => {
          this.productImages = data
          console.log(this.productImages, "udhc98hdou80dvshds oiDVH");
          this.imageSrc = this.productImages[0].name!;
          console.log(this.imageSrc);
        }
      })
  }


  
  isPrevious: boolean = false;
  isNext: boolean = false;

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  previousStep()
  {
      this.isPrevious = true;
      this.carousel.prev();
  }

  nextStep()
  {
      this.isNext = true;
      this.carousel.next();

  }

}
