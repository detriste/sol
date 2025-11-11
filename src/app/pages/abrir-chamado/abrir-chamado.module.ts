import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbrirChamadoPageRoutingModule } from './abrir-chamado-routing.module';

import { AbrirChamadoPage } from './abrir-chamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbrirChamadoPageRoutingModule
  ],
  declarations: [AbrirChamadoPage]
})
export class AbrirChamadoPageModule {}
