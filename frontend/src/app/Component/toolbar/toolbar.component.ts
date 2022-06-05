import { CartService } from '../../Services/cart/cart.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlatService } from '../../Services/plat/plat.service';
import { TokenService } from '../../Services/token/token.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../Services/wishlist/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { MatDialog } from '@angular/material/dialog';


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
               private matSnackBar: MatSnackBar,
               private dialog: MatDialog
    ) { }

  @Output() toggleEvent = new EventEmitter<boolean>();


  opened = false;




  name: any;
  isAdmin = false;
  isUser = false;
  isSeller = false;
  userId: any;
  mobileNumber:any;
  role: string;
  length: any;
  password: string;
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
    this.name = localStorage.getItem('name');
    this.userId = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
    this.mobileNumber = localStorage.getItem('phone');
    this.role = localStorage.getItem('role');
    console.log('role check toolbar', this.role);
    
    if (this.role === 'admin') {
      this.isAdmin = true;
      this.isLogin = true;
    }
  
    
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
  editUser(user:any): void {
    const dialogRef = this.dialog.open(UpdateuserComponent, {
      width: '23rem',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        userId: user.userId,
        password:user.password,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }



}
