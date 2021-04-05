import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticiansPage } from './politicians.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticiansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticiansPageRoutingModule {}
