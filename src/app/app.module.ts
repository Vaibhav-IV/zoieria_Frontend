import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio'
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ImageSliderDirective } from './directives/image-slider.directive';
import { FooterComponent } from './components/footer/footer.component';
import { SearchedProductsComponent } from './components/searched-products/searched-products.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { CartComponent } from './components/cart/cart.component';
import { CongratsComponent } from './components/congrats/congrats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    AddProductDialogComponent,
    AdminProductsComponent,
    CarouselComponent,
    CategoryProductsComponent,
    DeleteConfirmDialogComponent,
    LoginComponent,
    ProductPageComponent,
    RegisterComponent,
    UserProfileComponent,
    ViewProductComponent,
    ImageSliderDirective,
    FooterComponent,
    SearchedProductsComponent,
    ChatbotComponent,
    AnalysisComponent,
    CartComponent,
    CongratsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatGridListModule,
    MatRadioModule,
    MatStepperModule,
    MatChipsModule,
    MatBadgeModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


//http://zoieria.madcraftfirm.com