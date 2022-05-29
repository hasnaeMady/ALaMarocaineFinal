import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core'; // a supprimer
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserService } from '../../../Services/user/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
 
  public error = null;
  message = null;
  
  public isloading = false;



  public form = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    mobileNumber: null,
    role: "user",
  };




  constructor(private user: UserService,
              private route: Router,
              private matSnakeBar: MatSnackBar) { }


  ngOnInit() {}



  handleError(error) {
    this.isloading = false;
    this.error = error.error.message;
    console.log(error);
    this.matSnakeBar.open(this.error, 'ok', { duration: 5000});
  }


  handleResponse(data) {
    this.isloading = false;
    this.message = data.message;
    console.log(data);
    this.route.navigateByUrl('/login');//une fois compte créée on est dirigé à la page de login !! je suis pas sûre
    this.matSnakeBar.open('Inscription faite avec succès ', 'OK', { duration: 5000});

  }



  onSubmit() {
    this.isloading = true;
    this.user.signUp(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }





}
