import { CanActivateFn } from '@angular/router';

export const cartGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('bag') && JSON.parse(localStorage.getItem('bag') || '[]').length > 0) {
    return true;
  }
  return false;
};
