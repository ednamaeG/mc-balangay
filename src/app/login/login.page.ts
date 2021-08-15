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
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo = null;
  email: string = "";
  password: string = "";
  constructor(private fireAuth: AngularFireAuth, private afd: AngularFireDatabase,
    private firebaseSvc: FirebaseAuthService,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController

  ) { }

  ngOnInit() {

  }

  async googleSignIn() {
    let googleUser = await Plugins.GoogleAuth.signIn();

    const { idToken, accessToken } = googleUser.authentication;
    this.firebaseSvc.onGoogleLoginSuccess(idToken, accessToken)

    this.firebaseSvc.isAuthenticated$.subscribe((auth) =>{
      if(auth){
        this.navCtrl.pop()
        this.router.navigateByUrl("/tabs",{ replaceUrl: true })

      }
    })

  }


  async loginEmail() {
    try{
      const auth = await this.firebaseSvc.loginWithEmail(this.email, this.password);
      console.log(auth,"Auth")
      this.navCtrl.pop()
      this.router.navigate(['/tabs'], { replaceUrl: true })
    }catch(err){
      this.presentAlert()
    }
  }

  // async subscribeAuth() {
  //   if(this.firebaseSvc.getAuth()){
  //     this.router.navigate(['/tabs'], { replaceUrl: true })
  //   }else{
  //     this.presentAlert()
  //   }

  // }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'MC Balangay',
      subHeader: 'Unable to Login',
      message: 'Invalid Email or Password',
      buttons: ['OK']
    });

    await alert.present();
  }
}
