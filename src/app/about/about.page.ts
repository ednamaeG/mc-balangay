import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  names = ["Kricyra Limjuco","Dolly Jean Balenton","Maria Lorraine Dingal","John Ericson Canlas","Jonel Valdez"]
  constructor() { }

  ngOnInit() {
  }

}
