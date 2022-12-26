import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ShopService } from 'src/app/services/shop.service';
import { StorageService } from 'src/app/services/storage.service';


import { MatDialog } from '@angular/material/dialog';
import { CongratsComponent } from '../congrats/congrats.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  len: number | undefined;

  totalcost: number | undefined;
  jj = 0
totalSum = 0

  constructor(private shopService: ShopService,
    private storageService: StorageService,
    public dialog: MatDialog) {
    this.getCartDetails()
  }

  allProducts?: Product[] = []
  quant?: []

  //getting user id
  uid = this.storageService.getUser();
  id = this.uid.id

  ngOnInit(): void {
    this.getCartDetails()
    //this.ngOnInit()
  }


getCartDetails(){
  this.shopService.getCartProducts(this.id)
    .subscribe({
      next: (data) => {
        console.log(data);
        
        this.allProducts = data.data
        this.quant = data.quantity
        this.len = this.allProducts?.length

        let totalcost = 0
        for(let i=0;i<data?.data?.length;i++){
          totalcost = data.data[i].cost*data.quantity[i]
          this.jj = this.jj + totalcost
          this.totalSum = this.jj + 60
        }
      }
    })
    
}

//len = this.allProducts?.length

//for selecting particular prd
currentIndex = -1
relCurrentProduct: Product = {}
prdId = 2

setActiveProduct(product: Product, index: number): void {
  this.currentIndex = index
    this.relCurrentProduct = product
    this.prdId = product.id
    console.log(index, product.id);
}

deleteSingle(){
  
  console.log(this.prdId, "isugviuioh7g");
  const data = {
    productId: this.prdId
  }
  console.log(data);
  this.shopService.deleteSingle(data, this.id)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    })
}

openDialog() {
  const dialogRef = this.dialog.open(CongratsComponent, {
    height: '600px',
    width: '450px',
  });
}

costMult():void{
  let totalCost = 0
  // for(var i=0;i<this.allProducts?.length;i++){

  // }
}


}
