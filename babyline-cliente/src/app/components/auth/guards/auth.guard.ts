import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router)

  auth.isAuthenticated() ? true : router.navigate(['/login'])

  console.log(auth.isAuthenticated());
  return auth.isAuthenticated();
};
