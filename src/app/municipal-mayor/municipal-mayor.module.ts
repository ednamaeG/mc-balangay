import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MunicipalMayorPageRoutingModule } from './municipal-mayor-routing.module';

import { MunicipalMayorPage } from './municipal-mayor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MunicipalMayorPageRoutingModule
  ],
  declarations: [MunicipalMayorPage]
})
export class MunicipalMayorPageModule {}
