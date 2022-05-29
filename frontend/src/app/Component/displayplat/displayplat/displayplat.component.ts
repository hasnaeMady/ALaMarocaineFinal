import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';


import { CartService } from '../../../Services/cart/cart.service';
import { WishlistService } from '../../../Services/wishlist/wishlist.service';
import { PlatService } from '../../../Services/plat/plat.service';
import { PlatModule } from '../../../Models/plat/plat.module';

@Component({
  selector: 'app-displayplat',
  templateUrl: './displayplat.component.html',
  styleUrls: ['./displayplat.component.scss']
})
export class DisplayplatComponent implements OnInit {


  platSearch: any;
  selectedValue = 'relevance';
  orderBy = 'asc';
  boo: any;

  error = null;

  platList = Array<any>();

  plat: PlatModule = new PlatModule();
  items = [];
  pageofItems: Array<PlatModule> = new Array<PlatModule>();
  
  obj: PlatModule[];
  size: number;
  // tslint:disable-next-line: variable-name
  plat_id: number;
  platName: string;
  page = 0;
  length: any = sessionStorage.length;
  pageEvent: PageEvent;
  lengths = 0;
  CurrentPageNo: 0;
  totalPage: Array<number>;

  s: any; selectoption: any;
  value: any = [];
  @Output() output: EventEmitter<any> = new EventEmitter();


  leng: any;


  constructor( private service: PlatService,
               private matSnackBar: MatSnackBar,
               private route: Router,
               private cartService: CartService,
               private wishlistService: WishlistService) { }





  ngOnInit() {
    this.getallApprovedPlats();
    this.getSearchPlatData();
    this.leng = sessionStorage.length;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      console.log('key ::' + key);
    }
    console.log(this.value);
  }




 
  onChange(deviceValue) {

    this.selectedValue = deviceValue;
    console.log(' this is tha value of drope down ' + deviceValue);

    switch (this.selectedValue) {
      case 'mod1':
         console.log('vikash kumar1');
         this.approvedPlatServiceMethod(this.page, 'price', 'des');
         console.log('Plats are from 1  ', this.platList);
         break;
      case 'mod2':
        this.approvedPlatServiceMethod(this.page, 'price', 'asc');
        console.log('Plats are from 2  ', this.platList);
        break;
      case 'mod3':
        this.approvedPlatServiceMethod(this.page, 'created_date_and_time', 'asc');
        console.log('Plats are from 3  ', this.platList);
        break;
    }
  }


    
  //Avoir tous les fichiers approuvés
  getallApprovedPlats() {
    this.approvedPlatServiceMethod(this.page, 'plat_id', 'asc');
  }



  approvedPlatServiceMethod(page ?: number, order?: string, sortby?: string) {
    this.service.getAllApprovedPlatByPage(page, order, sortby).subscribe((response: any) => {
      console.log(response);
      console.log('Plats are the' + response.obj);

      this.platList = response.obj.content;
      this.size = response.obj.totalElements;
      this.CurrentPageNo = response.obj.pageable.pageNumber;
      this.totalPage = new Array(response.obj.totalPages);


      console.log('Total pages is: ' + this.totalPage);
      console.log('total plats are ' + this.size);
      console.log('curret page number is ' + this.CurrentPageNo);
      console.log('Plats are  ', this.platList.length);

    });
  }



  getSearchPlatData() {
    this.service.getSearchPlatData().subscribe((message) => {
      console.log('search data', message.plats);
      this.platSearch = message.plats;
    });
  }



  SetPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    console.log('page number you want is' + i);
    this.getallApprovedPlats();
  }


  ///bouton previous:  <
   previos(event: any) {
    event.preventDefault();
    this.page = this.page - 1;
    this.getallApprovedPlats();
   }

   //bouton next: >
   next(event: any) {
    event.preventDefault();
    this.page = this.page + 1;
    this.getallApprovedPlats();
   }

   
  //ajouter au panier
  addtobag( platId: any) {
    if (localStorage.getItem('token') === null) {
    this.matSnackBar.open('Veuillez vous connecter', 'ok', {duration: 5000 });
    this.route.navigateByUrl('login');
    return;
    }
    sessionStorage.setItem(platId, platId);
    this.ngOnInit();
    this.cartService.addToCart(platId).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
    );
  }



handleResponse(data: any) {
    console.log(data);
    this.matSnackBar.open('Plat ajouté!' , 'ok', {duration: 5000 });
}


handleWishResponse(wishdata: any) {
  console.log(wishdata);
  this.matSnackBar.open('Plat est ajouté aux Favoris avec succès' , 'ok', {duration: 5000});
}


handleError(error: any) {
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(this.error, 'ok', {duration: 5000 });
}

getOutput() { }

Deatails(platId) {
    console.log('Redirected to page no ' + platId);
    this.route.navigateByUrl('plats/info/' + platId);

}


getUpdatedNotes(event) {
    this.ngOnInit();
}

addtoWish( platId: any) {
      if (localStorage.getItem('token') === null) {
        this.matSnackBar.open('Veuillez vous inscrire!', 'ok', {duration: 5000});
        this.route.navigateByUrl('login');
      }

      this.wishlistService.addToWishlist(platId).subscribe(
        wishdata => this.handleWishResponse(wishdata),
        error => this.handleError(error)
      );
    }
}
