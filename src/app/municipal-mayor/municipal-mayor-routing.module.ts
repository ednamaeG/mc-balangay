import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MunicipalMayorPage } from './municipal-mayor.page';

const routes: Routes = [
  {
    path: '',
    component: MunicipalMayorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MunicipalMayorPageRoutingModule {}
