import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

import { PlatService } from '../../../Services/plat/plat.service';


@Component({
  selector: 'app-platreviews',
  templateUrl: './platreviews.component.html',
  styleUrls: ['./platreviews.component.scss']
})


export class PlatreviewsComponent implements OnInit {

  platId:number;


  constructor(@Inject(MAT_DIALOG_DATA) public data : any,private platService: PlatService , private snakbar: MatSnackBar) { 
    this.platId = data.platId;
    console.log("platid for review:",this.platId);
  
  
  }

  ngOnInit(): void {
    this.getReviews();
  }



  reviews = new Array<any>();
  reviewList =new Array<any>();
  rev:string;
  user=new Array<any>();
  color: string;
  totalRate:any;

  getReviews(){

    this.getRateOfPlat(this.platId);
    this.platService.getReview(this.platId).subscribe((response: any) => {
    console.log("Review response:",response.obj);
    this.reviews=response.obj;
    console.log("Reviews stored:",response.obj['review']);


    for (var index in this.reviews) {
              this.rev = this.reviews[index].review;
              this.user = this.reviews[index].userName;
              console.log("user:",this.user);
              var p={name:this.user,review:this.rev,rating:this.reviews[index].rating};
              this.reviewList.push(p);
              console.log("after push:",this.reviewList);
  
    }


    

  }
);
  }

  getRateOfPlat(platId:number)  {
    console.log("plat id for avgrate:",platId);
    this.platService.getRateOfPlatById(platId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of plats:', response.obj);
        this.totalRate= response.obj;
        
        }
     
    );
   
  }


  // reviewList=
  //   [
  //     { 
  //       name: "Nayan", review: "This book is a Norse Arabian Nights. Each section is a honeycomb. Stories are nested in stories and crack open to reveal rumor and anecdote, prose poems, tendrils of myth" 
  //     },
  //     { 
  //       name: "Jhon", review: "The opening story’s incessant hedging about language—meant, in part, to parody, ad nauseam, the almost paranoiac way that our language about identity tends to be policed" 
  //     },
  //     { 
  //       name: "michael", review: "The book—though an absorbing and well-crafted work of fiction capable of standing on its own, without the support of biography—is almost impossible to consider independently of the knowledge of where its author’s life overlaps with his art" 
  //     },
  //   ]

}
