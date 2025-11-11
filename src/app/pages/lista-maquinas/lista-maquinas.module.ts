import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMaquinasPageRoutingModule } from './lista-maquinas-routing.module';

import { ListaMaquinasPage } from './lista-maquinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMaquinasPageRoutingModule
  ],
  declarations: [ListaMaquinasPage]
})
export class ListaMaquinasPageModule {}
