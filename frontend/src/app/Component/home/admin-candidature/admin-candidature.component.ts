import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'app/Services/candidature/candidature.service';
@Component({
  selector: 'app-admin-candidature',
  templateUrl: './admin-candidature.component.html',
  styleUrls: ['./admin-candidature.component.scss']
})
export class AdminCandidatureComponent implements OnInit {

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
