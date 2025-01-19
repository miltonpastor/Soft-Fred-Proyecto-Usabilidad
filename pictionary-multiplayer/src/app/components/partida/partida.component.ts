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
  dibujo: string = '';
  mensajeTurno: string = '';
  palabra: string = '';

  // Variables para el dibujo en el canvas
  private isDrawing: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private context!: CanvasRenderingContext2D;

  // Variables para los controles del canvas
  private brushSize: number = 5; // Tamaño inicial del pincel
  private brushColor: string = '#000000'; // Color inicial del pincel
  private drawingHistory: ImageData[] = []; // Para almacenar el historial de dibujos (undo/redo)
  private redoStack: ImageData[] = []; // Almacena los pasos para rehacer (redo)

  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.codigoPartida = params['codigo_partida'] || '';
      this.nombreJugador = params['nombre_jugador'] || '';
    });

    // Obtener el contexto del canvas
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (canvas) {
      this.context = canvas.getContext('2d')!;
      this.context.lineWidth = this.brushSize; // Configurar tamaño inicial del pincel
      this.context.strokeStyle = this.brushColor; // Configurar color inicial del pincel
    } else {
      console.error('Canvas no encontrado.');
    }

    //Obtener todos los mensajes de chat (para jugadores que se unan despues)
    this.partidaService.obtenerMensajesChat(this.codigoPartida).subscribe({
      next: (data: Mensaje[]) => {
        if(data.length === 0){
          this.enviarMensajeChat('ha creado la partida')
        }else{
          this.mensajes = data
          this.enviarMensajeChat('ha ingresado a la partida')
        }
        console.log("Enviando el historial",this.mensajes)
      }
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


  //---------------------------------------------------

  // Usar el borrador
  useEraser(): void {
    this.brushColor = '#FFFFFF'; // Color blanco para el fondo
    this.context.strokeStyle = this.brushColor;
    console.log('Modo borrador activado.');
  }

  // Deshacer la última acción
  undo(): void {
    if (this.drawingHistory.length > 0) {
      const lastState = this.drawingHistory.pop()!;
      this.redoStack.push(this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height));
      this.context.putImageData(lastState, 0, 0);
      console.log('Acción deshecha.');
    } else {
      console.log('No hay más acciones para deshacer.');
    }
  }

  // Rehacer la última acción
  redo(): void {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop()!;
      this.drawingHistory.push(this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height));
      this.context.putImageData(nextState, 0, 0);
      console.log('Acción rehecha.');
    } else {
      console.log('No hay más acciones para rehacer.');
    }
  }

  // Métodos para el dibujo en el canvas
  onMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;

    // Guardar el estado actual del canvas antes de un nuevo trazo
    this.drawingHistory.push(this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height));
    this.redoStack = []; // Limpiar redo stack al iniciar un nuevo trazo
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const x = event.offsetX;
    const y = event.offsetY;

    this.context.strokeStyle = this.brushColor;
    this.context.lineWidth = this.brushSize;

    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(x, y);
    this.context.stroke();
    this.lastX = x;
    this.lastY = y;
  }

  onMouseUp(event: MouseEvent): void {
    this.isDrawing = false;
    this.partidaService.actualizarDibujo(this.codigoPartida, this.dibujo);
  }

  onMouseLeave(event: MouseEvent): void {
    this.isDrawing = false;
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
    if (this.nombreJugador === this.nombreAnfitrion && this.estadoPartida === 'esperando') {
      this.partidaService.iniciarPartida(this.codigoPartida).subscribe({
        next: (respuesta) => {
          this.estadoPartida = 'iniciada';
          console.log('Partida iniciada:', respuesta);
        },
        error: (err) => {
          console.error('Error al iniciar la partida:', err);
          this.errores.push('No se pudo iniciar la partida. Intenta nuevamente.');
        }
      });
    }
  }

  // Modificado para aceptar un string (el valor del color)
  setColor(color: string): void {
    this.brushColor = color;
    this.context.strokeStyle = this.brushColor;
    console.log(`Color cambiado a: ${this.brushColor}`);
  }

  handleColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.setColor(input.value);
  }

  // Cambiar el tamaño del pincel
  changeBrushSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.brushSize = parseInt(input.value, 10);
      this.context.lineWidth = this.brushSize;
      console.log(`Tamaño de pincel cambiado a: ${this.brushSize}`);
    }
  }
}
