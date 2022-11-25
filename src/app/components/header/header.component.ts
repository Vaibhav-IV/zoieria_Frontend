import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  //for displaying username
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  isAd = false
  isUs = false

  searchedTitle!: ''

  constructor(private categoryServices: CategoryService,
    private storageService: StorageService,
     private authService: AuthService,
     private router : Router) { }

     ngOnInit(): void {
    
      this.retrieveCategory()
      this.isLoggedIn = this.storageService.isLoggedIn();
  
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
  
        this.isAd = this.storageService.isAdmin();
        this.isUs = this.storageService.isUser();
        this.username = user.username;
      }
    }


    sendData(){
      this.router.navigate(['products/searchedProducts/'+ this.searchedTitle])
    }

  
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        console.log("odnd");
        
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onToggleSidenav(){
    this.sidenavToggle.emit()
  }

    //for category
    category?: Category[]
    currentCategory: Category = {}
    searchedCategory?: any
    currentIndex = -1
    dropcat: Category[] = []
  
    retrieveCategory() {
      this.categoryServices.getAll()
        .subscribe({
          next: (data) => {
            this.category = data;
            console.log(data);
            this.dropcat = this.category
          },
          error: (e) => console.error(e)
        })
        
    }
  
    refreshList(): void {
      this.retrieveCategory();
      this.currentCategory = {}
      this.currentIndex = -1
    }
  
    setActiveCategory(category: Category, index: number): void {
      this.currentIndex = index
      this.currentCategory = category
      console.log(index, category.id);
    }

}
