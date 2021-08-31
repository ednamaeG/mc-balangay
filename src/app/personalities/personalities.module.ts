import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalitiesPageRoutingModule } from './personalities-routing.module';

import { PersonalitiesPage } from './personalities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalitiesPageRoutingModule
  ],
  declarations: [PersonalitiesPage]
})
export class PersonalitiesPageModule {}
