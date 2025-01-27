import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PartidaService } from '../../services/partida.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-crear-partida',
  templateUrl: './crear-partida.component.html',
  styleUrls: ['./crear-partida.component.css'],
  standalone: false,
})
export class CrearPartidaComponent {
  @Input() nombreJugador: string = '';
  tiempoPorRonda: number = 30;
  @Output() partidaCreada = new EventEmitter<number>();

  constructor(
    private partidaService: PartidaService,
    private modalService: ModalService
  ) { }

  createGame() {
    if (this.tiempoPorRonda < 10 || this.tiempoPorRonda > 120) {
      alert('El tiempo por ronda debe estar entre 10 y 120 segundos.');
      return;
    }


  }
  close() {
  }
}
