import { Component, OnInit } from '@angular/core';

import {  MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {  MatDialog } from '@angular/material/dialog';

import { PlatService } from '../../Services/plat/plat.service';
import { PlatModule } from '../../Models/plat/plat.module';
import { Order} from '../../Models/order/order.model';
//danger import { AdminService } from '../../Services/admin/admin.service';
import { SellerService } from '../../Services/seller/seller.service'; //danger
import { TokenService } from '../../Services/token/token.service';


interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {

  constructor(private service: PlatService ,private sellerservice:SellerService ,private dialog: MatDialog,
    private matSnackBar: MatSnackBar,private sellerService:PlatService

) { }



platSearch: any;
name: string = null;
plats: any;
status: string;
orderedPlats: any;
orderdetails = new Array<any>();

animalControl = new FormControl('', Validators.required);
selectFormControl = new FormControl('', Validators.required);
selectedValue: string;

role:string;

//danger isAdmin:boolean=false;          /////   /////////////////////
isSeller:boolean=false;         //////////////////////////////////



ngOnInit(): void {

  this.role = localStorage.getItem('role');


/////////////////////////////////////
 /*danger
  if(this.role==='admin'){
    this.isAdmin=true;
    this.isSeller=false;
    this.getallUserOrderedPlats();}*/



//////////////////////////////////////////////
   if(this.role==='seller'){
    this.isSeller=true;
    this.getallUserOrderedPlats();
  }




 ///////////////////////////////////////////////////////////////////
 this.sellerservice.autoRefresh$.subscribe(() => {
    if(this.role==='seller'){
      this.getallUserOrderedPlats();
    }

    /* danger
    else if(this.role==='seller'){
      this.getallUserOrderedPlats();
    }
    **/
 });
  
}






getallUserOrderedPlats() {

  console.log('order status api called');
  this.sellerservice.getAllOrderedPlats().subscribe( response => {
  this.orderedPlats = response.obj;
  console.log('All orderbooks for order status= :  ', this.orderedPlats);
  console.log("no of orders "+response.obj.length);

  for (let i = 0; i < response.obj.length; i++) {
    console.log ("Block statement execution no." + i);
    console.log("orderId : "+response.obj[i].orderId);
    console.log("orderStatus : "+response.obj[i].orderStatus);
    console.log("platName : "+response.obj[i].platsList[0].platName);
    console.log("platDescription : "+response.obj[i].platsList[0].platDescription);
    console.log("chefName : "+response.obj[i].platsList[0].chefName);
    console.log("image : "+response.obj[i].platsList[0].image);
    console.log("platprice : "+response.obj[i].platsList[0].price);
    console.log("totalprice : "+response.obj[i].quantityOfPlats[0].totalprice);
    console.log("quantityOfPlat : "+response.obj[i].quantityOfPlats[0].quantityOfPlat);


    var p = {orderId:response.obj[i].orderId, orderStatus:response.obj[i].orderStatus, platName:response.obj[i].platsList[0].platName,
      platDescription:response.obj[i].platsList[0].platDescription, chefName:response.obj[i].platsList[0].chefName,
      image:response.obj[i].platsList[0].image,  totalprice:response.obj[i].quantityOfPlats[0].totalprice,
      quantityOfPlat:response.obj[i].quantityOfPlats[0].quantityOfPlat
    };

      this.orderdetails.push(p);
      console.log("after push ",this.orderdetails);
  }  
  });
}




no:any;

////////////////////////////////////////////////////////////

 /**modification de la commande par l'admin *
 /** 
  * danger
updateOrderAdmin(orderId:any,status:any) {
  console.log('Order Id',orderId);
  console.log('Order status',status);  
  this.adminservice.updateOrderStatus(orderId,status).subscribe(
    (response: any) => {
      this.matSnackBar.open("Order updated by Admin", 'success', {duration: 5000});
      
      },
    (error: any) => {
      this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
    }
  );
}
**/
///////////////////////////////////////////////////////////////////

 /**modification de la commande par le seller */
updateOrderSeller(orderId:any,status:any) {
  console.log('Order Id',orderId);
  console.log('Order status',status);  
  this.sellerservice.updateOrderStatus(orderId,status).subscribe(
    (response: any) => {
      this.matSnackBar.open("Order updated by Seller", 'success', {duration: 5000});
      
      },
    (error: any) => {
      this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
    }
  );
}


  
}
