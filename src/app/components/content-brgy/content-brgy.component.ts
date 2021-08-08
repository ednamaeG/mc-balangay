import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { IBarangay, IBarangayDetail } from 'src/app/interfaces/barangay';
import { ControlsService } from 'src/app/services/controls.service';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { BASE_URL } from 'src/environments/environment';
const { Network } = Plugins;

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
  @Input() barangayData: IBarangay;
  fontSize:any;
  networkListener: PluginListenerHandle;
  networkStatus: any;
  photoBaseURL = `${BASE_URL}`
  constructor(private controlSvc:ControlsService,private modalController:ModalController,private sanitizer:DomSanitizer) {

  }

  async ngOnInit() {
    console.log('content',this.content)
    this.controlSvc.fontSize$.subscribe((font) =>{
      this.fontSize= font;
      console.log('size',this.fontSize)
    })

    this.networkStatus = await Network.getStatus();
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      console.log('Network status changed', status);
    });
  }

  async openViewer(photo){
    console.log('view photo')
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: photo.url ? photo.url : photo,
        title:photo.title ? photo.title : '',
        scheme:'dark'
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  sanitizedUrl(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
