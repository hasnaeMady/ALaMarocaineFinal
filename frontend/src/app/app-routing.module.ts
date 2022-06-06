import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './Component/dashboard/dashboard.component';


import { SellerComponent } from './Component/seller/seller/seller.component';

import { RegistrationComponent } from './Component/auth/registration/registration.component';
import { LoginComponentComponent } from './Component/auth/login-component/login-component.component';
import { ForgetPasswordComponent } from './Component/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Component/auth/reset-password/reset-password.component';


import { CartComponent } from './Component/cart/cart.component';
import { OrdergreetingComponent } from './Component/ordergreeting/ordergreeting.component';
import { GiverateComponent } from './Component/giverate/giverate.component';



import { RatereviewComponent } from './Component/ratereview/ratereview.component';
import { OrderstatusComponent } from './Component/orderstatus/orderstatus.component';
import { RatedplatsComponent } from './Component/ratedplats/ratedplats.component';
import { PlatreviewsComponent } from './Component/platreviews/platreviews/platreviews.component';


import { WishComponent } from './Component/wish/wish.component';

import { PagenotfoundComponent } from './Component/pagenotfound/pagenotfound.component';
import { HomeComponent } from './Component/home/home.component';
import { HomeClientComponent } from './Component/home-client/home-client.component';

import { HomeSellerComponent } from './Component/home-seller/home-seller.component';
import { CandidatureComponent } from './Component/home/candidature/candidature.component'; 
import { ChefDeSemaineComponent } from './Component/home/chef-de-semaine/chef-de-semaine.component';

import {CandidaturesSellerComponent } from './Component/home-seller/candidatures-seller/candidatures-seller.component';






const routes: Routes = [

  {
    path: '', redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent},
  {path: 'home-client', component: HomeClientComponent},

  {path: 'plats', component: DashboardComponent},
  {path: 'plats/rateandreview/:platId', component: GiverateComponent},
  {path: 'plats/:plat', component: SellerComponent},
  {path: 'plats/rateandreview/:platId/:token', component: GiverateComponent},
  {path: 'plats/info/:platId', component: RatereviewComponent},
  {path: 'plats/reviews/:platId', component: RatereviewComponent},
  {path: 'plats/orders', component: OrderstatusComponent},
  {path: 'ratedplats', component: RatedplatsComponent},
  {path: 'platreviews', component: PlatreviewsComponent},
  {path: 'orders', component: OrderstatusComponent},







   
  {path: 'cart', component: CartComponent},
  {path: 'greeting', component: OrdergreetingComponent},
  {path: 'wish', component: WishComponent},

  {path: 'update-password/:token', component: ResetPasswordComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'login', component: LoginComponentComponent},
  {path: 'register', component: RegistrationComponent},


  {path: 'seller', component: SellerComponent}, 

  
   {path: '**', component: PagenotfoundComponent},
   {path: 'candidature', component: CandidatureComponent},

   {path: 'home-seller', component: HomeSellerComponent} , 
    
   {path: 'candidatures-seller', component: CandidaturesSellerComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
