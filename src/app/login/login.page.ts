import { Component, OnInit } from '@angular/core';
// import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import "@cyril-colin/capacitor-google-auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo = null;
  constructor(private fireAuth: AngularFireAuth, private afd: AngularFireDatabase,
    private firebaseSvc: FirebaseAuthService,
    private router: Router,
    private navCtrl: NavController

  ) { }

  ngOnInit() {

  }

  async googleSignIn() {
    let googleUser = await Plugins.GoogleAuth.signIn();
    console.log('my user: ', googleUser);
    const { idToken, accessToken } = googleUser.authentication;
    this.firebaseSvc.onGoogleLoginSuccess(idToken, accessToken)

    this.firebaseSvc.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) {
        this.navCtrl.pop()
        this.router.navigate(['/tabs'], { replaceUrl: true })
      }
    })

  }





}
