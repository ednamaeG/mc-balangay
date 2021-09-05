import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { GalleryViewerPageModule } from '../gallery-viewer/gallery-viewer.module';
import { GalleryViewerPage } from '../gallery-viewer/gallery-viewer.page';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  photos = []
  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.photos = this.navParams.get("photos")
    console.log('photos', this.photos)
  }

  closeModal() {
    this.modalController.dismiss()
  }

  async openViewer(photos,i) {
    console.log('view photo')
    // const modal = await this.modalController.create({
    //   component: ViewerModalComponent,
    //   componentProps: {
    //     src: photoUrl,
    //     scheme: 'dark'
    //   },
    //   cssClass: 'ion-img-viewer',
    //   keyboardClose: true,
    //   showBackdrop: true
    // });

    // await modal.present()

    console.log('view photo')
    const modal = await this.modalController.create({
      component: GalleryViewerPage,
      componentProps: {
        src: photos,
        scheme: 'dark',
        index: i
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    await modal.present()
  }
}
