import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { PartidaService } from '../../services/partida.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drawing-area',
  templateUrl: './drawing-area.component.html',
  styleUrls: ['./drawing-area.component.css'],
  standalone: false
})
export class DrawingAreaComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() codigoPartida!: string; // Recibir el código de la partida como un @Input
  @Input() usuarioQuePuedeDibujar!: string;
  private context!: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private brushSize: number = 5;
  private brushColor: string = '#000000';
  private drawingHistory: ImageData[] = [];
  private redoStack: ImageData[] = [];
  private drawingSubscription!: Subscription;
  private sendDrawingTimeout: any;
  private nombreJugador: string = '';

  constructor(private partidaService: PartidaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nombreJugador = params['user'] || '';
    });

    this.context = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true })!;
    this.drawingSubscription = this.partidaService.escucharDibujo().subscribe((data: any) => {
      this.loadDrawing(data.dibujo);
    });
  }

  ngOnDestroy(): void {
    if (this.drawingSubscription) {
      this.drawingSubscription.unsubscribe();
    }
  }

  onMouseDown(event: MouseEvent): void {
    if (this.nombreJugador !== this.usuarioQuePuedeDibujar) {
      return;
    }
    this.isDrawing = true;
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;
    this.saveDrawingState();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing || this.nombreJugador !== this.usuarioQuePuedeDibujar) {
      return;
    }
    this.context.strokeStyle = this.brushColor;
    this.context.lineWidth = this.brushSize;
    this.context.lineCap = 'round'; // Suavizar las líneas
    this.context.lineJoin = 'round'; // Suavizar las líneas
    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(event.offsetX, event.offsetY);
    this.context.stroke();
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;

    // Enviar el dibujo al servidor a intervalos regulares
    clearTimeout(this.sendDrawingTimeout);
    this.sendDrawingTimeout = setTimeout(() => {
      this.sendDrawing();
    }, 100);
  }

  onMouseUp(event: MouseEvent): void {
    if (this.nombreJugador !== this.usuarioQuePuedeDibujar) {
      return;
    }
    this.isDrawing = false;
    this.sendDrawing();
  }

  onMouseLeave(event: MouseEvent): void {
    if (this.nombreJugador !== this.usuarioQuePuedeDibujar) {
      return;
    }
    this.isDrawing = false;
  }

  setColor(color: string): void {
    this.brushColor = color;
  }

  handleColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.brushColor = input.value;
  }

  changeBrushSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.brushSize = parseInt(input.value, 10);
  }

  useEraser(): void {
    this.brushColor = '#FFFFFF';
  }

  undo(): void {
    if (this.drawingHistory.length > 0) {
      this.redoStack.push(this.context.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height));
      const previousState = this.drawingHistory.pop();
      if (previousState) {
        this.context.putImageData(previousState, 0, 0);
        this.sendDrawing();
      }
    }
  }

  redo(): void {
    if (this.redoStack.length > 0) {
      this.drawingHistory.push(this.context.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height));
      const nextState = this.redoStack.pop();
      if (nextState) {
        this.context.putImageData(nextState, 0, 0);
        this.sendDrawing();
      }
    }
  }

  private saveDrawingState(): void {
    this.drawingHistory.push(this.context.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height));
    this.redoStack = [];
  }

  private sendDrawing(): void {
    const drawing = this.canvas.nativeElement.toDataURL();
    console.log('Enviando dibujo:', this.nombreJugador);

    this.partidaService.actualizarDibujo(this.codigoPartida, drawing, this.nombreJugador);
  }

  private loadDrawing(drawing: string): void {
    const image = new Image();
    image.onload = () => {
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.context.drawImage(image, 0, 0);
    };
    image.src = drawing;
  }
}