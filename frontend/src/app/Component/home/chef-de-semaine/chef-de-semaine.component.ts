import { Component, OnInit } from '@angular/core';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import {ChefService} from '../../../Services/chef/chef.service'
import {ChefModule} from '../../../Models/chef/chef.module';

@Component({
  selector: 'app-chef-de-semaine',
  templateUrl: './chef-de-semaine.component.html',
  styleUrls: ['./chef-de-semaine.component.css']
})




export class ChefDeSemaineComponent implements OnInit {


  

  chefs?:ChefModule[];  
  
  

  constructor(private chefService:ChefService) { }





  ngOnInit(): void {
   //cmnt temporaire this.retrieveChefs();
  }

  
 
/**commnt temporaire
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