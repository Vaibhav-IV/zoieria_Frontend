import { Component, OnInit, ViewChild } from '@angular/core';

import { Product } from 'src/app/models/Product';

import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  content?: string;

  constructor(private productService: ProductService,
    private userService: UserService,
    public dialog: MatDialog) { }

  products?: Product[]
  currentProduct: Product = {}
  currentIndex = -1
  title = ''
  publishedProducts?: Product[] = []

  ngOnInit(): void {
    this.retrieveProducts()

    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });

  }

  retrieveProducts(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data //initialized at line 17
          this.products.forEach((val, index) => {
            if (val.published == true && index < 4) {  //change no here to display things
              this.publishedProducts?.push(val)
            }
          })
        },
        error: (e) => console.error(e)
      })
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentIndex = index
    this.currentProduct = product
    console.log(index, product);
  }

  openchatBot() {
    const dialogRef = this.dialog.open(ChatbotComponent, {
      height: '500px',
      width: '380px',
    });
  }

}
