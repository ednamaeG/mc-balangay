
import { HTTP } from '@ionic-native/http/ngx';
import { Component } from '@angular/core';
import { LoadingController, MenuController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IBarangayDetail, IBarangay } from '../interfaces/barangay';
import { BASE_URL } from '../../environments/environment';
import { BarangayService } from '../services/barangay.service';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data = [];
  searchResults = [];
  photoBaseURL = `${BASE_URL}/images/`;
  testData = []
  barangayList: IBarangay[] = [];
  constructor(
    private http: HTTP,
    private plt: Platform,
    private menu: MenuController,
    private modalCtrl: ModalController,
    private router: Router,
    private httpClient: HttpClient,
    private barangaySvc: BarangayService,
    private afd: AngularFireDatabase,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.plt.ready().then(async () => {
      // this.barangayList = await this.getData();
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();

      this.afd.list('barangays/barangay_data').valueChanges().forEach(async (val: IBarangay[]) => {
         const list = val;
        this.barangayList = list.filter((l) => Number(l.status) == 1);
        await loading.dismiss()
      })
    });
  }



  async getData(): Promise<IBarangay[]> {
    return await this.httpClient.get<IBarangay[]>('./assets/mocks/barangays-mock.json').toPromise();
  }


  async getDataFromApi() {
    const address = `http://192.168.100.11:8000/api/barangays`;
    console.log('address', address)
    try {
      const res = await this.http.get(address, {}, {});
      console.log("res", res);
    } catch (err) {
      console.log('err', err)
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
    this.router.navigate(['/search']);
  }

  openContent(content) {
    console.log('open')
    const data = JSON.stringify(content)
    this.router.navigate(['/barangay', { content: data }])
  }


}
