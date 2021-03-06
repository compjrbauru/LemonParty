import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'main',
        component: DataComponent,
      },
      {
        path: 'events',
        loadChildren: './events/events.module#EventsModule',
      },
      {
        path: 'ingressos-fisicos',
        loadChildren: './ingressos-fisicos/ingressos-fisicos.module#IngressosFisicosModule',
      },
      {
        path: 'categorias',
        loadChildren: './categorias/categorias.module#CategoriasModule',
      },
      {
        path: 'deposito',
        loadChildren: './deposito/deposito.module#DepositoModule',
      },
      {
        path: 'edicao-home',
        loadChildren: './edicao-home/edicao-home.module#EdicaoHomeModule',
      },
      {
        path: 'informacoes-usuario',
        loadChildren: './informacoes-usuario/informacoes-usuario.module#InformacoesUsuarioModule',
      },
      {
        path: '**',
        redirectTo: 'main',
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
