import { SearchPage } from './../search/search.page';
import { HTTP } from '@ionic-native/http/ngx';
import { Component } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IBarangayDetail,IBarangay } from '../interfaces/barangay';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data = [];
  searchResults = [];

  barangayList:IBarangay[] = [];
  constructor(
    private http: HTTP,
    private plt: Platform,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.plt.ready().then(async () => {
      this.barangayList = await this.getData();

      console.log('data:::', this.barangayList);
    });
  }

 

  async getData(): Promise<IBarangay[]> {
    return await this.httpClient.get<IBarangay[]>('./assets/mocks/barangays-mock.json').toPromise();
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
    // const modal = await this.modalCtrl.create({
    //   component: SearchPage,
    //   componentProps: {
    //     data: this.barangayList,
    //   },
    // });
    // return await modal.present();
     this.router.navigate(['/search']);
  }

  openContent(content) {
    console.log('open')
    const data = JSON.stringify(content)
    this.router.navigate(['/barangay', { content: data }])
  }
}
