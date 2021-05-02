import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  selected= 'history'
  slidesOptions = {
    initialSlide: 0,
    // freeMode: true,
    // loop: true,
    autoplay: true
  };
  txt = '';
  showToolbar = false;
@ViewChild('content') content : IonContent;
  constructor() {
    
   }

   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.
     this.content.scrollToTop()
   }
  selectTab(tab) {
    console.log(tab)
    this.selected =tab;
  }
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
}
  // async speak() {
  //   await this.tts.speak(this.txt)

  // }
}
