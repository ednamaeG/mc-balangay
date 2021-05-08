import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(private httpClient: HttpClient, private modalController: ModalController) { }

  async ngOnInit() {
    this.content = await this.getData()
    console.log('content', this.content)
  }

  async getData(): Promise<any> {
    return await this.httpClient.get<any>('./assets/mocks/mabalacat-details.json').toPromise();
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  async openGallery() {
    console.log('content', this.content.fiesta.gallery)
    const modal = await this.modalController.create({
      component: GalleryPage,
      componentProps: { photos: this.content.fiesta.gallery }
    });

    await modal.present();


  }

  async openViewer(photo){
    console.log('view photo')
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url ? photo.url : photo,
        title:photo.title ? photo.title : '',
        scheme:'dark'
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });
 
    return await modal.present();
  }
}
