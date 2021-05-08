import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MabalacatHistoryPageRoutingModule } from './mabalacat-history-routing.module';

import { MabalacatHistoryPage } from './mabalacat-history.page';
import { GalleryPage } from '../gallery/gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MabalacatHistoryPageRoutingModule
  ],
  declarations: [MabalacatHistoryPage,GalleryPage]
})
export class MabalacatHistoryPageModule {}
