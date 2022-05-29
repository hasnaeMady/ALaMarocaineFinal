import { Component, OnInit , Inject} from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';




import { ChefService } from '../../../Services/chef/chef.service';



@Component({
  selector: 'app-upload-chef-image',
  templateUrl: './upload-chef-image.component.html',
  styleUrls: ['./upload-chef-image.component.scss']
})



export class UploadChefImageComponent implements OnInit {


  imageForm: FormGroup;



  constructor( public dialogRef: MatDialogRef<UploadChefImageComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,  //To access the data in your dialog component, you have to use the MAT_DIALOG_DATA injection token
               private chefService: ChefService, /////
               private snackbar: MatSnackBar,
               private formBuilder: FormBuilder) { }




  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      name: [''],
      imageFile: [''],
    });
  }





  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      this.imageForm.get('imageFile').setValue(imageFile);
    }
  }





  onSubmit() {

    this.dialogRef.close();

    const formData = new FormData();
    formData.append('imageFile', this.imageForm.get('imageFile').value);
    
    this.chefService.uploadChefImage(this.data.platId, formData)     //uploadPlatImage(platId,  formData): Observable<any>

      .subscribe(
        (message) => {
          this.snackbar.open(message.response, 'ok', {
            duration: 4000,
          });
          this.dialogRef.close(1);
        },
        (error: any) => {
          console.log(error);
        }
      );

  }











}
