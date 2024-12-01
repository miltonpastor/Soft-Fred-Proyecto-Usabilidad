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
  ) {}

  createGame() {
    if (this.tiempoPorRonda < 10 || this.tiempoPorRonda > 120) {
      alert('El tiempo por ronda debe estar entre 10 y 120 segundos.');
      return;
    }

    this.partidaService.crearPartida(this.nombreJugador, this.tiempoPorRonda).subscribe({
      next: (response) => {
        const codigoPartida = response?.partida?.codigo_partida;
        if (codigoPartida) {
          this.modalService.setCodigoPartida(codigoPartida);
          this.partidaCreada.emit(this.tiempoPorRonda);
          this.partidaService.unirseASala(codigoPartida, this.nombreJugador);
        } else {
          console.error('Código de partida no disponible en la respuesta:', response);
        }
      },
      error: (err) => {
        console.error('Error al crear la partida:', err);
        alert('Hubo un error al crear la partida. Intenta de nuevo.');
      },
    });
  }
  close() {
  }
}
