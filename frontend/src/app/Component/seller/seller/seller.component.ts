import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../Services/token/token.service';
import { Router } from '@angular/router';
import {ActivatedRoute,ParamMap} from '@angular/router';
import {  MatSnackBar } from '@angular/material/snack-bar';
import {  MatDialog } from '@angular/material/dialog';


import { AddplatComponent } from '../../addplat/addplat.component';
import { UpdatePlatComponent } from '../../update-plat/update-plat/update-plat.component';
import { UploadPlatImageComponent } from '../../addplat/upload-plat-image/upload-plat-image/upload-plat-image.component';
import { PlatService } from '../../../Services/plat/plat.service';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})


export class SellerComponent implements OnInit {
  constructor(private service: PlatService , private dialog: MatDialog,
              private matSnackBar: MatSnackBar,private _route:ActivatedRoute) {}


  platSearch: any; //????
  plats: any;
  status: string;
  

  sellerPlats:boolean=false;
  orderPlats:boolean=false;

   // c quoi param ???
  private param:any;
  name: string = null;  //sera le nom de l'utilisateur
  
   /**ngOnInit(): 
    * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time,
    * and before any of the view or content children have been checked.
    * It is invoked only once when the directive is instantiated.
     */


  ngOnInit(): void {


    this.service.autoRefresh$.subscribe(() => {   



      this._route.queryParams.subscribe(params=>{

      this.param=params['plat']; //fait quoi ???

      if (this.param == "sellerplat")  {
      this.sellerPlats=true;
      this.orderPlats=false
      }


      if(this.param == "order")  {
        this.sellerPlats=false;
        this.orderPlats=true;
      }

      });



    this.getallPlats();


    });





    this._route.queryParams.subscribe(params=>{

      this.param=params['plat'];

      if (this.param == "sellerplat"){

      this.sellerPlats=true;
      this.orderPlats=false

      }

      if(this.param == "order"){
        this.sellerPlats=false;
        this.orderPlats=true;
      }

    });




    this.getUserName();
    this.getallPlats();
    this.getSearchPlatData();



  }  //onInit
  



  

  /**afficher tous les plats */
  getallPlats() {
    this.sellerPlats=true;
    this.orderPlats=false;
    console.log('inside seller book meth.....');
    this.service.getallPlats().subscribe( response => {
      this.plats = response.obj;
      console.log('All plats ', this.plats);
    });

  }

  /**Supprimer un plat */
  deletePlat(platId) {
    this.service.deletePlat(platId).subscribe((message) => {
      if (message.statusCode === 202) {
        this.matSnackBar.open('Plat supprimé avec succéss', 'OK', {
          duration: 4000,
        });
    } else {
      this.matSnackBar.open('Erreur dans la suppression du plat', 'ok', { duration: 4000 });
    }
    });
  }



  /**Changer l'image du plat */
  openImageDialog(platId): void {
    const dialogRef = this.dialog.open(UploadPlatImageComponent, {
      width: '25rem',
      panelClass: 'custom-dialog-container',
      data: { platId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  /**modifier un plat */
  editPlat(plat: any): void {
    const dialogRef = this.dialog.open(UpdatePlatComponent, {
      width: '25rem',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        platName: plat.platName,
        chefName: plat.chefName,
        price: plat.price,
        noOfPlats: plat.noOfPlats,
        platDescription: plat.platDescription,
        platId: plat.platId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  /**ajouter un plat: appelé lorsque l'icon d'ajout + est cliqué **/

  addPlat() {
    const dialogRef = this.dialog.open(AddplatComponent, {
      width: '25rem',
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }


  /**Verifier le plat  [A SUPPRIMER !!!!!]   **/
  /** 
  verifyPlat(platId: any) {
  this.status = 'OnHold';
  this.service.verifyPlat(platId, this.status).subscribe((message) => {
      if (message.statusCode === 202) {
        this.matSnackBar.open('Request sent Successfully', 'OK', {
          duration: 4000,
        });
    } else {
      this.matSnackBar.open('Error in Book Deletion', 'ok', { duration: 4000 });
    }
    });
  }
   commented by HASNAE

  **/


  getUserName() {
   this.name = localStorage.getItem('Name');
  }



  getSearchPlatData() {
    this.service.getSearchPlatData().subscribe((message) => {
      console.log('search data', message.plats);
      this.platSearch = message.plats;
    });
  }

}
