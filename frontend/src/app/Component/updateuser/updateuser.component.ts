import { Component, OnInit , Inject} from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserModule } from 'app/Models/user/user.module';
import { UserService } from 'app/Services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PlatService } from 'app/Services/plat/plat.service';
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {
  public hide = true;
  name = new FormControl(this.data.name, [Validators.required]);
  userId = new FormControl(this.data.userId, [Validators.required]);
  email = new FormControl(this.data.email, [Validators.required]);
  password = new FormControl(this.data.password, [Validators.required]);
  mobileNumber = new FormControl(this.data.mobileNumber, [Validators.required]);
  createdDate = new FormControl(this.data.createdDate, [Validators.required]);

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private userservice: UserService,
               private activedRoute: ActivatedRoute,
               private router: Router,
               private matSnackBar: MatSnackBar,
               private http: HttpClient,
               private dialog: MatDialog,
               public dialogRef: MatDialogRef<UpdateuserComponent>, ) { }
  updateuser: UserModule = new UserModule();
  ngOnInit(): void {
  }

  /*onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }*/
  updateUser() {

    this.updateuser.name = this.data.name;
    this.updateuser.mobileNumber = this.data.mobileNumber;
    this.updateuser.password = this.data.password;
    // this.dialogRef.close();

    setTimeout(() => {
      this.userservice.updateuser(this.data.userId, this.updateuser).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.dialogRef.close({ data: this.updateuser });
            this.matSnackBar.open(response.response, 'undo', {
              duration: 3000,
            });
          } else {
            this.dialogRef.close();
            this.matSnackBar.open('Utilisateur non mis à jour...réessayez', 'annulez', {
              duration: 2500,
            });
          }
        },
        (error: any) => {
          this.dialogRef.close();
          this.matSnackBar.open('something went wrong.....!', 'undo', {
            duration: 2500,
          });
        }
      );
    }, 3000); // spinner
  }

}
