import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';


import { ChefService } from '../../Services/chef/chef.service';
import { ChefModule } from '../../Models/chef/chef.module';

@Component({
  selector: 'app-displaychef',
  templateUrl: './displaychef.component.html',
  styleUrls: ['./displaychef.component.scss']
})
export class DisplaychefComponent implements OnInit {


  chefSearch: any;//////////////////


  selectedValue = 'relevance';
  orderBy = 'asc';
  boo: any;

  error = null;

  chefList = Array<any>();

  book: ChefModule = new ChefModule();
  items = [];
  pageofItems: Array<ChefModule> = new Array<ChefModule>();
  
  obj: ChefModule[];
  size: number;
  // tslint:disable-next-line: variable-name
  chef_id: number;
  chefName: string;
  page = 0;
  length: any = sessionStorage.length;
  pageEvent: PageEvent;
  lengths = 0;
  CurrentPageNo: 0;
  totalPage: Array<number>;

  s: any; selectoption: any;
  value: any = [];
  @Output() output: EventEmitter<any> = new EventEmitter();


  leng: any;


  constructor( private service: ChefService,
               private matSnackBar: MatSnackBar,
               private route: Router) { }





  ngOnInit() {
    this.getallApprovedChefs();
    this.getSearchChefData();
    this.leng = sessionStorage.length;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      console.log('key ::' + key);
    }
    console.log(this.value);
  }




 
  onChange(deviceValue) {

    this.selectedValue = deviceValue;
    console.log(' this is tha value of drope down ' + deviceValue);



    switch (this.selectedValue) {
      case 'mod1':
         console.log('vikash kumar1');
         this.approvedChefServiceMethod(this.page, 'price', 'des');
         console.log('Books are from 1  ', this.chefList);
         break;
      case 'mod2':
        this.approvedChefServiceMethod(this.page, 'price', 'asc');
        console.log('Books are from 2  ', this.chefList);
        break;
      case 'mod3':
        this.approvedChefServiceMethod(this.page, 'created_date_and_time', 'asc');
        console.log('Books are from 3  ', this.chefList);
        break;
    }


  }


    
  //Avoir tous les fichiers approuvés
  getallApprovedChefs() {
    this.approvedChefServiceMethod(this.page, 'chef_id', 'asc');
  }



  approvedChefServiceMethod(page ?: number, order?: string, sortby?: string) {
    this.service.getAllApprovedChefsByPage(page, order, sortby).subscribe((response: any) => {
      console.log(response);
      console.log('Books are the' + response.obj);

      this.chefList = response.obj.content;
      this.size = response.obj.totalElements;
      this.CurrentPageNo = response.obj.pageable.pageNumber;
      this.totalPage = new Array(response.obj.totalPages);


      console.log('Total pages is: ' + this.totalPage);
      console.log('total books are ' + this.size);
      console.log('curret page number is ' + this.CurrentPageNo);
      console.log('Books are  ', this.chefList.length);

    });
  }





  getSearchChefData() {
    this.service.getSearchChefData().subscribe((message) => {
      console.log('search data', message.chefs);
      this.chefSearch = message.chefs;
    });
  }



  SetPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    console.log('page number you want is' + i);
    this.getallApprovedChefs();
  }


  ///bouton previous:  <
   previos(event: any) {
    event.preventDefault();
    this.page = this.page - 1;
    console.log('current page from previous' + 'next' + this.page);
    this.getallApprovedChefs();
   }

   //bouton next: >
   next(event: any) {
    event.preventDefault();
    this.page = this.page + 1;
    console.log('current page from next ' + 'next' + this.page);
    this.getallApprovedChefs();
   }

   

  



handleResponse(data: any) {
    console.log(data);
    this.matSnackBar.open('Chef ajouté!' , 'ok', {duration: 5000 });
}









handleError(error: any) {
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(this.error, 'ok', {duration: 5000 });
}




getOutput() { }



Deatails(chefId) {
    console.log('Redirected to page no ' + chefId);
    this.route.navigateByUrl('chefs/info/' + chefId);

}


getUpdatedNotes(event) {
    this.ngOnInit();
}




}
