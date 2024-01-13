import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
    window.location.reload();
  }

}
