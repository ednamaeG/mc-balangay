import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ControlsService } from '../services/controls.service';

@Component({
  selector: 'app-municipal-mayor',
  templateUrl: './municipal-mayor.page.html',
  styleUrls: ['./municipal-mayor.page.scss'],
})
export class MunicipalMayorPage implements OnInit {
  details: any;
  fontSize: any;
  constructor(private route: ActivatedRoute, private popOverCtrl: PopoverController, private controlSvc: ControlsService, private modalController: ModalController) { }

  ngOnInit() {
    this.details = JSON.parse(this.route.snapshot.params.data);
    console.log('details', this.details,);
    this.controlSvc.fontSize$.subscribe((font) => {
      this.fontSize = font;
    })
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
