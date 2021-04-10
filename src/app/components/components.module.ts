import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    ItemComponent,
    ControlsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],exports:[
    ItemComponent,
    ControlsComponent
  ]
})
export class ComponentsModule { }
