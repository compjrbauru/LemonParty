import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PaginacaoModule } from './../../@core/components/paginacao/paginacao.module';
import { ShowEventoModule } from './../../@core/components/show-evento/show-evento.module';
import { TodosEventosComponent } from './todos-eventos.component';
import { TodosEventosRoutingModule } from './todos-eventos.routing';


@NgModule({
  imports: [
    TodosEventosRoutingModule,
    ThemeModule,
    PaginacaoModule,
    ShowEventoModule,
  ],
  declarations: [TodosEventosComponent],
  providers: [],
})
export class TodosEventosModule { }
