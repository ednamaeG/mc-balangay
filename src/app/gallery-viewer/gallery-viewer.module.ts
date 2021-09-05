import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryViewerPageRoutingModule } from './gallery-viewer-routing.module';

import { GalleryViewerPage } from './gallery-viewer.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryViewerPageRoutingModule,
    NgxIonicImageViewerModule, PinchZoomModule
  ],
  declarations: [GalleryViewerPage]
})
export class GalleryViewerPageModule { }
