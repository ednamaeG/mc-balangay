import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MabalacatHistoryPage } from './mabalacat-history.page';

const routes: Routes = [
  {
    path: '',
    component: MabalacatHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MabalacatHistoryPageRoutingModule {}
