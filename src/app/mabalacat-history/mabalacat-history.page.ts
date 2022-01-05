import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { GalleryPage } from '../gallery/gallery.page';

@Component({
  selector: 'app-mabalacat-history',
  templateUrl: './mabalacat-history.page.html',
  styleUrls: ['./mabalacat-history.page.scss'],
})
export class MabalacatHistoryPage implements OnInit {
  content: any;
  selectedTab = "History";
  mabalacat_details: any;
  politicians: any;
  places: any;
  personalities: any;
  constructor(private httpClient: HttpClient, private modalController: ModalController, private afd: AngularFireDatabase, private plt: Platform, private router: Router,private route: ActivatedRoute) { }

  async ngOnInit() {
    const params = this.route.snapshot.params.tab;
    // const data = JSON.parse(params.content);

  
    this.selectedTab = params  ? params: this.selectedTab;

    console.log("Data passed::",this.selectedTab)

    this.plt.ready().then(async () => {
      
     
      var content = []
      this.afd.list('barangays/mabalacat-details').valueChanges().forEach(async (val: any[]) => {

        this.mabalacat_details = val
        console.log("MABALACAT DETAILS ALL",this.mabalacat_details)
      })

      this.afd.list('barangays/mabalacat-details/politicians').valueChanges().forEach(async (val: any[]) => {

        this.politicians = val
        console.log(this.politicians)
      })

      this.afd.list('barangays/mabalacat-details/places').valueChanges().forEach(async (val: any[]) => {

        this.places = val
        console.log(this.places)
      })

      this.afd.list('barangays/mabalacat-details/personalities').valueChanges().forEach(async (val: any[]) => {
        this.personalities = val

      })

      console.log(content)
    })

  }

  getData() {
    // return await this.httpClient.get<any>('./assets/mocks/mabalacat-details.json').toPromise();

  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  async openGallery(item) {
    console.log('content', item)
    const modal = await this.modalController.create({
      component: GalleryPage,
      componentProps: { photos: item.gallery }
    });

    await modal.present();


  }

  async openViewer(photo) {
    console.log('view photo')
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url ? photo.url : photo,
        title: photo.title ? photo.title : '',
        scheme: 'dark'
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }


  openPlaceContent(content) {

    const data = JSON.stringify(content)
    this.router.navigate(['/popular-place', { data: data }])
  }


  openPersonalityContent(content) {
    const data = JSON.stringify(content)
    this.router.navigate(['/personalities', { data: data }])
  }

  openDetails(politician){
    console.log('DETAIL',politician);
    const data = JSON.stringify(politician)
    this.router.navigate(['/municipal-mayor', { data: data }])
  }

}
