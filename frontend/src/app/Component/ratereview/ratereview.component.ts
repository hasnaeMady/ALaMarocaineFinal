import { EventEmitter,Component, OnInit } from '@angular/core';
import { PlatModule } from 'app/Models/plat/plat.module';
import { PlatService } from 'app/Services/plat/plat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'app/Services/cart/cart.service';
import { Navigation } from '@angular/router';
import { HttpClient, HttpEventType } from "@angular/common/http";

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
    private http: HttpClient
  ) { }
  platId: any;
  ratings: Array<any> = [];
  rate: any;
  visible: boolean;
  isAdded: boolean;
  isListed: boolean;
  plat: PlatModule;
  platImage: any;
  platName: any;
  chefName: any;
  platPrice: any;
  platDescription: any;
  sellerName: any;
  show: boolean;

  i = 0 ;
  totalRate = 0;
  ratenumber: number=0;
  color: any;
  total: any;
  reviewList =new Array<any>();
  rev:string;
  user=new Array<any>();
  recomfinal = new Array<any>();
  recom = new Array<any>();
  platsRecommende = new Array<any>();

  error = null;

  value: any = [];

  ngOnInit(): void {
    this.platId = this.route.snapshot.paramMap.get('platId');
    this.getPlatById();
    this.getRatings();
    console.log('platid ', this.platId);
    this.recomfinal[0] = 1;
    this.recomfinal[1] = 2;
    this.recomfinal[2] = 3;
    this.recomfinal[3] = 4;

    this.http.post('http://127.0.0.1:5000/data', this.platId , {
      reportProgress: true,
      observe: "events",
    }).subscribe((e) => {
      if (e.type === HttpEventType.Response) {
        while (e.body[this.i]!=null){
          console.log('reponse', e.body[this.i]);
          this.recom[this.i] = e.body[this.i];
          this.i++;
        }

        console.log('recommendatino', this.recom);
        
      }
    })

    this.platService.getOnePlatById(this.recom[0]).subscribe((response: any) => {
      this.recomfinal[0] = this.recom[0];
   });
     this.platService.getOnePlatById(this.recom[1]).subscribe((response: any) => {
      this.recomfinal[1] = this.recom[1];
     });
     this.platService.getOnePlatById(this.recom[2]).subscribe((response: any) => {
      this.recomfinal[2] = this.recom[2];
   });
     this.platService.getOnePlatById(this.recom[3]).subscribe((response: any) => {
      this.recomfinal[3] = this.recom[3];
   });
   console.log('nouvelle1',this.recomfinal);
   console.log('nouvelle2',this.recom);


    this.platService.getOnePlatById(this.recomfinal[0]).subscribe((response: any) => {
      console.log(response);
      this.platsRecommende[0] = response.obj;
      console.log("get book by id:" ,this.platsRecommende[0]);
      console.log(this.platsRecommende, 'kkkkkkkk');
      console.log('nouvelle3',this.recomfinal);
  });
     this.platService.getOnePlatById(this.recomfinal[1]).subscribe((response: any) => {
      console.log(response);
      this.platsRecommende[1] = response.obj;
      console.log("get book by id:" ,this.platsRecommende[1]);
      console.log(this.platsRecommende, 'kkkkkkkk');
     });
     this.platService.getOnePlatById(this.recomfinal[2]).subscribe((response: any) => {
      console.log(response);
      this.platsRecommende[2] = response.obj;
      console.log("get book by id:" ,this.platsRecommende[2]);
      console.log(this.platsRecommende, 'kkkkkkkk');
     });
     this.platService.getOnePlatById(this.recomfinal[3]).subscribe((response: any) => {
      console.log(response);
      this.platsRecommende[3] = response.obj;
      console.log("get book by id:" ,this.platsRecommende[3]);
      console.log(this.platsRecommende, 'kkkkkkkk');

      
     });

    
    // this.getRateOfBookById();
  }

  insert(e){

    console.log(e);
    this.http.post('http://127.0.0.1:5000/data', e, {
      reportProgress: true,
      observe: "events",
    }).subscribe((e) => {
      if (e.type === HttpEventType.Response) {
        while (e.body[this.i]!=null){
          console.log('reponse', e.body[this.i]);
          this.i++;
        }
        
      }
    })
  }

  getPlatById() {
    this.platService.getOnePlatById(this.platId).subscribe((response: any) => {
      console.log(response);
      this.plat = response.obj;
      console.log("get plat by id:" ,this.plat);
      console.log(this.plat, 'kkkkkkkk');
     });
  }
  getRateOfBookById() {
    this.platService.getRateOfPlatById(this.platId).subscribe((response: any) => {
      if (response.obj != null) {
        this.rate = response.obj ;
        if (this.rate === undefined) {
        console.log('plat average rate ', this.rate);
        }
      }
    });
  }

  rateNow(plat:any) {
    // if (this.visible) {
      //this.router.navigateByUrl('plats/ratingandreview/' + this.bookId);
      
      this.router.navigateByUrl('plats/rateandreview/' + this.platId);
    // }
  }

  Deatails(bookId) {
    console.log('Redirected to page no ' + bookId);
    this.router.navigateByUrl('plats/info/' + bookId);

  }

  getRatings() {
    this.platService
    .getReview(this.platId)
    .subscribe((response: any) => {
      this.ratings = response.obj;
      console.log('rate and reviews for plat ' + this.ratings);

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
      this.matSnackBar.open('Please Login first', 'ok', {
        duration: 5000
      });
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
      this.matSnackBar.open(this.error, 'ok', {
      duration: 5000
    });
    }

    getUpdatedNotes(event) {
      this.ngOnInit();
  }

  addtobag( platId: any) {
    if (localStorage.getItem('token') === null) {
    this.matSnackBar.open('Veuillez vous connecter', 'ok', {duration: 5000 });
    this.router.navigateByUrl('login');
    return;
    }
    sessionStorage.setItem(platId, platId);
    this.ngOnInit();
    this.cartService.addToCart(platId).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
    );
  }

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
  isAddedToWishList() {
    // this.bookService
    //   .isAddedToWishList(this.bookId)
    //   .subscribe((response: any) => {
    //     this.isListed = response["obj"];
    //   });
  }
}

