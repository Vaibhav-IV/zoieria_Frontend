import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchedProductsComponent } from './components/searched-products/searched-products.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { AuthGuardGuard } from './services/auth-guard.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },  //add home here
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardGuard] }, //here all the crud op will be performed
  { path: ':id', component: ViewProductComponent, canActivate: [AuthGuardGuard] },
  { path: 'home/:id', component: ProductPageComponent }, //add home hee=re as well
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/userProfile', component: UserProfileComponent },
  { path: 'product/category/:id', component: CategoryProductsComponent },
  { path: 'products/searchedProducts/:msg', component: SearchedProductsComponent },
  { path: 'admin/products/analysis', component: AnalysisComponent },
  { path: 'user/cart',component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
