

import { Router, ActivatedRoute,ParamMap} from '@angular/router';

import { Component, OnInit ,ViewChild  } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenavModule;

  isSeller = false;
 // isAdmin=false; //danger


  role:string;

  constructor(private router:Router,private route:ActivatedRoute,) { }



/* DANGER
  ngOnInit() {
   this.role= localStorage.getItem('role');
   console.log('role check sidenav',this.role);
   if (this.role === 'admin') 
   {
     this.isAdmin=true;
   }
   if (this.role === 'seller') 
   {
     this.isSeller=true;
   }
  }
*/


  ngOnInit() {
    this.role= localStorage.getItem('role');
    console.log('role check sidenav',this.role);
    if (this.role === 'seller') 
    {
      this.isSeller=true;
    }
    if (this.role === 'seller') 
    {
      this.isSeller=true;
    }
   }
 
 

  
  sellerPlats()
  {
    this.router.navigate(['plats'],{queryParams:{plat:'unverified'}});
  }

  orders()
  {
    this.router.navigate(['plats'],{queryParams:{plat:'order'}});
  }

  reviews()
  {
    this.router.navigate(['plats'],{queryParams:{plat:'review'}});
  }

 plats()
  {
    this.router.navigate(['plats'],{queryParams:{plat:'plats'}});
  }


  sellerPlat(){
    
      this.router.navigate(['plats'],{queryParams:{plat:'sellerplat'}});
  }

  orderStatus(){

this.router.navigate(['plats'],{queryParams:{plat:'order'}});
  }
  
}
