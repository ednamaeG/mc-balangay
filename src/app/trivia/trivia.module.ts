import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriviaPageRoutingModule } from './trivia-routing.module';

import { TriviaPage } from './trivia.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriviaPageRoutingModule,BrowserModule
  ],
  declarations: [TriviaPage]
})
export class TriviaPageModule {}
