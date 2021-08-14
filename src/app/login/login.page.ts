import { Component, OnInit } from '@angular/core';
// import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import "@cyril-colin/capacitor-google-auth";
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo = null;
  constructor(private fireAuth: AngularFireAuth, private afd: AngularFireDatabase,

  ) { }

  ngOnInit() {

  }

  async googleSignup() {
    let googleUser = await Plugins.GoogleAuth.signIn();
    console.log('my user: ', googleUser);
    const { idToken, accessToken } = googleUser.authentication;
    this.onLoginSuccess(idToken, accessToken)
  }

  async onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        // this.isGoogleLogin = true;
        this.userInfo = success.user;
        console.log(this.userInfo)
        // this.loading.dismiss();
        this.registerUser()
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


    const ref = this.afd.database.ref("users/").child(uid).set(user)
  }

}
