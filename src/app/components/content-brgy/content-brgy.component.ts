import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { IBarangayDetail } from 'src/app/interfaces/barangay';
import { ControlsService } from 'src/app/services/controls.service';

@Component({
  selector: 'app-content-brgy',
  templateUrl: './content-brgy.component.html',
  styleUrls: ['./content-brgy.component.scss'],
})
export class ContentBrgyComponent implements OnInit {
  slidesOptions = {
    initialSlide: 0,
    // freeMode: true,
    // loop: true,
    autoplay: true,
    autoHeight:true
  };
  @Input() content: IBarangayDetail;
  fontSize:any;
  constructor(private controlSvc:ControlsService,private modalController:ModalController) { 
 
  }

  ngOnInit() {
    console.log('content',this.content)
    this.controlSvc.fontSize$.subscribe((font) =>{
      this.fontSize= font;
      console.log('size',this.fontSize)
    })
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
