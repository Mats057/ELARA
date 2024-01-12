import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  uppercaseRegex: RegExp = new RegExp('(?=.*[A-Z])');
  lowercaseRegex: RegExp = new RegExp('(?=.*[a-z])');
  numberRegex: RegExp = new RegExp('(?=.*[0-9])');
  lengthRegex: RegExp = new RegExp('(?=.{8,})');
  error: string = '';
  constructor(private router: Router, private auth:AuthService) {}


  ngOnInit(): void {
    if(this.verifyLogin()){
      this.router.navigate(['home']);
    }
  }

  switchRoute(route: string) {
    this.router.navigate(['login', route]);
  }

  verifyLogin() {
    return this.auth.verifyToken(localStorage.getItem('token')!)
  }

  makeLogin(loginForm: NgForm) {
    this.auth.login(loginForm.value)
      .subscribe({
        next: (data: any) => {
          data = data.body;
          if (data['message'] == 'Login realizado com sucesso!') {
            this.router.navigate(['home']);
          }else{
            this.error = data['message'];
          }
        },
      });
  }
}
