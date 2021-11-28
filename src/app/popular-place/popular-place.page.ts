import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { IonSlides, ModalController, PopoverController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { ControlsPopOverPage } from '../controls-pop-over/controls-pop-over.page';
import { ControlsService } from '../services/controls.service';
import { slideOpts } from '../animations/slideAnimations';
import { Network } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-popular-place',
  templateUrl: './popular-place.page.html',
  styleUrls: ['./popular-place.page.scss'],
})
export class PopularPlacePage implements OnInit {
  details: any;
  barangayName: string;
  slidesOptions = slideOpts;
  networkStatus: any;

  networkListener: any;
  fontSize: any;
  totalSlides = 0;
  @ViewChild('silderPlaces', { static: false }) slides: IonSlides;

  constructor(
    private route: ActivatedRoute,
    private popOverCtrl: PopoverController,
    private controlSvc: ControlsService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.details = JSON.parse(this.route.snapshot.params.data);
    // this.barangayName = this.route.snapshot.params.name;
    console.log('details', this.details);
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

    this.totalSlides = this.details.videoUrl ? this.details.photos.length + 1 : this.details.photos.length;

    
  }

  async showControls(ev) {
    const popover = await this.popOverCtrl.create({
      component: ControlsPopOverPage,
      event: ev,
      mode: 'ios',
    });

    await popover.present();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('ondestroyed');
  }

  async openViewer(photo) {
    console.log('view photo');
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url,
        title: photo.title,
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
