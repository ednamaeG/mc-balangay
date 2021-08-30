import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ModalController, PopoverController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ControlsPopOverPage } from '../controls-pop-over/controls-pop-over.page';
import { ControlsService } from '../services/controls.service';
import { slideOpts } from '../animations/slideAnimations'
@Component({
  selector: 'app-popular-place',
  templateUrl: './popular-place.page.html',
  styleUrls: ['./popular-place.page.scss'],
})
export class PopularPlacePage implements OnInit {
  details: any;
  barangayName: string;
  slidesOptions = slideOpts;

  fontSize: any;
  constructor(private route: ActivatedRoute, private popOverCtrl: PopoverController, private controlSvc: ControlsService, private modalController: ModalController) { }

  ngOnInit() {
    this.details = JSON.parse(this.route.snapshot.params.data);
    // this.barangayName = this.route.snapshot.params.name;
    console.log('details', this.details,);
    this.controlSvc.fontSize$.subscribe((font) => {
      this.fontSize = font;
      console.log('size', this.fontSize)
    })
  }

  async showControls(ev) {
    const popover = await this.popOverCtrl.create({
      component: ControlsPopOverPage,
      event: ev,
      mode: "ios"
    });

    await popover.present();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('ondestroyed')
  }

  async openViewer(photo) {
    console.log('view photo')
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url,
        title: photo.title,
        scheme: 'dark'
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

}
