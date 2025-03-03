import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToasterService } from '../services/toaster/toaster.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toaster = inject(ToasterService);

  if(!auth.validateToken()) {
    toaster.show("User session expired", 'danger');
    router.navigate(['login']);
    return false;
  }
  return true;
};
