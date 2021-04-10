import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../services/controls.service';

@Component({
  selector: 'app-controls-pop-over',
  templateUrl: './controls-pop-over.page.html',
  styleUrls: ['./controls-pop-over.page.scss'],
})
export class ControlsPopOverPage implements OnInit {
 
  fontSize ;
  constructor(private controlsSvc:ControlsService) { }

  ngOnInit() {
    this.fontSize =  this.controlsSvc.fontSize$.getValue()
  }

  increaseFont() {
    this.fontSize += 2;
    this.controlsSvc.fontSize$.next(this.fontSize);
    console.log('fontsize',this.fontSize)
  }

  decreaseFont() {
    this.fontSize -= 2;
    this.controlsSvc.fontSize$.next(this.fontSize);
    console.log('fontsize',this.fontSize)
  }

}
