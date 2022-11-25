import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})


export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter

  //for displaying username
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  isAdminVar = false;

  constructor(private categoryServices: CategoryService,
    private storageService: StorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveCategory()
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      console.log(user.roles);
      
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;

      this.isAdminVar = this.storageService.isAdmin()
  
    }
  }

  onSidenavClose() {
    this.sidenavClose.emit()
  }


  //for category
  category?: Category[]
  currentCategory: Category = {}
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

  setActiveCategory(category: Category, index: number): void {
    this.currentIndex = index
    this.currentCategory = category
    console.log(index, category.id);
  }

 
    

}
