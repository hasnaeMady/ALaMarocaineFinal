import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import {PlatService } from '../../Services/plat/plat.service';
import { PlatModule } from '../../Models/plat/plat.module';


@Component({
  selector: 'app-giverate',
  templateUrl: './giverate.component.html',
  styleUrls: ['./giverate.component.scss']
})


export class GiverateComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private platService: PlatService,
    private route: ActivatedRoute,
    private router: Router, ) {}


  // tslint:disable-next-line: no-input-rename
  @Input('starCount')  starCount = 5;


  color: string;
  private snackBarDuration = 2000;
  ratingArr = [];
  rating: number;
  plat: PlatModule;
  platId: any;
  review: any;
  totalRate: any;

  platImage: any;
  platName: any;
  platChef: any;
  token: any;

  ngOnInit(): void {
    this.platService.autoRefresh$.subscribe(() => {     ///plat.service : autoRefresh$
      this.getRateOfPlat(this.platId);
     });


    this.platId = this.route.snapshot.paramMap.get('platId');
    console.log('platId:', this.platId);

    this.token = this.route.snapshot.paramMap.get('token');
    console.log('token:', this.token);

    this.getPlatById();

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.getRateOfPlat(this.platId);
    this.getColor();

  }


  onClick(rating: any) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration,
    });
    this.rating = rating;
    return false;
  }


  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }


  getPlatById() {
    console.log('get plat called');
    this.platService.getOnePlat(this.platId , this.token).subscribe((response: any) => {  //plat.service: getOnePlat(this.platId , this.token)
      if (response.obj != null) {
        this.plat = response.obj;
        this.platImage = response.obj.image;
        this.platChef = response.obj.chefName;
        this.platName = response.obj.platName;
      }
    });
  }



  submitRate() {
    const data = {
      rating: this.rating,
      review: this.review,
    };
    console.log('rating is', data.rating);
    console.log('review is ', data.review);
    this.platService.ratingandreview(this.platId, data , this.token)  //plat.service: ratingandreview(this.platId, data , this.token) 
      .subscribe((response: any) => {
        console.log('submit rate response:', response);
        this.snackBar.open(response.response, 'ok', { duration: 2000 });
        this.router.navigateByUrl('plats');
      },
      (error: any) => {
        this.snackBar.open(error.error.message, 'ok', { duration: 2000 });
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


  getRateOfPlat(platId: number)  {
    console.log('plat id for avgrate:', platId);
    this.platService.getRateOfPlatById(platId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of plats:', response.obj);
        this.totalRate = response.obj;

        }

    );

  }

}
