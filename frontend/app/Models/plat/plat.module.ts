import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PlatModule {
  [x: string]: any;

  platId: number; //plat_id
  PlatModule: string;//n'existe
  platDescription: string;//plat_description
  chefName: string; //chef_name
  platName: string;//plat_name
  price: number; //price
  noOfPlats: number;//no_of_plats
  image: string;//image
  createdDateAndTime: Date; //created_date_time
  status: string;//status
  // updated_date_and_time
  // user_id 

 }

 //les colonnes associés à la table "plat"
