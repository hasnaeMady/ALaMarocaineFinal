import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserService } from '../../../Services/user/user.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public isLoading = false;
  public error = null;
  message = null;

  public form = {
    email: null,
  };

  constructor(
    private user: UserService,
    private route: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  
  handleError(error: { error: any; }) {
    this.isLoading = false;
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(this.error, 'ok', {
      duration: 5000
    });
  }
  handleResponse(data) {
    this.isLoading = false;
    this.matSnackBar.open('Check Your Email Please ', 'ok', {duration: 5000
    });
    this.route.navigateByUrl('\login');
  }
  onSubmit() {
    this.isLoading = true;
    this.user.forgetPassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error));
  }
}
