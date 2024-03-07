import { CanActivateFn } from '@angular/router';

export const cartGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart') || '[]').length > 0) {
    return true;
  }
  return false;
};
