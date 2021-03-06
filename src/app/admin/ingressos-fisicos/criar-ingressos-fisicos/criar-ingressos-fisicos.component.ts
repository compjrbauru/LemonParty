import { IngressosService } from '../../../services/ingressos.service';
import { EventoService } from '../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificacaoService } from '../../../services/notificacao.service';


@Component({
  selector: 'ngx-criar-ingressos-fisicos',
  templateUrl: './criar-ingressos-fisicos.component.html',
  styleUrls: ['./criar-ingressos-fisicos.component.scss'],
})
export class CriarIngressosFisicosComponent implements OnInit {

  form: any = {};
  eventoAsync: Observable<any>;
  eventoResolver: any = [];
  resolvedHTML: any;

  constructor(
    private eventoService: EventoService,
    private ingressosService: IngressosService,
    private notific: NotificacaoService,
  ) { }

  ngOnInit() {
    this.eventoAsync = this.eventoService.getAll();
  }

  resolver(event) {
    this.eventoResolver = event;
  }

  resolveData(time: Date) {
    return  ('0' + time.getDate()).slice(-2) + '/'
    + ('0' + (time.getMonth() + 1)).slice(-2) + '/'
    + time.getFullYear() + '-'
    + ('0' + time.getHours()).slice(-2) + ':'
    + ('0' + time.getMinutes()).slice(-2) + ':'
    + ('0' + time.getSeconds()).slice(-2);
  }

  submit(formValue: any) {
    const newDate = this.resolveData(new Date());
    this.ingressosService.addData({ ...formValue, data: newDate });
    this.notific.ngxtoaster('Aviso', 'Ingressos gerados com sucesso.', true);
    this.form['formIngressos'].reset();
  }

}


