import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private codigoPartidaSource = new BehaviorSubject<string | null>(null);
  codigoPartida$ = this.codigoPartidaSource.asObservable();

  private modalVisibleSource = new BehaviorSubject<boolean>(false);
  modalVisible$ = this.modalVisibleSource.asObservable();

  private jugadorTurnoSource = new BehaviorSubject<string | null>(null);
  jugadorTurno$ = this.jugadorTurnoSource.asObservable();

  setCodigoPartida(codigo: string) {
    this.codigoPartidaSource.next(codigo);
    this.showModal();
  }

  setJugadorTurno(nombre: string) {
    this.jugadorTurnoSource.next(nombre);
  }

  showModal() {
    this.modalVisibleSource.next(true);
  }

  hideModal() {
    this.modalVisibleSource.next(false);
  }
}