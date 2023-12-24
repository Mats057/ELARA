import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private router:Router, private auth:AuthService) { }

  uppercaseRegex:RegExp = new RegExp("(?=.*[A-Z])");
  lowercaseRegex:RegExp = new RegExp("(?=.*[a-z])");
  numberRegex:RegExp = new RegExp("(?=.*[0-9])");
  lengthRegex:RegExp = new RegExp("(?=.{8,})");
 error:string = '';

  switchRoute(route: string) {
    this.router.navigate([route]);
  }

  createAccount(signupForm: NgForm) {
    if(this.auth.createAccount(signupForm.value) == '201'){
      this.router.navigate(['login']);
    }else if(this.auth.createAccount(signupForm.value) == '409'){
      this.error = 'Email ou username já cadastrado';
    }

  }

}
