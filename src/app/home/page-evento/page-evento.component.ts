import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'ngx-page-evento',
  templateUrl: './page-evento.component.html',
  styleUrls: ['./page-evento.component.scss'],
})
export class PageEventoComponent implements OnInit, OnDestroy {
  evento: any;
  id: number;
  sub: any;
  eventsub: any;
  qty: {
    feminino: number,
    masculino: number,
    unisex: number,
  };
  preco: number = 0;

  minus(type: string) {
    if (this.qty[type] > 0) {
      this.preco -= +this.evento.ingressos[type].valor;
      this.qty[type]--;
    }
  }

  plus(type: string) {
    this.qty[type]++;
    this.preco += +this.evento.ingressos[type].valor;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private localStorage: LocalStorage,
  ) { }

  ngOnInit() {
    this.qty = {
      feminino: 0,
      masculino: 0,
      unisex: 0,
    };
    this.preco = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.eventsub = this.eventoService.getID(this.id).subscribe(response => {
        this.evento = response[0];
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.eventsub.unsubscribe();
  }

  comprar(): void {
    // tslint:disable-next-line:max-line-length
    this.localStorage.setItemSubscribe('compra', { ...this.qty, preco: this.preco, idevento: this.evento.id, nomeEvento: this.evento.nome });
    this.localStorage.setItemSubscribe('eventoCompra', { ...this.evento });
    // Posteriormente enviar forma de pagamento
    this.router.navigate([`/home/evento/${this.evento.id}/comprar`]);
  }

}
