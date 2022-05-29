import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
/** 
The MatDialog service can be used to open modal dialogs with Material Design styling and animations.
Dans notre cas, MatDialog joue le rôle de la fenetre qui s'affiche pour ajouter un nouveau plat.
**/
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
/**MatSnackBar is a service for displaying snack-bar notifications. 
 * example:
 * 
// Simple message.
let snackBarRef = snackBar.open('Message archived');

// Simple message with an action.
let snackBarRef = snackBar.open('Message archived', 'Undo');

*/
import {   MatSnackBar } from '@angular/material/snack-bar';


import { PlatService } from '../../Services/plat/plat.service';
import { PlatModule } from '../../Models/plat/plat.module';

@Component({
  selector: 'app-addplat',
  templateUrl: './addplat.component.html',
  styleUrls: ['./addplat.component.scss']
})


export class AddplatComponent implements OnInit {
  /**
   * FormGroup is one of the three fundamental building blocks
   *  used to define forms in Angular,
   *  along with FormControl and FormArray.
   * 
   */

  platForm: FormGroup;

  platid;


  constructor( private matSnackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private platService: PlatService,
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<AddplatComponent>) { }



  


  ngOnInit(): void {}


  private imageFile: string;

  addplats: PlatModule = new PlatModule();  // plat.module utilisé ici


 /***Les conditions de remplissage de chaque  champ du formulaire */

  platName = new FormControl(this.addplats.platName, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
  ]);



  chefName = new FormControl(this.addplats.chefName, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
  ]);




  price = new FormControl(this.addplats.price, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9 ]*"),
  ]);



  noOfPlats = new FormControl(this.addplats.noOfPlats, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9]*"),
  ]);



  platDescription = new FormControl(this.addplats.platDescription, [
    Validators.required,
    Validators.minLength(20),
    Validators.pattern("[a-zA-Z ]*"),
  ]);


 /**la methode apres avoir cliquer sur  "choisir fichier un fichier" PAS SURE!! */

  onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;  //string
    }
  }



  /**la methode qui est appelée quand on clique sur le bouton "ajouter un plat" apres avoir 
   * rempli le formulaire */
  onClickaddPlat() {
      this.platService.addPlat(this.addplats, this.imageFile).subscribe(
        (user) => {
          if (user.statusCode === 200) {
            this.matSnackBar.open(user.response, 'ok', {duration: 4000});
            this.dialogRef.close(1);
          }
        },
        (error: any) => {
          this.matSnackBar.open(error.error, 'ok', { duration: 4000 });
          console.log(error);
        }
      );
      if (this.platForm.invalid) {
        return;
      }
  }
    

  /**Les messages d'erreurs qui s'affichent pour chaque champ  du formulaire d'ajout d'un nouveau plat */
  platNameValidation() {
      return this.platName.hasError("required") ? "Veuillez renseigner le nom du plat" : 
             this.platName.hasError("minlength") ? "Minimum 3 character must be present" : 
             this.platName.hasError("maxlength") ? "Maximum 25 character allowed" : "";
  }



  platChefValidation() {
      return this.chefName.hasError("required") ? "Veuillez rensiegner le nom du chef" : 
             this.chefName.hasError("minlength") ? "Minimum 5 character must be present" : 
             this.chefName.hasError("maxlength") ? "Maximum 25 character allowed" : "";
  }



  platPriceValidation() {
      return this.price.hasError("required") ? "Veuillez renseigner le prix" :
             this.price.hasError('pattern')? "Only numbers allowed":
             this.price.hasError("minlength") ? "Minimum 1 digit must be there" :"";
  }



  noOfPlatsValidation() {
      return this.noOfPlats.hasError("required") ? "Veuillez renseigner la quantité" : 
             this.noOfPlats.hasError('pattern')? "Only numbers allowed":
             this.noOfPlats.hasError("minlength") ? "Minimum 1 digit must be there" :"";
 }



  platDescriptionValidation() {
      return this.platDescription.hasError("required") ? "Veuillez renseigner la descritpion du plat" :
             this.platDescription.hasError("minlength") ? "Minimum 20 characters  must be there" :"";
  }



  
   
}
