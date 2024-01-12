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
    this.auth.createAccount(signupForm.value)
      .subscribe(
        (data: any) => data['message'] == 'Usuário criado com sucesso!' ? this.switchRoute('login') : this.error = data['message'],
      );
  }

}
