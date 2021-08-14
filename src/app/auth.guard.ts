import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { FirebaseAuthService } from './services/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private firebaseAuthSvc: FirebaseAuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.firebaseAuthSvc.getAuth()) {
      // console.log("dont enter")
      this.router.navigateByUrl("/login");
    } else {
      console.log("SHould login")
    }

    return this.firebaseAuthSvc.getAuth();

  }

}
