import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlsPopOverPageRoutingModule } from './controls-pop-over-routing.module';

import { ControlsPopOverPage } from './controls-pop-over.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlsPopOverPageRoutingModule
  ],
  declarations: [ControlsPopOverPage]
})
export class ControlsPopOverPageModule {}
