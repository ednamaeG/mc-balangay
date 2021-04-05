import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticiansPageRoutingModule } from './politicians-routing.module';

import { PoliticiansPage } from './politicians.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticiansPageRoutingModule
  ],
  declarations: [PoliticiansPage]
})
export class PoliticiansPageModule {}
