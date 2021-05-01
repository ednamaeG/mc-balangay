import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { TriviaPage } from './trivia/trivia.page';
// import { ScrollHideDirective } from './directives/scroll-hide.directive';
 


@NgModule({
  declarations: [AppComponent,TriviaPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NgxIonicImageViewerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, NativeAudio, PhotoViewer],
  bootstrap: [AppComponent],
})
export class AppModule { }
