import { Component, OnInit , Inject} from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';




import { PlatService } from '../../../../Services/plat/plat.service';



@Component({
  selector: 'app-upload-plat-image',
  templateUrl: './upload-plat-image.component.html',
  styleUrls: ['./upload-plat-image.component.scss']
})



export class UploadPlatImageComponent implements OnInit {


  imageForm: FormGroup;

  /** FormBuilder:
  provides syntactic sugar that shortens creating instances of a FormControl, FormGroup, or FormArray. 
  It reduces the amount of boilerplate needed to build complex forms.
  **/


   /** MatDialogRef: 
    *  Provides a handle on the opened dialog.
    *  It can be used to close the dialog and to receive notifications when the dialog has been closed. 
    * Any notification Observables will complete when the dialog closes.
    * 
    * 
    */

  constructor( public dialogRef: MatDialogRef<UploadPlatImageComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,  //To access the data in your dialog component, you have to use the MAT_DIALOG_DATA injection token
               private platService: PlatService, /////
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
    
    this.platService.uploadPlatImage(this.data.platId, formData)     //uploadPlatImage(platId,  formData): Observable<any>

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
