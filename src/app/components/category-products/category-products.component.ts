import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {

  routeSub: any;
  currentid: any

  currentProduct: Product = {}
  currentIndex = -1
  products: any;  

  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }


    ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.currentid = this.route.snapshot.paramMap.get('id');
        // console.log(params) //log the entire params object
        // console.log(params['id']) //log the value of id
        // console.log(this.currentid);
        this.getCatProduct(this.currentid)
      });
    }

    getCatProduct(id:any):void{
      this.productService.getByCat(id)
      .subscribe({
        next: (data) =>{
          this.products = data;
          console.log((this.products));
        },
        error: (e) => console.error(e)
      })
    }
  
    setActiveProduct(product: Product, index: number): void {
      this.currentIndex = index
      this.currentProduct = product
      console.log(index, product);
    }

    //for carousel
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

    //end

}
