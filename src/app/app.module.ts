import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './shared/contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsComponent } from './views/products/products.component';
import { AboutComponent } from './views/about/about.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { WeddingComponent } from './views/wedding/wedding.component';
import { EventsComponent } from './views/events/events.component';
import { ClientsComponent } from './shared/clients/clients.component';
import { ProductComponent } from './views/product/product.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ContactComponent,
    FooterComponent,
    ProductsComponent,
    AboutComponent,
    LoadingComponent,
    WeddingComponent,
    EventsComponent,
    ClientsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
