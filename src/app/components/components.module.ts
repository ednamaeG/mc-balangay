import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],exports:[
    ItemComponent
  ]
})
export class ComponentsModule { }
