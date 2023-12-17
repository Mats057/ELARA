import { Component, OnInit } from '@angular/core';

import { AuthService } from './login/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CRUD_Angular';


  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
  }
}
