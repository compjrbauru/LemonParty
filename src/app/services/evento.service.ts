import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventoService {
  datePipe = new DatePipe('pt-BR');

  private EventoCollection: AngularFirestoreCollection<any> = this.db.collection('/Evento');

  data: any;

  constructor(private db: AngularFirestore) { }

  getID(id: any): Observable<any> {
    return this.db.collection('/Evento', ref => ref.where('id', '==', id)).valueChanges();
  }

  getAll(): Observable<any> {
    return this.EventoCollection.valueChanges();
  }

  getByDate(): Observable<any> {
    return this.db.collection(`/Evento`, ref => ref.orderBy('data')).valueChanges();
  }

  getByNameWithLimit(): Observable<any> {
    return this.db.collection(`/Evento`, ref => ref.orderBy('nome').limit(3)).valueChanges();
  }

  getByNameWithLimitWithStart(lastVisible: any): Observable<any> {
    return this.db.collection(`/Evento`, ref => ref
      .orderBy('nome')
      .limit(3)
      .startAfter(lastVisible)).valueChanges();
  }

  getByNameWithLimitWithEnd(firstVisible: any): Observable<any> {
    return this.db.collection(`/Evento`, ref => ref
      .orderBy('nome')
      .limit(3)
      .endBefore(firstVisible)).valueChanges();
  }

  addData(evento: any) {
    evento.id = this.db.createId();
    this.EventoCollection.doc(evento.id).set({
      ...evento,
    });
  }

  patchData(evento: any, id: string) {
    this.EventoCollection.doc(id).set({
      ...evento,
      id: id,
    });
  }

  removeData(id: any) {
    return this.db.doc(`/Evento/${id}`).delete();
  }

}


