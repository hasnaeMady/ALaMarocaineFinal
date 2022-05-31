import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'app/Services/candidature/candidature.service';
@Component({
  selector: 'app-candidatures-seller',
  templateUrl: './candidatures-seller.component.html',
  styleUrls: ['./candidatures-seller.component.scss']
})
export class CandidaturesSellerComponent implements OnInit {

  condidatureDetails = null as any;

  /**partie pour recuperer les données du formulaire et les ajouter à la base de données */
  constructor(private condidatureService : CandidatureService,) {
    this.getCondidaturesDetails();
  }



  getCondidaturesDetails() {
    this.condidatureService.getCondidatures().subscribe(
      (resp) => {
        console.log("resp");
        console.log(resp);
        this.condidatureDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCondidature(condidature: any) {
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



  ngOnInit(): void {
    console.log("cdq");
  }

}
