import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.page.html',
  styleUrls: ['./gallery-viewer.page.scss'],
})
export class GalleryViewerPage implements OnInit {
  @ViewChild('slider', { static: false }) slides: IonSlides;

  slidesOptions: any = {
    loop: false,
    zoom: {
      maxRatio: 5,
    },
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },

  };
  currentIdx = 0;
  photos = []
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {



  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    const data = this.navParams.data;
    this.photos = data.src
    this.currentIdx = data.index;
    console.log(this.currentIdx, "IMDEX")
    this.slidesOptions.initialSlide = this.currentIdx
    this.slides.slideTo(this.currentIdx)
    // this.slides.getSwiper().then(sw => sw.init()).then(() => {
    //   this.slides.slideTo(this.currentIdx,0);
    // });
  }

  closeViewer() {
    this.modalCtrl.dismiss()
  }

}
