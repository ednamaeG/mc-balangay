import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarangayContentPage } from './barangay-content.page';

const routes: Routes = [
  {
    path: '',
    component: BarangayContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarangayContentPageRoutingModule {}
