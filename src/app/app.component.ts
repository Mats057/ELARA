import { Component, OnInit } from '@angular/core';

import { AuthService } from './login/auth.service';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'CRUD_Angular';
  loading = false;

  constructor(private authService: AuthService, private router:Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    })
  }
  
  ngOnInit(): void {
  }

}
