import { Component, OnInit, Input } from '@angular/core';
import { PlatModule } from 'app/Models/plat/plat.module';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatService } from 'app/Services/plat/plat.service';

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
    private router: Router,
  ) {}
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
  token2: any;
  ngOnInit(): void {
    this.token2=localStorage.getItem("token");
    this.platService.autoRefresh$.subscribe(() => {
      this.getRateOfplat(this.platId);
    });
    this.platId = this.route.snapshot.paramMap.get('platId');
    console.log('platId:', this.platId);
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('token:', this.token);
    //this.getplatById();
    console.log('get plat called');
    this.platService.getOnePlat(this.platId , this.token).subscribe((response: any) => {
      console.log(response.obj);
      console.log(response);
      console.log(response.obj!=null);
      if (response.obj != null) {
        this.plat = response.obj;
        this.platImage = response.obj.image;
        console.log(this);
        this.platChef = response.obj.chefName;
        this.platName = response.obj.platName;
      }
    });
    console.log('get plat called');
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.getRateOfplat(this.platId);
    this.getColor();
  }


  onClick(rating: any) {
    this.snackBar.open('vous avez evaluez ' + rating + ' / ' + this.starCount, '', {
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

  getplatById() {
    console.log('get plat called');
    this.platService.getOnePlat(this.platId , this.token).subscribe((response: any) => {
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
    this.platService
      .ratingandreview(this.platId, data ,this.token2)
      .subscribe((response: any) => {
        console.log('submit rate response:', response);
        this.snackBar.open(response.response, 'ok', { duration: 2000 });
        this.router.navigateByUrl('/plats');
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open(error, 'ok', { duration: 2000 });
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

  getRateOfplat(platId: number)  {
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
