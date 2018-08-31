import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
      },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule',
      },
      {
        path: 'evento/:id',
        loadChildren: './page-evento/page-evento.module#PageEventoModule',
      },
      {
        path: 'categoria',
        loadChildren: './show-categoria/show-categoria.module#ShowCategoriaModule',
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
export class HomeRoutingModule {}
