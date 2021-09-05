import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { GalleryViewerPage } from './gallery-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryViewerPageRoutingModule {}
