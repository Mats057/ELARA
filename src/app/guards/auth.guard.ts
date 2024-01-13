import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const response = await firstValueFrom(
    auth.verifyToken(localStorage.getItem('token')!)
  );
  if ((response as any)['message'] == 'Acesso permitido!') {
    return true;
  }
  router.navigate(['login']);
  return false;
};
