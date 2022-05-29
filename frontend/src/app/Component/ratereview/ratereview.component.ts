import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { CartService } from '../../Services/cart/cart.service';
import { PlatModule } from '../../Models/plat/plat.module';
import { PlatService } from '../../Services/plat/plat.service';

@Component({
  selector: 'app-ratereview',
  templateUrl: './ratereview.component.html',
  styleUrls: ['./ratereview.component.scss']
})
export class RatereviewComponent implements OnInit {


  constructor(
    private platService: PlatService,
    private router: Router,
    private data: PlatService,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cartService : CartService,
  ) { }


  platId: any;
  ratings: Array<any> = [];
  rate: any;
  visible: boolean;
  isAdded: boolean;
  isListed: boolean;
  plat:PlatModule;
  platImage: any;
  platName: any;
  platChef: any;
  platPrice: any;
  bookDescription: any;
 
  show: boolean;

  totalRate = 0;
  ratenumber: number=0;
  color: any;
  total: any;
  reviewList =new Array<any>();
  rev:string;
  user=new Array<any>();

  error = null;

  ngOnInit(): void {
    this.platId = this.route.snapshot.paramMap.get('platId');
    this.getPlatById();
    this.getRatings();
    console.log('platid ', this.platId);
    
    // this.getRateOfBookById();
  }



  getPlatById() {
    this.platService.getOnePlatById(this.platId).subscribe((response: any) => {
      console.log(response);
      this.plat = response.obj;
      console.log("getplat by id:" ,this.plat);
      console.log(this.plat, 'kkkkkkkk');
     });
  }


  getRateOfPlatById() {
    this.platService.getRateOfPlatById(this.platId).subscribe((response: any) => {
      if (response.obj != null) {
        this.rate = response.obj ;
        if (this.rate === undefined) {
        console.log('plat average rate ', this.rate);
        }
      }
    });
   }


  rateNow() {
    // if (this.visible) {
      // localStorage.setItem("totalRate", this.total);
      this.router.navigate(['plats/ratingandreview/' + this.platId]);
    // }
  }

  getRatings() {
    this.platService
    .getReview(this.platId)
    .subscribe((response: any) => {
      this.ratings = response.obj;
      console.log('rate and reviews for book ' + this.ratings);

      // tslint:disable-next-line: prefer-const
      // tslint:disable-next-line: forin
      for (const index in this.ratings) {
        this.rate = this.ratings[index];
        this.totalRate += this.rate.rating;
        this.ratenumber += 1;
        this.total = this.totalRate;
        this.rev = this.ratings[index].review;
        this.user = this.ratings[index].userName;
    
        console.log("user:",this.user);
       
        var p={name:this.user,review:this.rev,rating:this.ratings[index].rating};
        this.reviewList.push(p);
        console.log("after push:",this.reviewList);
      }
      if (this.ratenumber > 1) {
          this.totalRate = this.totalRate / this.ratenumber;
          this.total = Number.parseFloat(this.totalRate + '').toFixed(1);
        }
      if (this.totalRate >= 3 || this.totalRate >= 2) {
          this.color = 'rgb(245, 182, 110)';
        }
      if (this.totalRate >= 4) {
          this.color = 'rgb(16, 136, 16)';
        }
      if (this.totalRate < 2) {
          this.color = 'rgb(216, 69, 59)';
        }
      });
  }


  addToCart(platId: any) {


    if (localStorage.getItem('token') === null) {

      this.matSnackBar.open('Please Login first', 'ok', {duration: 5000});

      sessionStorage.setItem(platId, platId);
      this.isAdded = true;
      this.router.navigateByUrl('login');

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
      this.matSnackBar.open('Plat ajouté au panier!' , 'ok', {
duration: 5000
    });
  }
  
  
    handleError(error: any) {
      this.error = error.error.message;
      console.log(error);
      this.matSnackBar.open(this.error, 'ok', { duration: 5000});}

    // if (this.visible) {
    //   this.bookService.addToCart(this.bookId).subscribe((response: any) => {
    //     this.data.changeMessage("count");
    //     console.log(response["obj"]);
    //     this.isAdded = response.obj;
    //     this._matSnackBar.open("Book added to cart", "ok", {
    //       duration: 1000,
    //     });
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(LoginComponent);
    //   dialogRef.afterClosed().subscribe((result) => {
    //     window.location.reload();
    //   });
    //   this._matSnackBar.open("please login", "ok", {
    //     duration: 1000,
    //   });
    // 



    

  // adding book to wish list if user login
  addToWishlist() {
    // if (this.visible) {
    //   this.bookService.addToWishList(this.bookId).subscribe((response: any) => {
    //     console.log(response["obj"]);
    //     this.isListed = response["obj"];
    //     this._matSnackBar.open("Book added to wishlist", "ok", {
    //       duration: 1000,
    //     });
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(LoginComponent);
    //   dialogRef.afterClosed().subscribe((result) => {
    //     window.location.reload();
    //   });
    //   this._matSnackBar.open("please login", "ok", {
    //     duration: 1000,
    //   });
    // }
  }

  /*Hasnae:
   * addToWishlist() {
    // if (this.visible) {
    //   this.platService.addToWishList(this.platId).subscribe((response: any) => {
    //     console.log(response["obj"]);
    //     this.isListed = response["obj"];
    //     this._matSnackBar.open("Plat ajouté à la liste des favoris", "ok", {
    //       duration: 1000,
    //     });
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(LoginComponent);
    //   dialogRef.afterClosed().subscribe((result) => {
    //     window.location.reload();
    //   });
    //   this._matSnackBar.open("please login", "ok", {
    //     duration: 1000,
    //   });
    // }
  }


   * 
   * 
   * 
 */


  isAddedToWishList() {
    // this.bookService
    //   .isAddedToWishList(this.bookId)
    //   .subscribe((response: any) => {
    //     this.isListed = response["obj"];
    //   });
  }


  /*** Hasnae
   * isAddedToWishList() {
    // this.platService
    //   .isAddedToWishList(this.platId)
    //   .subscribe((response: any) => {
    //     this.isListed = response["obj"];
    //   });
  }
   * 
   * 
   * 
   */
}
