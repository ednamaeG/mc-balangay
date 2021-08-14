
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private firebaseAuthSvc: FirebaseAuthService, private router: Router) { }

  canLoad(): boolean {
    if (!this.firebaseAuthSvc.getAuth()) {
      console.log("dont enter")
     return true;
    }

    // return true;


  }
}
