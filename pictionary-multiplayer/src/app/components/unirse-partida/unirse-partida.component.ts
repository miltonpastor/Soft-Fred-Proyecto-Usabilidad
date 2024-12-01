import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PartidaService } from '../../services/partida.service';

@Component({
  selector: 'app-unirse-partida',
  templateUrl: './unirse-partida.component.html',
  styleUrls: ['./unirse-partida.component.css'],
  standalone: false
})
export class UnirsePartidaComponent {
  codigoPartida: string = ''; // Código de la partida
  @Input() nombreJugador: string = ''; // Nombre
  @Output() partidaUnida = new EventEmitter<string | null>(); // Permitir null también

  constructor(private partidaService: PartidaService) {}

  // Función para unirse a la partida
  joinGame(): void {
    if (!this.codigoPartida.trim()) {
      alert('Por favor, ingresa un código de partida válido');
      return;
    }

    // Llamar al servicio para unirse a la sala de juego
    this.partidaService.unirseASala(this.codigoPartida, this.nombreJugador);

    // Emitir el código de la partida para continuar el flujo
    this.partidaUnida.emit(this.codigoPartida);

  }

  // Función para cerrar el componente sin hacer nada
  close(): void {
    this.partidaUnida.emit(null); // Emitir null para indicar que se cierra el componente
  }
}
