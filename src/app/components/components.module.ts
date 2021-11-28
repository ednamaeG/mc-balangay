import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls/controls.component';
import { ContentBrgyComponent } from './content-brgy/content-brgy.component';
import { PoliticiansListComponent } from './politicians-list/politicians-list.component';
import { ChartComponent } from './chart/chart.component';
import { CachedImageComponent } from './cached-image/cached-image.component';
import { VideoViewerComponent } from './video-viewer/video-viewer.component';

@NgModule({
  declarations: [
    ItemComponent,
    ControlsComponent,
    ContentBrgyComponent,
    PoliticiansListComponent, ChartComponent, CachedImageComponent,VideoViewerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [
    ItemComponent,
    ControlsComponent, ContentBrgyComponent, PoliticiansListComponent, ChartComponent, CachedImageComponent,VideoViewerComponent
  ]
})
export class ComponentsModule { }
