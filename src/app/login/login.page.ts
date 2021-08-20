import { Component, OnInit } from '@angular/core';
// import "@codetrix-studio/capacitor-google-auth";
import { Plugins, registerWebPlugin } from '@capacitor/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import "@cyril-colin/capacitor-google-auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Route } from '@angular/compiler/src/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

// import { FacebookLogin } from '@rdlabo/capacitor-facebook-login';
// import { registerWebPlugin } from '@capacitor/core';
import { FacebookLoginPlugin } from '@capacitor-community/facebook-login';

import { FacebookLogin } from '@capacitor-community/facebook-login';
import { HttpClient } from '@angular/common/http';

registerWebPlugin(FacebookLogin);
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo = null;
  email: string = "";
  password: string = "";
  fbLogin: FacebookLoginPlugin;
  token = null;
  result;
  constructor(private fireAuth: AngularFireAuth, private afd: AngularFireDatabase,
    private firebaseSvc: FirebaseAuthService,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {


  }

  async googleSignIn() {
    let googleUser = await Plugins.GoogleAuth.signIn();

    const { idToken, accessToken } = googleUser.authentication;
    this.firebaseSvc.onGoogleLoginSuccess(idToken, accessToken)

    this.firebaseSvc.isAuthenticated$.subscribe((auth) => {
      if (auth) {
        this.navCtrl.pop()
        this.router.navigateByUrl("/tabs", { replaceUrl: true })

      }
    })

  }

  async fbSiginIn() {
    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    if (result.accessToken) {
      this.getCurrentToken()
    }

  }

  async getCurrentToken() {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();
    console.log("result", result)
    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();



    } else {
      // Not logged in.
    }
  }

  async _fbSiginIn(): Promise<void> {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];

    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {
      let user = { token: result.accessToken.token, userId: result.accessToken.userId }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          userinfo: JSON.stringify(user)
        }
      };
      // this.router.navigate(["/home"], navigationExtras);
      alert(JSON.stringify(user))
      this.router.navigateByUrl("/tabs", { replaceUrl: true })
    } else {
      alert(result)
    }
  }

  async loadUserData() {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
    this.http.get(url).subscribe(res => {

      this.userInfo = res
      this.firebaseSvc.onFbLoginSuccess(this.userInfo)

      this.router.navigateByUrl("/tabs", { replaceUrl: true })

    });
  }


  async loginEmail() {
    try {
      const auth = await this.firebaseSvc.loginWithEmail(this.email, this.password);

      this.navCtrl.pop()
      this.router.navigate(['/tabs'], { replaceUrl: true })
    } catch (err) {
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
