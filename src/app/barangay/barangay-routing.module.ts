import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarangayPage } from './barangay.page';

const routes: Routes = [
  {
    path: '',
    component: BarangayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarangayPageRoutingModule {}
