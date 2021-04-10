import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MabalacatHistoryPageRoutingModule } from './mabalacat-history-routing.module';

import { MabalacatHistoryPage } from './mabalacat-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MabalacatHistoryPageRoutingModule
  ],
  declarations: [MabalacatHistoryPage]
})
export class MabalacatHistoryPageModule {}
