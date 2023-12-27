import { AuthService } from '../services/auth.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('toggleIcon') toggleIcon!: ElementRef;

  constructor(private authVerify: AuthService, private router: Router) {
    this.header = new ElementRef('header');
  }

  ngOnInit() {
    this.logged = this.authVerify.verifyLogin();
  }

  ngAfterViewInit() {
    feather.replace();
  }

  @HostListener('window:scroll')
  windowScroll() {
    if (window.scrollY > 80) {
      this.header.nativeElement.classList.add('sticky');
      console.log("sticky");
    } else {
      this.header.nativeElement.classList.remove('sticky');
    }
  }

  logout() {
    this.authVerify.logout();
    this.router
      .navigateByUrl('/login', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/home']);
      });
  }

  toggleMenu() {
    this.header.nativeElement.classList.toggle('active');
    let svg = this.toggleIcon.nativeElement.children;
    svg[0].classList.toggle('hidden');
    svg[1].classList.toggle('hidden');
    if (svg[0].classList.contains('hidden')) {
      svg[1].classList.remove('hidden');
    }
    console.log(svg);
  }
}
