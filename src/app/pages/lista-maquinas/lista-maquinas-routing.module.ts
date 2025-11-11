import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaMaquinasPage } from './lista-maquinas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaMaquinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaMaquinasPageRoutingModule {}
