import { Component, OnInit } from '@angular/core';

import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { PlatModule } from '../../Models/plat/plat.module';
import {  MatDialog } from '@angular/material/dialog';



import { PlatreviewsComponent } from '../platreviews/platreviews/platreviews.component';
import { PlatService } from '../../Services/plat/plat.service';

@Component({
  selector: 'app-ratedplats',
  templateUrl: './ratedplats.component.html',
  styleUrls: ['./ratedplats.component.scss']
})
export class RatedplatsComponent implements OnInit {

  platList = Array<any>();
  totalRate: any;
  color: string;
  avgRate: any;
  platId: any;
  rateList = Array<any>();
  platSearch: any;

  constructor(private service: PlatService,private matSnackBar: MatSnackBar, private dialog: MatDialog ) { }




  ngOnInit(): void {
    // this.getallApprovedBooks();
    this.getPlatByRating();
    this.totalRate = 0;

    this.getColor();
    this.getSearchPlatData();

  }




  getPlatByRating() {
    this.service.getSortedPlatByRate().subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('plats:', response.obj);
        this.platList = response.obj;


        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );

  }





 getRateOfPlat(platId: number)  {
    console.log('plat id for avgrate:', platId);
    this.service.getRateOfPlatById(platId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of plats:', response.obj);
        this.totalRate = response.obj;

        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );

  }

  getallApprovedPlats() {
    console.log('method called');
    this.service.getallPlats().subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('books:', response.obj);
        this.platList = response.obj;


        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }

  getColor() {
    if (this.totalRate >= 3 || this.totalRate >= 2) {
      this.color = 'rgb(245,182,110)';
    }
    if (this.totalRate >= 4) {
      this.color = 'rgb(16,136,16)';
    }
    if (this.totalRate < 2) {
      this.color = 'rgb(250,0,0)';
    }
  }

  getReviews(plat) {
    const dialogRef = this.dialog.open(PlatreviewsComponent, {
      // width: '25rem',
      // panelClass: 'custom-dialog-container',
      // height: '400px',
      // width: '600px',
      data : {platId: plat.platId}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  

  getSearchPlatData() {
    this.service.getSearchPlatData().subscribe((message) => {
      console.log('search data', message.plats);
      this.platSearch = message.plats;
    });
  }
}
