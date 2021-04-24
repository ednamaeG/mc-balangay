import { Component } from '@angular/core';


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
  constructor() { }

  selectTab(tab) {
    console.log(tab)
    this.selected =tab;
  }
  // async speak() {
  //   await this.tts.speak(this.txt)

  // }
}
