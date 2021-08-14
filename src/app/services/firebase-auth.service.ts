import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  userInfo = null;

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userDetails$: BehaviorSubject<any> = new BehaviorSubject(null);
  isAuthenticated: boolean = false;

  constructor(private fireAuth: AngularFireAuth, private afd: AngularFireDatabase) { }

  // setLoginTrue() {
  //   this.isAuthenticated = !!true;
  //   this.isAuthenticated$.next(true);
  // }

  async onGoogleLoginSuccess(accessToken, accessSecret) {
    const _self = this;
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        // this.isGoogleLogin = true;
        this.userInfo = success.user;

        _self.isAuthenticated$.next(true);

        // _self.userDetails$.next(this.userInfo)
        _self.isAuthenticated = true;

        // this.loading.dismiss();
        this.checkUserDetails(this.userInfo.uid)




      });



  }

  async registerUser() {
    const { displayName, phoneNumber, email, photoURL, uid } = this.userInfo;
    const user = {
      name: displayName,
      phoneNumber: phoneNumber,
      email: email,
      id: uid,
      photoURL: photoURL

    }


    const ref = this.afd.database.ref("users/").child(uid).set(user);
    ref.then((res) => {
      console.log(user, 'REgister')
      this.userDetails$.next(user)
    }).catch((err) => {
      console.log("error", err)
    })
  }

  checkUserDetails(uid) {
    const ref = this.afd.database.ref("users/").child(uid);
    var user;
    const self = this;
    console.log("UID",uid)
    ref.once("value", function (snapshot) {
      // this.userDetails$.next(snapshot.val())
      if (snapshot.val()) {
        self.userDetails$.next(snapshot.val())
      } else {
        self.registerUser()
      }

    });

  }

  getAuth() {
    var isLoggedIn = false;
    this.isAuthenticated$.subscribe((val) => {
      console.log("VAL:::", val)
      isLoggedIn = val
    })
    return isLoggedIn;
  }

}
