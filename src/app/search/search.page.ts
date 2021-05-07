import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, NavController, NavParams } from '@ionic/angular'
import { IBarangay } from '../interfaces/barangay';
import { HttpClient } from '@angular/common/http';
import { FilterPage } from '../filter/filter.page';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
  @ViewChild('searchBar', { static: false }) searchInput: IonSearchbar;
  data = [];
  results = []
  warningMsg = 'Enter words to search'
  constructor(private modal: ModalController, private router: Router, private route: ActivatedRoute, private navCtrl: NavController, private httpClient: HttpClient) {

  }

  async ngOnInit() {
    // this.data = this.route.snapshot.params.data;
    this.data = await this.getData();
    console.log('DATA', this.data)
    setTimeout(() => {
      this.searchInput.setFocus();
    }, 500)
  }

  closeModal() {
    this.navCtrl.pop()
  }

  async getData(): Promise<IBarangay[]> {
    return await this.httpClient.get<IBarangay[]>('./assets/mocks/barangays-mock.json').toPromise();
  }
  search(ev) {
    console.log('test')
    let query = ev.detail.value;
    if (query) {
      // this.results = this.data.filter(
      //   (data) => data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // );
      // this.results = this.data.filter(
      //   (data) => {
      //     return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 
      //   }
      // );

      this.results = this.data.filter(
        (data) => {
          const detail = data.details.find(f => {
            return f.content.toLowerCase().includes(query)
          })
          data.foundInfo = detail;
          return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || detail

        }
      );



      console.log('res1', this.results)


      // console.log('filtered',res)

      // console.log('res',detail)
      this.warningMsg = this.results.length == 0 ? "No Results Found." : "";
      console.log('results', this.results);
    }


  }

  openContent(content) {
    this.closeModal()

    if (content.foundInfo) {
      console.log(content.foundInfo)
      const found = JSON.stringify(content.foundInfo)
      const data = JSON.stringify(content)
      console.log('data', content)
      // this.router.navigate(['/tabs/tab1/content',{content:data}])
      // this.router.navigate(['/barangay-content', { data: data, name: content.name }])
      this.router.navigate(['/barangay', { content: data }])

    }
    // else {
    //   const data = JSON.stringify(content)
    //   this.router.navigate(['/tabs/tab1/content', { content: data }])
    // }

  }

  resetResults() {
    console.log('reset')
    this.results = [];
  }
  async showFilterModal() {
    const modal = await this.modal.create({
      component: FilterPage,
    
    });

    await modal.present();

    modal.onDidDismiss().then((data) =>{
      console.log('data:::',data)
    })
  }

}
