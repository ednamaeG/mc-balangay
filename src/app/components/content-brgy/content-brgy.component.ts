import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { IBarangay, IBarangayDetail } from 'src/app/interfaces/barangay';
import { ControlsService } from 'src/app/services/controls.service';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';

import { BASE_URL } from 'src/environments/environment';
const { Network } = Plugins;

@Component({
  selector: 'app-content-brgy',
  templateUrl: './content-brgy.component.html',
  styleUrls: ['./content-brgy.component.scss'],
})
export class ContentBrgyComponent implements OnInit {
  @ViewChild('sliderMain', { static: false }) slides: IonSlides;

  slidesOptions = {
    initialSlide: 0,
    // freeMode: true,
    // loop: true,
    // autoplay: true,

    autoHeight: true,
    controller: {
      by: 'container',
    },
  };
  totalSlides = 0;
  @Input() content: IBarangayDetail;
  @Input() barangayData: IBarangay;
  fontSize: any;
  networkListener: PluginListenerHandle;
  networkStatus: any;
  photoBaseURL = `${BASE_URL}`;
  constructor(
    private controlSvc: ControlsService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {

    console.log('content', this.content, this.barangayData.logo_url);
    this.controlSvc.fontSize$.subscribe((font) => {
      this.fontSize = font;
      console.log('size', this.fontSize);
    });

    this.networkStatus = await Network.getStatus();
    this.networkListener = Network.addListener(
      'networkStatusChange',
      (status) => {
        this.networkStatus = status;
        console.log('Network status changed', status);
      }
    );

    this.totalSlides = this.content.videoUrl ? this.content.photos.length + 1 : this.content.photos.length;


    let p = document.querySelector('iframe');
    const options: GestureConfig = {
      el: p,
      gestureName: 'tinder-swipe',
      onStart: () => {
        // do something as the gesture begins
        alert('swipe on start');
      },
      onMove: (ev) => {
        // do something in response to movement
      },
      onEnd: (ev) => {
        // do something when the gesture ends
      },
    };
    const gesture: Gesture = await createGesture(options);
    gesture.enable();
  }

  async openViewer(photo) {
    console.log('view photo');
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url ? photo.url : photo,
        title: photo.title ? photo.title : '',
        scheme: 'dark',
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true,
    });

    return await modal.present();
  }

  sanitizedUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onMove(d) {
    console.log(d);
  }

  testSwipe(e) {
    alert('PAN');
  }

  slideNext() {
    this.slides
      .getSwiper()
      .then((sw) => sw.init())
      .then(() => {
        this.slides.slideNext();
      });
  }
  slidePrev() {
    this.slides
      .getSwiper()
      .then((sw) => sw.init())
      .then(() => {
        this.slides.slidePrev();
      });
  }
}
