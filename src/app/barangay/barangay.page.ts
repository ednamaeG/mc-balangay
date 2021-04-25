import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ControlsPopOverPage } from '../controls-pop-over/controls-pop-over.page';
import { IBarangay } from '../interfaces/barangay';

@Component({
  selector: 'app-barangay',
  templateUrl: './barangay.page.html',
  styleUrls: ['./barangay.page.scss'],
})
export class BarangayPage implements OnInit {
  barangayData: IBarangay;
  selectedTab = 'History'
  constructor(private route: ActivatedRoute, private popOverCtrl: PopoverController) {
    const params = this.route.snapshot.params;
    this.barangayData = JSON.parse(params.content);

    if (this.barangayData.foundInfo) {
      this.selectedTab = this.barangayData.foundInfo.type;
    }
  }

  ngOnInit() {
  }

  selectTab(tab) {
    this.selectedTab = tab;
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
}
