import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularPlacePage } from './popular-place.page';

const routes: Routes = [
  {
    path: '',
    component: PopularPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularPlacePageRoutingModule {}
