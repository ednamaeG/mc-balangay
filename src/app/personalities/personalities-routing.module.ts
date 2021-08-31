import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalitiesPage } from './personalities.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalitiesPageRoutingModule {}
