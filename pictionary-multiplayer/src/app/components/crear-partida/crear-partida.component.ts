import { Component, EventEmitter, Output } from '@angular/core';
import { PartidaService } from '../../services/partida.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-crear-partida',
  templateUrl: './crear-partida.component.html',
  styleUrls: ['./crear-partida.component.css'],
  standalone: false
})
export class CrearPartidaComponent {
  tiempoPorRonda: number = 30; // Tiempo por ronda en segundos
  nombreAnfitrion: string = 'Jugador 1'; // Nombre del anfitrión, puedes obtenerlo del formulario
  @Output() partidaCreada = new EventEmitter<number>(); // Emitir el tiempo para la creación

  constructor(private partidaService: PartidaService) {} // Inyección del servicio

  createGame() {
    if (this.tiempoPorRonda < 10 || this.tiempoPorRonda > 120) {
      alert('El tiempo por ronda debe estar entre 10 y 120 segundos.');
      return;
    }

    // Llamada al servicio para crear la partida
    this.partidaService.crearPartida(this.nombreAnfitrion, this.tiempoPorRonda).subscribe({
      next: (response) => {
        console.log('Partida creada con éxito:', response);
        this.partidaCreada.emit(this.tiempoPorRonda); // Emitir el evento con el tiempo por ronda
      },
      error: (err) => {
        console.error('Error al crear la partida:', err);
        alert('Hubo un error al crear la partida. Intenta de nuevo.');
      }
    });
  }

  close() {
    //this.partidaCreada.emit(null); // Emitir null para indicar que se cierra el componente
  }
}
