import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarModule } from '@angular/material/snack-bar';



import { PlatModule } from '../../Models/plat/plat.module';
import { Customer } from '../../Models/customer/customer.model';
import { Address } from '../../Models/address/address.model';


import { UserService } from '../../Services/user/user.service';
import { OrderService } from '../../Services/order/order.service';
import { PlatService } from '../../Services/plat/plat.service';
import { CartService } from '../../Services/cart/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {


  constructor( private matSnackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private route: Router,
               private service: PlatService,
               private cartService: CartService,
               private userService: UserService,
               private orderService: OrderService) { }


  selected = false;
  isLinear = false;
  customerForm: FormGroup;
  error: null;
  plat = [];
  plats: PlatModule = new PlatModule();
  public isLoading = false;
  items = [];
  size: number;
  valueChanged = false;
  // tslint:disable-next-line: variable-name
  plat_id: number;
  platSearch: any;
  platName: string;
  length: any = sessionStorage.length;
  si: any = sessionStorage.length;
  value: any = [];
  UserId: number;
  objecrtArry: any = [];
  quantity = 1;
  customer: Customer = new Customer();
  userAdreessDetails: Address = new Address();
  type = 'home';
  bid: any;
  user: number;
  num = 2;
  selectedtype: any;
  adressId: any;




  @Output() output: EventEmitter<any> = new EventEmitter();

    select = false;
    addre: Address = new Address();
    phoneNumber = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,10}')]);
    Name = new FormControl('', [Validators.required]);
    pincode = new FormControl('', [Validators.required]);
    address = new FormControl('', [Validators.required]);
    locality = new FormControl('', [Validators.required]);
    city = new FormControl('', [Validators.required]);
    landmark = new FormControl('', [Validators.required]);
    Home = new FormControl('', [Validators.required]);
    Work = new FormControl('', [Validators.required]);
    Other = new FormControl('', [Validators.required]);
    platQuantityDetails = {
      eachPrice: null,
      quantityId: null,
      quantityOfPlat : null};



  ngOnInit()  {
   this.getsession();
   this.cartService.autoRefresh$.subscribe(() => {
    this.getCartItemCount();
    this. platsFromCart();
  });
   this.fun(this.type);
   this.getCartItemCount();
   this. platsFromCart();
  }


   //Obtenir le nombre d items dans le panier
  getCartItemCount() {
    this.cartService.getCartItemCount().subscribe((response: any) => {
      this.length = response.obj;
      console.log('total number of itemes are' + response.obj);
     });
  }


  platsFromCart() {
      this.cartService.getCartPlatsFrom().subscribe((Response) => {

        console.log('response of cart books' , Response.obj);
        console.log('books are ', this.plat);

        this.plat= Response.obj;

        console.log('response from cat', Response.obj[0].quantityOfPlat[0].quantityOfPlat);

        for (const i of this.plat) {
          console.log('vikash', i.quantityOfPlat[0].quantityOfPlat);

          this.quantity = i.quantityOfPlat[0].quantityOfPlat;
        }
    });
  }


  //Incrémenter la quantité  du plat
  increaseQuantity(platId: any , quantityDeatils: any) {
    console.log('increasing items ');
    console.log('Quatity Details', quantityDeatils);

    this.platQuantityDetails.quantityId = quantityDeatils.quantity_id;
    this.platQuantityDetails.eachPrice = quantityDeatils.totalprice / quantityDeatils.quantityOfplat;
    this.platQuantityDetails.quantityOfPlat = quantityDeatils.quantityOfPlat;
    this.cartService.increasePlatsQuantity(platId, this.platQuantityDetails).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error));


    console.log('Plat id' + platId);
  }

  //Decrémenter la quantité du plat
  DecreseQuantity(platId: any , quantityDeatils: any) {
    console.log('decreasing items ');
    console.log('Quatity Details', quantityDeatils);

    this.platQuantityDetails.quantityId = quantityDeatils.quantity_id;
    this.platQuantityDetails.eachPrice = quantityDeatils.totalprice / quantityDeatils.quantityOfPlat;
    this.platQuantityDetails.quantityOfPlat = quantityDeatils.quantityOfPlat;
    this.cartService.decreasePlatsQuantity(platId, this.platQuantityDetails).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );


    console.log('Plat id' + platId);
  }



  // supprimer un item du panier

  Removecart(key) {
    this.cartService.removeIteamFromCart(key).subscribe((Response) => {
      console.log('removing plat', Response);
    });
    sessionStorage.removeItem(key);
    console.log('removinf plat id is: ', key);
  }




  handleResponse(data: any): void {
    this.isLoading = false;
    console.log(data);
    this.matSnackBar.open(data.message , 'ok', {duration: 5000});
  }

  handleError(error: any) {
    this.isLoading = false;
    this.error = error.error.message;
    console.log(error);
    console.log('error', this.error);
    this.matSnackBar.open(this.error, 'ok', { duration: 5000});
  }

  //obtenir l'addresse du client

  getUserAdress() {
    this.userService.getAdress().subscribe((Response) => {

      console.log('address', Response);

      for (const i of Response.obj) {

        if (i.addressType === 'home' && this.selectedtype === 'home') {
          this.setAddresToInput(i);
          console.log('user adress Of Home : ', i);
          this.adressId = i.addressId;


        } else if (i.addressType === 'work' && this.selectedtype === 'work') {
          this.setAddresToInput(i);
          console.log('user adress Of wokr : ', i);
          this.adressId = i.addressId;


        } else if (i.addressType === 'other' && this.selectedtype === 'other') {
          this.setAddresToInput(i);
          console.log('user adress Of wokr : ', i);
          this.adressId = i.addressId;
        }
      }


    });
  }


  setAddresToInput(adressuser: Address) {
    this.Name.setValue(adressuser.name);
    this.phoneNumber.setValue(adressuser.phoneNumber);
    this.pincode.setValue(adressuser.pincode);
    this.locality.setValue(adressuser.locality);
    this.address.setValue(adressuser.address);
    this.city.setValue(adressuser.city);
    this.landmark.setValue(adressuser.landmark);
    this.phoneNumber.setValue(adressuser.phoneNumber);
  }
 

  addAdress() {
    this.addre.name = this.Name.value;
    console.log('adding adress is ', this.addre);
  }

   //cette fonction n'est pas utilisée dans ce fichier mais ds cart.component.html pour bouton CONTINUER: Mon panier
  Toggle() {
  if ( this.select === false) {
    this.select = true;
  } else if ( this.select === true) {
    this.select = false;
   }
  }

 //cette fonction n'est pas utilisée dans ce fichier mais ds cart.component.html pour bouton CONTINUER: Details Client
 tog() {
  if ( this.selected === false) {
    this.selected = true;
  } else if ( this.selected === true) {
    this.selected = false;
  }
  }

  
 getsession() {
    for (let i = 0; i < sessionStorage.length; i++) {
     const key = sessionStorage.key(i);
     this.value[i] = sessionStorage.getItem(key);
     console.log('key', key);
    }

}

