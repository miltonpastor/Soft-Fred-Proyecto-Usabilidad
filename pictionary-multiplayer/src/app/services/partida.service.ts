// src/app/services/partida.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private socket: Socket;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    // Inicializar SocketIO
    this.socket = io(environment.socketUrl);
  }

  // Método para crear una partida
  crearPartida(nombreAnfitrion: string, tiempoPorRonda: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear_partida`, {
      nombre_anfitrion: nombreAnfitrion,
      tiempo_por_ronda: tiempoPorRonda
    });
  }

  // Método para unirse a una partida
  unirsePartida(codigoPartida: string, nombreJugador: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unirse_partida`, {
      codigo_partida: codigoPartida,
      nombre_jugador: nombreJugador
    });
  }

  // Método para iniciar la partida
  iniciarPartida(codigoPartida: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/iniciar_partida`, {
      codigo_partida: codigoPartida
    });
  }

  // Emitir un dibujo en tiempo real
  actualizarDibujo(codigoPartida: string, dibujo: string): void {
    this.socket.emit('actualizar_dibujo', codigoPartida, dibujo);
  }

  // Recibir actualizaciones del dibujo
  recibirDibujo(callback: (dibujo: string) => void): void {
    this.socket.on('actualizar_dibujo', (data: { dibujo: string }) => {
      callback(data.dibujo);
    });
  }

  // Adivinar la palabra
  adivinar(codigoPartida: string, intento: string): void {
    this.socket.emit('adivinar', codigoPartida, intento);
  }

  // Recibir notificación cuando alguien acierta la palabra
  recibirAdivinanza(callback: (mensaje: string) => void): void {
    this.socket.on('acertado', (data: { mensaje: string }) => {
      callback(data.mensaje);
    });
  }

  // Obtener el estado de la partida
  obtenerEstadoPartida(codigoPartida: string): Observable<Partida> {
    return this.http.get<Partida>(`${this.apiUrl}/estado_partida/${codigoPartida}`);
  }

  // Unirse a una sala de juego a través de Socket.IO
  unirseASala(codigoPartida: string): void {
    this.socket.emit('unirse_partida_socket', codigoPartida);
  }

  // Salir de la sala
  salirDeSala(codigoPartida: string): void {
    this.socket.emit('salir_partida_socket', codigoPartida);
  }
}
