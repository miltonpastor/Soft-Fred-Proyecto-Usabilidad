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

  private anfitrionSource = new BehaviorSubject<string | null>(null);
  anfitrion$ = this.anfitrionSource.asObservable();

  setCodigoPartida(codigo: string) {
    this.codigoPartidaSource.next(codigo);
    this.showModal();
  }

  setAnfitrion(anfitrion: string) {
    this.anfitrionSource.next(anfitrion);
  }

  showModal() {
    this.modalVisibleSource.next(true);
  }

  hideModal() {
    this.modalVisibleSource.next(false);
  }
}