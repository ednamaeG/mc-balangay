import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, PopoverController } from '@ionic/angular';
import { ControlsPopOverPage } from '../controls-pop-over/controls-pop-over.page';
import { IBarangay } from '../interfaces/barangay';

import { ScrollHideConfig } from '../directives/scroll-hide.directive'

@Component({
  selector: 'app-barangay',
  templateUrl: './barangay.page.html',
  styleUrls: ['./barangay.page.scss'],
})
export class BarangayPage implements OnInit {
  barangayData: IBarangay;
  selectedTab = 'History'
  hidden: boolean = false;
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  @ViewChild('content') content: IonContent;
  constructor(private route: ActivatedRoute, private popOverCtrl: PopoverController) {
    const params = this.route.snapshot.params;
    this.barangayData = JSON.parse(params.content);
    console.log(this.barangayData ,"BARANGAY DATA")

    if (this.barangayData.foundInfo) {
      this.selectedTab = this.barangayData.foundInfo.type;
    }else{
      this.selectedTab = "History"
    }
  }

  ngOnInit() {
    const idx = this.barangayData.details.findIndex(detail => detail.type == 'Politicians');
    console.log('index', idx)
    if(!this.barangayData.details[idx].politicians){
      this.barangayData.details.splice(idx,1)
    }
  }


  selectTab(tab) {

    this.selectedTab = tab;
    this.content.scrollToTop()
  }

  async showControls(ev) {
    const popover = await this.popOverCtrl.create({
      component: ControlsPopOverPage,
      event: ev,
      mode: "ios"
    });

    await popover.present();
  }


  getIconName(type) {
    if (type.toLowerCase() == 'history') {
      return 'assets/icon/pillar.svg'

    } else if (type.toLowerCase() == 'fiesta') {
      return 'assets/icon/fiesta-icon.svg'

    } if (type.toLowerCase() == 'politicians') {
      return 'assets/icon/speak-speech.svg'
    } if (type.toLowerCase() == 'first family residence') {
      return 'assets/icon/home-house.svg'
    } if (type.toLowerCase() == 'branding') {
      return 'assets/icon/poster.svg'
    }
  }
  onScroll(e) {
    // console.log('e', e.detail.scrollTop)
    // if (e.detail.scrollTop > 0) {
    //   this.hidden = true;
    // } else {
    //   this.hidden = false;
    // }
  }
}
