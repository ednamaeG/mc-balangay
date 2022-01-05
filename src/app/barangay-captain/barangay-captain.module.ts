import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarangayCaptainPageRoutingModule } from './barangay-captain-routing.module';

import { BarangayCaptainPage } from './barangay-captain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarangayCaptainPageRoutingModule
  ],
  declarations: [BarangayCaptainPage]
})
export class BarangayCaptainPageModule {}
