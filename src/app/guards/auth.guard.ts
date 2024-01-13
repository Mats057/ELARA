import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = async (route, state: any) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (
    localStorage.getItem('token') != null &&
    localStorage.getItem('token') != undefined
  ) {
    const response = await firstValueFrom(
      auth.verifyToken(localStorage.getItem('token')!)
    );
    if ((response as any)['message'] == 'Acesso permitido!') {
      if(state.url == '/login') {
        router.navigate(['home']);
        return false;
      }
      return true;
    }
  }
  if(state.url == '/login') {
    return true;
  }
  router.navigate(['login']);
  return false;
};
