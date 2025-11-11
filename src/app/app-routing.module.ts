import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redireciona para 'lista-maquinas' ao iniciar o app
  { path: '', redirectTo: 'lista-maquinas', pathMatch: 'full' },

  // Página de listagem de máquinas
  {
    path: 'lista-maquinas',
    loadChildren: () => import('./pages/lista-maquinas/lista-maquinas.module')
      .then(m => m.ListaMaquinasPageModule)
  },

  // Página de abrir chamado com parâmetro de rota (:ordemServico)
  {
    path: 'abrir-chamado/:ordemServico',
    loadChildren: () => import('./pages/abrir-chamado/abrir-chamado.module')
      .then(m => m.AbrirChamadoPageModule)
  },

  // Página de gestão de chamados
  {
    path: 'gestao-chamados',
    loadChildren: () => import('./pages/gestao-chamados/gestao-chamados.module')
      .then(m => m.GestaoChamadosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
