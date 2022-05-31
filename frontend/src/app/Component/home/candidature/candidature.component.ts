import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidatureService } from 'app/Services/candidature/candidature.service';
@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent implements OnInit {

   /*alerte*/
   alert: boolean=false
   /*Partie de poste désiré: pour recuperer le data selectionné */
   posteList=['Livreur/Livreuse','Equipier(ère)','Assistant(e) administratif','Manager'];
   selected: String = '';
   selectPoste (event:any)
   {
     this.selected=event.target.value;
   }


   condidatureDetails = null as any;
   /*condidatureToUpdate = {
     rollNumber:"",
     nom:"",
     prenom:"",
     email:"",
     cv:"",
     telephone:"",
     poste:"",
     motivation:""

   }*/
   /**partie pour recuperer les données du formulaire et les ajouter à la base de données */
   constructor(private condidatureService : CandidatureService,) {
     this.getCondidaturesDetails();
   }

   register(registerForm:NgForm) {
     this.condidatureService.registerCondidature(registerForm.value).subscribe(
       (resp) => {
         console.log(resp);
         registerForm.reset();
         this.getCondidaturesDetails();
         this.alert=true
       },
       (err) => {
         console.log(err);
       }
     );
   }


   getCondidaturesDetails() {
     this.condidatureService.getCondidatures().subscribe(
       (resp) => {
         console.log(resp);
         this.condidatureDetails = resp;
       },
       (err) => {
         console.log(err);
       }
     );
   }

   /*deleteCondidature(condidature: any) {
     this.condidatureService.deleteCondidature(condidature.rollNumber).subscribe(
       (resp) => {
         console.log(resp);
         this.getCondidaturesDetails();
       },
       (err) => {
         console.log(err);
       }
     );
   }

   edit(condidature: any){
     this.condidatureToUpdate = condidature;
   }

   updateCondidature(){
     this.condidatureService.updateCondidatures(this.condidatureToUpdate).subscribe(
       (resp) => {
         console.log(resp);
       },
       (err) => {
         console.log(err);
       }
     );
   }
 */

   ngOnInit(): void {

   }

}
