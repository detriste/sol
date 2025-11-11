import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestaoChamadosPage } from './gestao-chamados.page';

const routes: Routes = [
  {
    path: '',
    component: GestaoChamadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestaoChamadosPageRoutingModule {}
