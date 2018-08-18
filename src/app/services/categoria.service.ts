import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriaService {
    datePipe = new DatePipe('pt-BR');

    private CategoriasCollection: AngularFirestoreCollection<any> = this.db.collection('/Categorias');

    constructor(private db: AngularFirestore) { }

    getCategoria() {
        const collections$: Observable<any> = this.CategoriasCollection.valueChanges();
        return collections$;
    }

    addCategoria(categoria: any) {

        categoria.id = this.db.createId();
        categoria.count = 0;
    this.CategoriasCollection.doc(categoria.id).set({
      ...categoria,
    });
    }

    patchCategoria(categoria: any, evento: any) {
        this.CategoriasCollection.doc(categoria.id)
            .update({
                count: categoria.count + 1,
                idsevento: [...categoria.idsevento, evento.id],
            });
    }

    removeCategoria(id: any) {
        return this.db.doc(`/Categorias/${id}`);
    }

}

