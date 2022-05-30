import { CartService } from '../../Services/cart/cart.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlatService } from '../../Services/plat/plat.service';
import { TokenService } from '../../Services/token/token.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../Services/wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor( private service: PlatService,
               private token: TokenService,
               private route: Router,
               private cartService: CartService,
               private wishlistService: WishlistService,
               private matSnackBar: MatSnackBar
    ) { }

  @Output() toggleEvent = new EventEmitter<boolean>();


  opened = false;




  name: any;
  id: any;
  isUser = false;
  isSeller = false;
 
  role: string;
  length: any;
  platName: string;
  totalItem;
  isbudget = false;
  isLogin = false;
 @Input() output: any;
 @Input() function: any;


  wishlistLength: number;

  ontoggel(input: any) {
  
    this.toggleEvent.emit(input);
    this.opened = !this.opened;
  }

  ngOnInit() {
    this.wishlistService.autoRefresh$.subscribe(() => {

      this. getWishlistCount();
    }

    );
    this. getWishlistCount();

    this.cartService.autoRefresh$.subscribe(() => {
      this.getCartItemCount();

    });

    this.getCartItemCount();
    this.name = localStorage.getItem('Name');
    this.role = localStorage.getItem('role');
  
    
    if (this.role === 'seller') {
     this.isSeller = true;
     this.isLogin = true;
   }
    if (this.role === 'user') {
     this.isUser = true;
     this.isLogin = true;
  
   }
  }

  getCartItemCount() {
    this.cartService.getCartItemCount().subscribe((response: any) => {
      this.length = response.obj;
   
     });
  }
  platSearch() {
this.service.setSearchPlatData(this.platName);
  }
  logout(event: MouseEvent) {
   
    event.preventDefault();
    this.token.remove();
    this.token.logedIn(false);
    this.route.navigateByUrl('/login');
  }
  getUpdatedNotes(event) {
  this.ngOnInit();
  }

  getWishlistCount() {
    this.wishlistService.getWishlistCount().subscribe((response: any) => {
      this.wishlistLength = response.obj;
    
     });
  }




}