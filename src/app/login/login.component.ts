import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private auth:AuthService) {}

  uppercaseRegex: RegExp = new RegExp('(?=.*[A-Z])');
  lowercaseRegex: RegExp = new RegExp('(?=.*[a-z])');
  numberRegex: RegExp = new RegExp('(?=.*[0-9])');
  lengthRegex: RegExp = new RegExp('(?=.{8,})');
  error: string = '';

  switchRoute(route: string) {
    this.router.navigate(['login', route]);
  }

  verifyInfos(loginForm: NgForm) {
    if(this.auth.login(loginForm.value)){
      localStorage.setItem('email', loginForm.value.email);
      this.router.navigate(['home']);
    }else{
      this.error = 'Email ou senha incorretos';
    };
  }
}
