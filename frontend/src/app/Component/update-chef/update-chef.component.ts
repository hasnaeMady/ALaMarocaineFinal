import { Component, OnInit , Inject} from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



import { ChefService } from '../../Services/chef/chef.service';
import { ChefModule } from '../../Models/chef/chef.module';




@Component({
  selector: 'app-update-chef',
  templateUrl: './update-chef.component.html',
  styleUrls: ['./update-chef.component.scss']
})
export class UpdateChefComponent implements OnInit {


  chefName = new FormControl(this.data.chefName, [Validators.required]);
  chefPrenom = new FormControl(this.data.chefPrenom, [Validators.required]);
  origne = new FormControl(this.data.origine, [Validators.required]);
 
  specialite= new FormControl(this.data.specialite, [Validators.required, ]);
  
 
 
 
 
  private imageFile: string;





  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private chefservice:ChefService,
               private activedRoute: ActivatedRoute,
               private router: Router,
               private matSnackBar: MatSnackBar,
               private http: HttpClient,
               public dialogRef: MatDialogRef<UpdateChefComponent>, ) { }


  updatechef: ChefModule = new ChefModule();


  ngOnInit(): void {
  }




  onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }


  updateChef() {

    this.updatechef.chefName = this.data.chefName;
    this.updatechef.chefPrenom = this.data.chefPrenom;
    this.updatechef.origine = this.data.origine;

    this.updatechef.specialite= this.data.specialite;
    // this.dialogRef.close();

    setTimeout(() => {
      this.chefservice.updateChef(this.data.chefId, this.updatechef).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.dialogRef.close({ data: this.updatechef });
            this.matSnackBar.open(response.response, 'undo', {duration: 3000,});
          } else {
            this.dialogRef.close();
            this.matSnackBar.open('chef non modifié...essayez encore', 'undo', {
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
