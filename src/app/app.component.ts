import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    

  }

  setTheme(ev?: any){
    console.log('seet theme',ev)
    // let sDark = window.matchMedia("(prefers-color-scheme: dark)")
    if(ev.detail.checked){
      document.body.setAttribute('color-theme','dark')
    }else{
      document.body.setAttribute('color-theme','light')
    }
   
  }
  
}
