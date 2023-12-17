import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';


export const authGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);
  const email = localStorage.getItem('email');
  if (!email) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
