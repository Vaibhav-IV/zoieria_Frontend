import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  constructor(private productService: ProductService,
    private http: HttpClient,
    private categoryServices: CategoryService) { }


  //for category
  category?: Category[]

  product: Product = {
    title: '',
    description: '',
    cost: 10,
    published: false,
    categoryId: 1
  };
  submitted = false

  ngOnInit(): void {
    this.retrieveCategory()
  }

  saveProduct(): void {
    const data = {
      title: this.product.title,
      description: this.product.description,
      cost: this.product.cost,
      published: this.product.published,
      categoryId: this.product.categoryId,
    }

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      })
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      title: '',
      description: '',
      cost: 10,
      published: false,
      categoryId: undefined
    };
  }

  retrieveCategory(): void {
    this.categoryServices.getAll()
      .subscribe({
        next: (data) => {
          this.category = data
          console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

}
