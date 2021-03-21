import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizViewPageRoutingModule } from './quiz-view-routing.module';

import { QuizViewPage } from './quiz-view.page';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizViewPageRoutingModule,
    CountdownModule
  ],
  declarations: [QuizViewPage]
})
export class QuizViewPageModule {}
