import { resolve } from '@angular-devkit/core';
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

        // this.isGoogleLogin = true;
        this.userInfo = success.user;

        _self.isAuthenticated$.next(true);

        // _self.userDetails$.next(this.userInfo)
        _self.isAuthenticated = true;

        // this.loading.dismiss();
        this.checkUserDetails(this.userInfo.uid)
      });



  }

  async _loginWithEmail(email, password) {
    console.log(email, password)
    const self = this;
    this.fireAuth.signInWithEmailAndPassword(email, password).then((success) => {
      self.userInfo = success.user;
      self.isAuthenticated$.next(true);
      this.checkUserDetails(this.userInfo.uid)

    }).catch((err) => {
      console.log("ERR", err)
      self.isAuthenticated$.next(false);

    })
  }

  async loginWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      const self = this;
      this.fireAuth.signInWithEmailAndPassword(email, password).then((success) => {
        self.userInfo = success.user;
        self.isAuthenticated$.next(true);
        this.checkUserDetails(this.userInfo.uid)
        resolve(true)

      }).catch((err) => {
        console.log("ERR", err)
        reject(false)
      })
    })

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
    console.log("UID", uid)
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

  signUp(details){
    const {email,password,name} = details;
    return new Promise((resolve, reject) => {
      const self = this;
      this.fireAuth.createUserWithEmailAndPassword(email,password).then((success) => {
          const user = {
            displayName: name,
            email: success.user.email,
            uid: success.user.uid,
            phoneNumber: success.user.phoneNumber,
            photoURL: success.user.photoURL
          }
          self.userInfo = user;
          // self.userInfo.displayName = name;
          console.log("success",self.userInfo)
          self.isAuthenticated$.next(true);
          this.checkUserDetails(this.userInfo.uid)
          resolve(true)

        }).catch((err) => {
          console.log("ERR", err)
          reject(false)
        })
      // this.fireAuth.signInWithEmailAndPassword(email, password).then((success) => {
      //   self.userInfo = success.user;
      //   self.isAuthenticated$.next(true);
      //   this.checkUserDetails(this.userInfo.uid)
      //   resolve(true)

      // }).catch((err) => {
      //   console.log("ERR", err)
      //   reject(false)
      // })
    })

  }

}
