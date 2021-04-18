import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ControlsComponent } from '../components/controls/controls.component';
import { ControlsPopOverPage } from '../controls-pop-over/controls-pop-over.page';
import { ControlsService } from '../services/controls.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-barangay-content',
  templateUrl: './barangay-content.page.html',
  styleUrls: ['./barangay-content.page.scss'],
})
export class BarangayContentPage implements OnInit {
  details: any;
  barangayName: string;
  slidesOptions = {
    initialSlide: 0,
    autoHeight:true,
    // freeMode: true,
    autoplay: true,
    loop:false
  };
  fontSize:any;
  constructor(private route: ActivatedRoute, private popOverCtrl: PopoverController,private controlSvc:ControlsService,private photoViewer:PhotoViewer) { }

  ngOnInit() {
    this.details = JSON.parse(this.route.snapshot.params.data);
    this.barangayName = this.route.snapshot.params.name;
    console.log('details', this.details, this.barangayName);
    this.controlSvc.fontSize$.subscribe((font) =>{
      this.fontSize= font;
      console.log('size',this.fontSize)
    })
  }

  async showControls(ev) {
    const popover = await this.popOverCtrl.create({
      component: ControlsPopOverPage,
      event: ev,
      mode:"ios"
     });

    await popover.present();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('ondestroyed')
  }

  viewPhoto(photoUrl){
    console.log('url',photoUrl)
    this.photoViewer.show(photoUrl, 'My image title', {share: false});

  }

}
