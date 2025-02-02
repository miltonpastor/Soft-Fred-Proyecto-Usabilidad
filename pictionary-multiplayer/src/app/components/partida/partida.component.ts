import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';
import { Subscription } from 'rxjs';
import { Partida } from '../../models/partida.model';
import { Mensaje } from '../../models/mensaje.model';
import { ModalService } from '../../services/modal.service';

interface Jugador {
  nombre: string;
  avatar: string;
  puntaje: number;
}


@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
  standalone: false
})
export class PartidaComponent implements OnInit, OnDestroy {
  codigoPartida: string = '';
  nombreJugador: string = '';
  jugadorTurno: string = '';
  palabraAdivinar: string = 'Intenta Adivinar la Palabra';
  intervalId: any;

  intento: string = '';
  tiempoPorRonda: number = 0;  // Ejemplo de valor
  jugadores: Jugador[] = []; // Aquí almacenamos la lista de jugadores
  estadoPartida: string = 'esperando';  // Estado inicial de la partida
  // partida: Partida = {} as Partida;
  partidaSubscription: Subscription = new Subscription();

  // Para el chat y mensajes
  mensajeChat: string = '';
  mensajes: Mensaje[] = [];  // Aquí almacenamos los mensajes de chat

  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private modalService: ModalService
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nombreJugador = params['jugador'];
      this.codigoPartida = params['codigo_partida'];
    });
    // load anfitrion = dibujante
    this.modalService.jugadorTurno$.subscribe(nombre => {
      this.jugadorTurno = nombre || '';
    });

    this.partidaSubscription.add(
      this.partidaService.escucharActualizacionJugadores().subscribe(data => {
        this.jugadores = data.lista;
        this.partidaService.obtenerTodoChat(this.codigoPartida);
      })
    );
    // Escuchar todos los mensajes del chat
    this.partidaSubscription.add(
      this.partidaService.escucharTodoChat().subscribe(mensajes => {
        this.mensajes = mensajes;
      })
    );
    this.partidaSubscription.add(
      this.partidaService.escucharChat().subscribe(data => {
        this.mensajes.push(data);
        const { nombre_jugador, mensaje } = data;
        if (mensaje.includes('ha adivinado la palabra')) {
          this.estadoPartida = 'seleccionandoPalabra';
          this.jugadorTurno = nombre_jugador;
          this.modalService.setJugadorTurno(this.jugadorTurno);
          this.tiempoPorRonda = 0;
        }
      })
    );

    this.partidaSubscription.add(
      this.partidaService.escucharInicioRonda().subscribe(data => {
        this.manejarIniciarRonda(data);
      })
    );
  }

  ngOnDestroy(): void {
    // Cancelar suscripciones cuando el componente se destruye
    this.partidaSubscription.unsubscribe();
  }

  cambiarEstadoPartida(nuevoEstado: string) {
    this.estadoPartida = nuevoEstado;
  }


  // Enviar un mensaje de chat
  enviarMensajeChat(mensaje: string = ''): void {
    // Usar el parámetro `mensaje` si está definido
    const mensajeAEnviar = mensaje.trim() || this.mensajeChat.trim();
    console.log('Mensaje a enviar:', mensajeAEnviar);
    console.log('Mensaje chat:', this.nombreJugador, this.codigoPartida);

    this.partidaService.enviarMensajeChat(this.codigoPartida, this.nombreJugador, mensajeAEnviar);
    // Limpiar el campo
    if (!mensaje.trim()) {
      this.mensajeChat = '';
    }
  }


  // Manejar la lógica para iniciar una nueva ronda
  manejarIniciarRonda(data: any): void {
    if (data.dibujante === this.nombreJugador) {
      this.palabraAdivinar = 'Dibuja esto: ' + data.palabra;
    } else {
      this.estadoPartida = 'Adivina la Palabra';
    }
    this.jugadorTurno = data.dibujante;
    this.tiempoPorRonda = data.tiempo;
    console.log('Iniciando ronda:', data.tiempo);

    this.estadoPartida = data.estado;
    this.iniciarTemporizador();
  }


  // Método para iniciar el temporizador
  iniciarTemporizador(): void {
    clearInterval(this.intervalId); // Limpiar cualquier intervalo previo
    this.intervalId = setInterval(() => {
      if (this.tiempoPorRonda > 0) {
        this.tiempoPorRonda--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }




  @ViewChild('backgroundAudio', { static: true }) backgroundAudio!: ElementRef<HTMLAudioElement>;
  isModalOpen = false;
  isMusicPlaying = false;
  currentVolume = 1;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  /**
   * Cambiar el volumen de la música de fondo.
   * @param volume Nivel de volumen (entre 0 y 1).
   */
  setVolume(volume: number) {
    this.currentVolume = volume; // Guardar el volumen actual
    this.backgroundAudio.nativeElement.volume = volume;
  }

  toggleBackgroundMusic(isPlaying: boolean) {
    const audioElement = this.backgroundAudio.nativeElement;

    if (isPlaying) {
      audioElement.loop = true;
      audioElement.play().then(() => {
        this.isMusicPlaying = true;
      }).catch(error => {
      });
    } else {
      audioElement.pause();
      this.isMusicPlaying = false;
    }
  }
}
