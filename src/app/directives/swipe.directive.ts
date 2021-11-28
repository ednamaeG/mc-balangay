import { Directive, ElementRef } from '@angular/core';
import "hammerjs";

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {
  itemEl: HTMLElement;
  _hammer: HammerManager;
  constructor(el: ElementRef) { 
    this.itemEl = el.nativeElement;
  
  }

  ngOnInit() {
    this._hammer = new Hammer.Manager(this.itemEl);
    var swipe = new Hammer.Swipe();
    this._hammer.add([swipe]);
  
    this._hammer.on("swipeleft", (e) => {
      alert('swipe left')
    }); 
  
    this._hammer.on("swiperight", (e) => {
      alert('swipe right')
    });
   }
}
