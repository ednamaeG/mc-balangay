import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarangayPageRoutingModule } from './barangay-routing.module';

import { BarangayPage } from './barangay.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarangayPageRoutingModule, ComponentsModule
  ],
  declarations: [BarangayPage]
})
export class BarangayPageModule { }