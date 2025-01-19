import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaService } from '../../services/partida.service';
import { Subscription } from 'rxjs';
import { Partida } from '../../models/partida.model';
import { Mensaje } from '../../models/mensaje.model';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
  standalone: false
})
export class PartidaComponent implements OnInit, OnDestroy {
  codigoPartida: string = '';
  nombreJugador: string = '';
  nombreAnfitrion: string = '';
  intento: string = '';
  tiempoPorRonda: number = 30;  // Ejemplo de valor
  jugadores: string[] = []; // Aquí almacenamos la lista de jugadores
  estadoPartida: string = 'esperando';  // Estado inicial de la partida
  partida: Partida = {} as Partida;
  partidaSubscription: Subscription = new Subscription();
  errores: string[] = [];

  // Para el chat y mensajes
  mensajeChat: string = '';
  mensajes: Mensaje[] = [];  // Aquí almacenamos los mensajes de chat

  // Variables de la interfaz de la partida
  mensajeTurno: string = '';
  palabra: string = '';

  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.codigoPartida = params['codigo_partida'] || '';
      this.nombreJugador = params['nombre_jugador'] || '';
    });

    // Escuchar los jugadores y el chat en tiempo real
    this.iniciarEscucharPartida();
    this.iniciarEscucharChat();
  }

  ngOnDestroy(): void {
    // Cancelar suscripciones cuando el componente se destruye
    this.partidaSubscription.unsubscribe();
  }

  // En el componente donde se escucha el evento
  iniciarEscucharPartida(): void {
    this.partidaSubscription.add(
      this.partidaService.escucharUnirsePartida().subscribe(
        (jugadores: string[]) => {
          // Actualiza la lista de jugadores
          this.jugadores = jugadores;
          if (this.jugadores.length >= 2) {
            this.iniciarPartida()
          }
          console.log('Jugadores actualizados:', this.jugadores);
        },
        (error) => {
          console.error('Error al recibir la lista de jugadores:', error);
        }
      )
    );
  }



  //----------------------CHAT----------------------------

  // Escuchar mensajes de chat
  iniciarEscucharChat(): void {
    this.partidaSubscription.add(
      this.partidaService.escucharChat().subscribe({
        next: (data: Mensaje) => {
          this.mensajes.push(data)
          console.log('estos son los datos',this.mensajes)

        },
        error: (err) => console.log(err)
      })
    );
  }

  // Enviar un mensaje de chat
  enviarMensajeChat(mensaje: string = ''): void {
    console.log('Aquí emitiendo valores al enviar mensaje');

    // Usar el parámetro `mensaje` si está definido
    const mensajeAEnviar = mensaje.trim() || this.mensajeChat.trim();

    this.partidaService.enviarMensajeChat(this.codigoPartida, this.nombreJugador, mensajeAEnviar);

    // Limpiar el campo
    if (!mensaje.trim()) {
      this.mensajeChat = '';  
    }
  }


  // Adivinar la palabra
  adivinarPalabra(intento: string): void {
    this.partidaService.adivinar(this.codigoPartida, intento);
  }

  // Función para salir de la partida
  salirDePartida(): void {
    this.partidaService.salirDeSala(this.codigoPartida);
    this.router.navigate(['/']);
  }

  // Función para iniciar la partida
  iniciarPartida(): void {
    // this.nombreJugador === this.nombreAnfitrion &&
    console.log("ya inicio");

    if (this.estadoPartida === 'esperando') {
      this.partidaService.iniciarPartida(this.codigoPartida).subscribe({
        next: (respuesta) => {
          console.log('Partida iniciada:', respuesta);
        },
        error: (err) => {
          console.error('Error al iniciar la partida:', err);
          this.errores.push('No se pudo iniciar la partida. Intenta nuevamente.');
        }
      });
    }
  }

}
