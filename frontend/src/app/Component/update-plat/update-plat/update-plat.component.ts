import { Component, OnInit , Inject} from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



import { PlatService } from '../../../Services/plat/plat.service';
import { PlatModule } from '../../../Models/plat/plat.module';

@Component({
  selector: 'app-update-plat',
  templateUrl: './update-plat.component.html',
  styleUrls: ['./update-plat.component.scss']
})
export class UpdatePlatComponent implements OnInit {


  platName = new FormControl(this.data.platName, [Validators.required]);
  chefName = new FormControl(this.data.chefName, [Validators.required]);
  price = new FormControl(this.data.price, [Validators.required]);
  noOfPlats= new FormControl(this.data.noOfPlats, [Validators.required]);
  platDescription = new FormControl(this.data.platDescription, [Validators.required, ]);
  
  private imageFile: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private platservice: PlatService,
               private activedRoute: ActivatedRoute,
               private router: Router,
               private matSnackBar: MatSnackBar,
               private http: HttpClient,
               public dialogRef: MatDialogRef<UpdatePlatComponent>, ) { }


  updateplat: PlatModule = new PlatModule();


  ngOnInit(): void {
  }




  onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }


  updatePlat() {

    this.updateplat.platName = this.data.platName;
    this.updateplat.chefName = this.data.chefName;
    this.updateplat.price = this.data.price;
    this.updateplat.noOfPlats = this.data.noOfPlats;
    this.updateplat.platDescritpion = this.data.platDescripion;
    // this.dialogRef.close();

    setTimeout(() => {
      this.platservice.updatePlat(this.data.platId, this.updateplat).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.dialogRef.close({ data: this.updateplat });
            this.matSnackBar.open(response.response, 'undo', {duration: 3000,});
          } else {
            this.dialogRef.close();
            this.matSnackBar.open('Book not updated...try again', 'undo', {
              duration: 2500,
            });
          }
        },
        (error: any) => {
          this.dialogRef.close();
          this.matSnackBar.open('something went wrong.....!', 'undo', {duration: 2500,});
         }
      );
    }, 3000); // spinner
  }
}
