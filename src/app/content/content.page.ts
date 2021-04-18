import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBarangay } from '../interfaces/barangay';
import {slideOpts} from '../animations/slideAnimations'
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  data: IBarangay;

  slideOptions = slideOpts;
  constructor(private route: ActivatedRoute, private router: Router,private modalController:ModalController) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.data = JSON.parse(params.content);
     
  }

  // openContent(i) {
  //   this.items[i].isOpen = !this.items[i].isOpen
  // }

  viewDetails(detail) {
    const data = JSON.stringify(detail);
    console.log(detail)
    const routeName = detail.type == 'Politicians' ? '/politicians' : '/barangay-content'
    this.router.navigate([routeName, { data: data, name: this.data.name }])
  }

  getIconName(type) {
    if (type.toLowerCase() == 'history') {
      return {
        source: 'assets/icon/pillar.svg',
        color: 'primary'
      }
    } else if (type.toLowerCase() == 'fiesta') {
      return {
        source: 'assets/icon/fiesta-icon.svg',
        color: 'warning'
      }
    } if (type.toLowerCase() == 'politicians') {
      return { source: 'assets/icon/speak-speech.svg', color: '' }
    } if (type.toLowerCase() == 'first family residence') {
      return { source: 'assets/icon/home-house.svg', color: '' }
    } if (type.toLowerCase() == 'branding') {
      return { source: 'assets/icon/poster.svg', color: '' }
    }
  }

  async openViewer(photo){
    console.log('view photo')
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url,
        title:photo.title,
        scheme:'dark'
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });
 
    return await modal.present();
  }
}
