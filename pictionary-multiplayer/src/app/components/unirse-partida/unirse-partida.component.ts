import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-unirse-partida',
  templateUrl: './unirse-partida.component.html',
  standalone: false
})
export class UnirsePartidaComponent {
  codigoPartida: string = ''; // Código de la partida
  @Output() partidaUnida = new EventEmitter<string | null>(); // Permitir null también

  joinGame() {
    if (!this.codigoPartida.trim()) {
      alert('Por favor, ingresa un código de partida válido');
      return;
    }
    this.partidaUnida.emit(this.codigoPartida); // Emitir el código de partida
  }

  close() {
    this.partidaUnida.emit(null); // Emitir null para indicar que se cierra el componente
  }
}
