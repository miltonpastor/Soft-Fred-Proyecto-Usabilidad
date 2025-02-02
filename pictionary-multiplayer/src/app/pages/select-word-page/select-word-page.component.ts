import { Component, Input, OnInit } from '@angular/core';
import { PartidaService } from '../../services/partida.service'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-word-page',
  templateUrl: './select-word-page.component.html',
  styleUrls: ['./select-word-page.component.css'],
  standalone: false
})
export class SelectWordPageComponent implements OnInit {
  @Input() nombreJugador: string | null = null;
  @Input() codigoPartida: string | null = null;
  opciones: any[] = [];
  constructor(private partidaService: PartidaService,
  ) { }

  ngOnInit(): void {
    this.partidaService.getOpcionesPalabras().subscribe({
      next: (response) => {
        this.opciones = response.opciones;
      },
      error: (error) => {
        console.error('Error al cargar las opciones de palabras:', error);
      }
    });
    console.log('Nombre del jugador:', this.nombreJugador);
    console.log('Código de la partida:', this.codigoPartida);



  }

  //-------------------asdsad-------------------  
  seleccionarPalabra(palabra: string): void {
    if (this.codigoPartida) {
      this.partidaService.iniciarRonda(this.codigoPartida, palabra);
      console.log('Palabra seleccionada:', palabra, this.nombreJugador);

    }
  }
}