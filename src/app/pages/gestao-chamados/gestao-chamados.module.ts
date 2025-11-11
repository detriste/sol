import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestaoChamadosPageRoutingModule } from './gestao-chamados-routing.module';

import { GestaoChamadosPage } from './gestao-chamados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestaoChamadosPageRoutingModule
  ],
  declarations: [GestaoChamadosPage]
})
export class GestaoChamadosPageModule {}