//liée au type de lieu d'adresse du client
fun(type) {
  this.selectedtype = type;
  this.addre.name = (localStorage.getItem('Name'));
  this.addre.phoneNumber = (localStorage.getItem('phone'));

  this.adressId = null;
  this.setAddresToInput(this.addre);
  this.getUserAdress();
  console.log('select item is ' + type);
}


addtcart( user: any) {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    this.value[i] = sessionStorage.getItem(key);
    console.log('key', key);
    console.log('ghgvvb=====' + user);
    console.log('---' + this.bid);
}
}


//liée au bouton "commander" se trouvant le récapitulatif de la commande
placeOrder(bookId: any) {
  this.isLoading = true;
  console.log('place order', bookId);
  console.log('Address', this.address.value);
  this.orderService.placeOrder(bookId, this.adressId).subscribe(
    data => this.handleResponseOfPlaceOrder(data),
    error => this.handleError(error));
  
}


handleResponseOfPlaceOrder(data: any): void {
    this.isLoading = false;
    console.log('data', data);
    sessionStorage.removeItem(data.obj.platsList[0].platId);
    this.matSnackBar.open(data.message , 'ok', {duration: 5000});
    this.route.navigateByUrl('greeting');
}


 //liée au bouton CONTINUER de la partie Détails client
OnRegisterSubmit() {
  this.addre.name = this.Name.value;
  this.addre.locality = this.locality.value;
  this.addre.address = this.address.value;
  this.addre.pincode = this.pincode.value;
  this.addre.phoneNumber = this.phoneNumber.value;
  this.addre.city = this.city.value;
  this.addre.landmark = this.landmark.value;
  if (this.adressId === null || this.adressId === undefined) {
    this.addre.type = this.selectedtype;
    console.log('adress is going to upadted is ' + this.addre);
    this.userService.addAdress(this.addre).subscribe((Response) => {
    console.log('adress address', Response);
    window.location.reload();
  });
 } else {
  this.addre.addressType = this.selectedtype;
  console.log('adress type is selected' ,   this.addre.addressType );
  this.addre.addressId = this.adressId;
  console.log('adress is going to upadted is ', this.addre);
  this.userService.updateAdress(this.addre).subscribe((Response) => {
     console.log('address updated', Response);
   });
 }
}


}
