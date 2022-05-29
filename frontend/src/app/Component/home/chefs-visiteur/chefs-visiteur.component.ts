import { Component,Input, OnInit } from '@angular/core';
import { ChefService } from '../../../Services/chef/chef.service';
import {ChefModule} from '../../../Models/chef/chef.module';

import { BrowserAnimationsModule } 
    from '@angular/platform-browser/animations';
@Component({
  selector: 'app-chefs-visiteur',
  templateUrl: './chefs-visiteur.component.html',
  styleUrls: ['./chefs-visiteur.component.css']
})
export class ChefsVisiteurComponent implements OnInit {
  
  chefs?:ChefModule[];  
  
  

  constructor(private chefService:ChefService) { }





  ngOnInit(): void {
    //cmnt temp this.retrieveChefs();
  }

  
 
/** 
  retrieveChefs():void{
    this.chefService.getAll()
    .subscribe({
      next: (data) =>{
        this.chefs=data;
        console.log(data);
      },
      error:(e)=>console.error(e)
    });
  }


  **/
}
