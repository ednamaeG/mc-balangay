import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { ITrivia } from './interfaces/trivia';
import { SettingsService } from './services/settings.service';
import { TriviaService } from './services/trivia.service';
import { TriviaPage } from './trivia/trivia.page';
import {environment,apiUrl} from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage = "/tabs/tab1";
  otherTabs = ["/tabs/tab1", "/tabs/tab2", "/tabs/tab1/content"];
  settings:any;
  constructor(private plt: Platform, private triviaSvc: TriviaService, private router: Router, private settingSvc: SettingsService, private alertController: AlertController, private navCtrl: NavController, private httpClient: HttpClient, private modalCtrl: ModalController) {
    this.getEnv()
    console.log(plt.width(), plt.height())

    this.captureBackButton()
  }

  async setTheme(ev?: any) {
    // let sDark = window.matchMedia("(prefers-color-scheme: dark)")
    let theme = "";
    if (ev.detail.checked) {
      document.body.setAttribute('color-theme', 'dark')
      theme = "dark"

    } else {
      document.body.setAttribute('color-theme', 'light')
      theme = "light"
    }
    const setting = {
      theme: theme
    }
    this.settingSvc.storeSettings(setting)

  }
  async ngOnInit() {
    this.plt.ready().then(async () => {
      // get settings
    this.settings  =await this.settingSvc.getSettings()
      console.log('setting',this.settings);
      if(this.settings){
        document.body.setAttribute('color-theme',this.settings.theme)
      }

      let trivias = await this.triviaSvc.getTrivias();
      console.log('trivias::', trivias)
      if (!trivias) {
        trivias = await this.getTrivias();
        await this.triviaSvc.storeTrivias(trivias);
      }

      trivias = trivias.sort(() => {
        return 0.8 - Math.random()
      })
      // debugmode
      // trivias = await this.getTrivias();

      const trivia = trivias.find(trivia => trivia.isAnswered == false)

      if (trivia) {
        this.presentTriviaModal(trivia)
      }

    })

  }

  captureBackButton() {
    document.addEventListener("backbutton", () => {
      console.log(this.router.url)
      if (this.router.url === this.rootPage) {
        this.presentExitDialog()
      } else if (this.otherTabs.find(tab => this.router.url == tab)) {
        this.router.navigate([this.rootPage], { replaceUrl: true })
      } else {
        console.log('pop')
        // this.navCtrl.pop()
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

  async getTrivias(): Promise<ITrivia[]> {
    return await this.httpClient.get<ITrivia[]>('./assets/mocks/trivias.json').toPromise();
  }

  async presentTriviaModal(trivia) {
    const modal = await this.modalCtrl.create({
      component: TriviaPage,
      componentProps: { value: trivia }
    });

    await modal.present();

  }

  async initTrivias() {
    const trivias = await this.getTrivias();
    await this.triviaSvc.storeTrivias(trivias);
  }

  getEnv(){
    console.log(apiUrl)
  }

}
