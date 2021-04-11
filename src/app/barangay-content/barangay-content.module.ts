import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarangayContentPageRoutingModule } from './barangay-content-routing.module';

import { BarangayContentPage } from './barangay-content.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarangayContentPageRoutingModule,
    NgxIonicImageViewerModule
  ],
  declarations: [BarangayContentPage]
})
export class BarangayContentPageModule {}
