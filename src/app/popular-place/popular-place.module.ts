import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularPlacePageRoutingModule } from './popular-place-routing.module';

import { PopularPlacePage } from './popular-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularPlacePageRoutingModule
  ],
  declarations: [PopularPlacePage]
})
export class PopularPlacePageModule {}
