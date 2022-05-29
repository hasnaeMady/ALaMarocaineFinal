import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
/** 
The MatDialog service can be used to open modal dialogs with Material Design styling and animations.
Dans notre cas, MatDialog joue le rôle de la fenetre qui s'affiche pour ajouter un nouveau plat.
**/
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';

import {   MatSnackBar } from '@angular/material/snack-bar';


import { ChefService } from '../../Services/chef/chef.service';
import { ChefModule } from '../../Models/chef/chef.module';

@Component({
  selector: 'app-addchef',
  templateUrl: './addchef.component.html',
  styleUrls: ['./addchef.component.scss']
})


export class AddchefComponent implements OnInit {
  
  platForm: FormGroup;

  platid;


  constructor( private matSnackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private chefService: ChefService,
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<AddchefComponent>) { }



  


  ngOnInit(): void {}


  private imageFile: string;

  addchefs: ChefModule = new ChefModule();  


 /***Les conditions de remplissage de chaque  champ du formulaire */

  chefName = new FormControl(this.addchefs.chefName, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
  ]);



  chefPrenom = new FormControl(this.addchefs.chefPrenom, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
  ]);





  origine = new FormControl(this.addchefs.origine, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
    
  ]);




  specialite = new FormControl(this.addchefs.specialite, [
    Validators.required,
    Validators.minLength(20),
    Validators.pattern("[a-zA-Z ]*"),
  ]);

  chefDeSemaine = new FormControl(this.addchefs.chefDesemaine, [
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



  /**la methode qui est appelée quand on clique sur le bouton "ajouter un chef" apres avoir 
   * rempli le formulaire */
  onClickaddChef() {
      this.chefService.addChef(this.addchefs, this.imageFile).subscribe(
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
  chefNameValidation() {
      return this.chefName.hasError("required") ? "Veuillez renseigner le nom du plat" : 
             this.chefName.hasError("minlength") ? "Minimum 3 character must be present" : 
             this.chefName.hasError("maxlength") ? "Maximum 25 character allowed" : "";
  }



  chefPrenomValidation() {
      return this.chefPrenom.hasError("required") ? "Veuillez rensiegner le nom du chef" : 
             this.chefPrenom.hasError("minlength") ? "Minimum 5 character must be present" : 
             this.chefPrenom.hasError("maxlength") ? "Maximum 25 character allowed" : "";
  }


  origineValidation() {
    return this.origine.hasError("required") ? "Veuillez rensiegner le nom du chef" : 
           this.origine.hasError("minlength") ? "Minimum 5 character must be present" : 
           this.origine.hasError("maxlength") ? "Maximum 25 character allowed" : "";
}



  specialiteValidation() {
      return this.specialite.hasError("required") ? "Veuillez renseigner la descritpion du plat" :
             this.specialite.hasError("minlength") ? "Minimum 20 characters  must be there" :"";
  }


  chefDeSemaineValidation() {
    return this.origine.hasError("required") ? "Veuillez inddiquer s'il s'agit du chef de lasemaine" : 
           this.origine.hasError("minlength") ? "Minimum 5 character must be present" : 
           this.origine.hasError("maxlength") ? "Maximum 25 character allowed" : "";
}





  
   
}
