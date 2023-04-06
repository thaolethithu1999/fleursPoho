import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoginComponent } from './shared/login/login.component';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { WeddingComponent } from './views/wedding/wedding.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'pages/about', component: AboutComponent },
  { path: 'collections/flowers-plants', component: ProductsComponent},
  { path: 'pages/wedding', component: WeddingComponent}
  //{ path: 'loading', component: LoadingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
