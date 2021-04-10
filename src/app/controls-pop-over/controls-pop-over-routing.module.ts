import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlsPopOverPage } from './controls-pop-over.page';

const routes: Routes = [
  {
    path: '',
    component: ControlsPopOverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlsPopOverPageRoutingModule {}
