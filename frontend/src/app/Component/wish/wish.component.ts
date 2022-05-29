import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist/wishlist.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../Services/cart/cart.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {

  constructor( private cartService: CartService, private wishlistService: WishlistService , private route: Router,
               private matSnackBar: MatSnackBar) { }

  // tslint:disable-next-line: variable-name
  plat_id: number;
  error: any;
  plats = [];
  WishListdetails = new Array<any>();

  countplat: number;

  platcount: number;
  no: number;
  ngOnInit(): void {
    this.platsFromWishList();
    this.PlatCount();
  }

  platsFromWishList() {
    this.wishlistService.getWishllistPlats().subscribe((Response) => {
      console.log('no of books in array ' + Response.obj.length);
      this.countplat = Response.obj.length;
      console.log('wishlist plats' , Response.obj);
      console.log('---response', Response);
      this.plats = Response.obj;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < Response.obj.length; i++) {

      console.log('bookName : ' +  Response.obj[0].platsList[0].platName);
      console.log('bookDetails : ' +  Response.obj[0].platsList[0].platDescription);
      console.log('authorName : ' +  Response.obj[0].platsList[0].chefName);
      console.log('noOfBooks : ' +  Response.obj[0].platsList[0].noOfPlats);
      console.log('image : ' +  Response.obj[0].platsList[0].image);
      console.log('price : ' +  Response.obj[0].platsList[0].price);
      console.log('bookId : ' +  Response.obj[0].platsList[0].platId);

      console.log('books are ' + this.plats);

      const p = {platName: Response.obj[i].platsList[0].platName , platDescription: Response.obj[i].platDescription,
         authorName: Response.obj[i].platsList[0].chefName,
        noOfPlats: Response.obj[i].platsList[0].noOfPlats,
        image: Response.obj[i].platsList[0].image,  price: Response.obj[i].platsList[0].price ,
        platId: Response.obj[i].platsList[0].platId
      };

      this.WishListdetails.push(p);
      console.log('after push ', this.WishListdetails);
    }

     });

  }
  PlatCount() {
    this.wishlistService.getWishlistCount().subscribe(
      (Response: any) => {
        console.log('book count = ' + Response.obj);
        this.platcount = Response.obj;
        this.matSnackBar.open(Response.message, 'undo', { duration: 2500 });
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.matSnackBar.open(error.error.message, 'undo', { duration: 2500 });
      }
    );
  }

  remoiveFromWish(PlatId: any) {
    console.log('removeing platId ' + PlatId);

    this.wishlistService.removeFromWishList(PlatId).subscribe(
      (response: any) => {

        this.matSnackBar.open('Plat supprimé de la liste des souhaits', 'success', {duration: 5000});
        window.location.reload();
        sessionStorage.removeItem(PlatId);
        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }

  addToWish(orderId: any) {
    console.log('removeing platId ' + orderId);

    this.wishlistService.addToWishlist(orderId).subscribe(
      (response: any) => {
        this.matSnackBar.open('Plat supprimé de la liste des souhaits', 'success', {duration: 5000});

        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }


  addtobag( platId: any) {
    if (localStorage.getItem('token') === null) {
      this.matSnackBar.open('Please Login first', 'ok', {
        duration: 5000
      });
      sessionStorage.setItem(platId, platId);
      this.route.navigateByUrl('login');
    }

    sessionStorage.setItem(platId, platId);

    this.cartService.addToCart(platId).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data: any) {
    console.log(data);
    window.location.reload();
    this.matSnackBar.open('Plat ajouté avec succès au panier!' , 'ok', {
    duration: 5000
  });
}

handleError(error: any) {
  this.error = error.error.message;
  console.log(error);
  window.location.reload();
  this.matSnackBar.open(this.error, 'ok', {
  duration: 5000
});
}
}
