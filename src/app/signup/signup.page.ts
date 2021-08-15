import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: '';
  email: '';
  pword: ''
  constructor(private firebaseAuthSvc: FirebaseAuthService, private router: Router, private alertCtrl: AlertController,private navCtrl: NavController) { }

  ngOnInit() {
  }

  async registerWithFirebase() {
    const credentials = {
      name: this.name,
      email: this.email,
      password: this.pword
    }
    try {
      const user = await this.firebaseAuthSvc.signUp(credentials);
      this.navCtrl.pop()
      this.router.navigateByUrl("/tabs",{replaceUrl: true})
    } catch (err) {
      this.presentAlert()
    }

  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'MC Balangay',
      subHeader: 'Unable to Register',
      message: 'Invalid Email or Password',
      buttons: ['OK']
    });

    await alert.present();
  }
}
