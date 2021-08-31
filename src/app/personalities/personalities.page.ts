import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ControlsPopOverPage } from '../controls-pop-over/controls-pop-over.page';
import { ControlsService } from '../services/controls.service';

@Component({
  selector: 'app-personalities',
  templateUrl: './personalities.page.html',
  styleUrls: ['./personalities.page.scss'],
})
export class PersonalitiesPage implements OnInit {
  details: any;
  barangayName: string;


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

    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo,
        scheme: 'dark'
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

}
