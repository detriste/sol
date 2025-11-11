import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbrirChamadoPage } from './abrir-chamado.page';

const routes: Routes = [
  {
    path: '',
    component: AbrirChamadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbrirChamadoPageRoutingModule {}
