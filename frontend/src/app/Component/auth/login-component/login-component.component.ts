import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { TokenService } from '../../../Services/token/token.service';
import { UserService } from '../../../Services/user/user.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})

// here we have class implements OnInit ,first time seeing this : HASNAE
export class LoginComponentComponent implements OnInit {

  public error = null;
  public hide = true;

  public valideUser = false;
  public tokenValue = null;

  public isLoading = false;

  public form = {
    email: null,
    password: null,
    role: null
  };



  constructor(private user: UserService,
              private token: TokenService,
              private route: Router,
              private matSnackBar: MatSnackBar,

              private titleService: Title ) {

      this.setTitle('A La Marocaine| Login');} 

  ngOnInit() { }



  handleError(error: { error: any; }) {
    this.isLoading = false;
    this.error = error.error.message;
    if ( error.error.status === 0) {
      console.log('please connect database');
    }
    this.matSnackBar.open(this.error, 'ok', {duration: 5000 });
    console.log(error);
  }
  
 

  handleResponse(data) {
    this.token.handle(data);
    this.isLoading = false;
    this.token.logedIn(true);
    this.matSnackBar.open('Connecté avec succès', 'oOK', {duration: 5000 });
    


 

    if (this.form.role === 'seller') {
      localStorage.setItem('role', 'seller');
      this.route.navigateByUrl('plats');
      return;
    }

   if (this.form.role === 'user') {
      localStorage.setItem('role', 'user');
      this.route.navigateByUrl('home-client');
      return;
    }
}


onSubmit() {

  this.isLoading = true;

  if (this.form.email=== 'seller@gmail.com'){
      this.form.role = 'seller';
  }
  
  else{
    this.form.role = 'user';
  }

  this.user.signIn(this.form).subscribe(
   data => this.handleResponse(data),
   error => this.handleError(error)
 );

}


public setTitle( dashboard: string) {
    this.titleService.setTitle( dashboard );
}

}
