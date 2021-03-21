import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizViewPage } from './quiz-view.page';

const routes: Routes = [
  {
    path: '',
    component: QuizViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizViewPageRoutingModule {}
