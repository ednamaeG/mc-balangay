import { SearchPage } from './../search/search.page';
import { HTTP } from '@ionic-native/http/ngx';
import { Component } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data = [];
  searchResults = [];
  constructor(
    private http: HTTP,
    private plt: Platform,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private router:Router
  ) {}

  ngOnInit() {
    console.log('get');
    this.plt.ready().then(async () => {
      this.data = await this.getRandomPics();
      console.log('data:::', this.data);
    });
  }

  async getRandomPics() {
    try {
      const res = await this.http.get('https://picsum.photos/v2/list', {}, {});
      return JSON.parse(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  getResults(ev) {
    console.log(ev.detail.value);
    const query = ev.detail.value;
    this.searchResults = this.data.filter(
      (data) => data.author.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    console.log('results', this.searchResults);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      componentProps: {
        data: this.data,
      },
    });
    return await modal.present();
  }

  openContent(content){
    console.log('open')
    const data = JSON.stringify(content)
    this.router.navigate(['/tabs/tab1/content',{content:data}])
  }
}
