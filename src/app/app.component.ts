import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage = "/tabs/tab1";
  otherTabs = ["/tabs/tab1", "/tabs/tab2", "/tabs/tab1/content"];
  constructor(private plt: Platform, private router: Router, private alertController: AlertController, private navCtrl: NavController) {

    console.log(plt.width(), plt.height())

    this.captureBackButton()
  }

  setTheme(ev?: any) {
    // let sDark = window.matchMedia("(prefers-color-scheme: dark)")
    if (ev.detail.checked) {
      document.body.setAttribute('color-theme', 'dark')
    } else {
      document.body.setAttribute('color-theme', 'light')
    }

  }

  captureBackButton() {
    document.addEventListener("backbutton", () => {
      console.log(this.router.url)
      if (this.router.url === this.rootPage) {
        this.presentExitDialog()
      } else if (this.otherTabs.find(tab => this.router.url ==tab )) {
        this.router.navigate([this.rootPage], { replaceUrl: true })
      } else {
        console.log('pop')
        this.navCtrl.pop()
      }
    }, false)
  }

  async presentExitDialog() {
    const alert = await this.alertController.create({
      header: 'MCC 101 E-Learning',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            navigator['app'].exitApp()
          }
        }, {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
      ]
    });

    await alert.present();
  }


}
