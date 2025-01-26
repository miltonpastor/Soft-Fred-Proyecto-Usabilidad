import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../../services/partida.service'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-word-page',
  templateUrl: './select-word-page.component.html',
  styleUrls: ['./select-word-page.component.css'],
  standalone: false
})
export class SelectWordPageComponent implements OnInit {
  opciones: any[] = [];
  codigoPartida: string | null = null; // Código de la partida obtenido de la URL
  nombreJugador: string | null = null; // Nombre del jugador obtenido de la URL

  constructor(private router: Router, private partidaService: PartidaService,
                       private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.codigoPartida = params['codigo_partida'] || null;
      this.nombreJugador = params['nombre_jugador'] || null;

      console.log('Código de partida:', this.codigoPartida);
      console.log('Nombre del jugador:', this.nombreJugador);
    });

    this.partidaService.getOpcionesPalabras().subscribe({
      next: (response) => {
        this.opciones = response.opciones;
        console.log(this.opciones);

      },
      error: (error) => {
        console.error('Error al cargar las opciones de palabras:', error);
      }
    });
  }

  //-------------------asdsad-------------------  
  seleccionarPalabra(palabra: string): void {
    if (!this.codigoPartida) {
      console.error('No se encontró el código de partida.');
      return;
    }

    console.log(`Seleccionando palabra: ${palabra} para la partida: ${this.codigoPartida}`);
    this.partidaService.seleccionarPalabra(this.codigoPartida, palabra).subscribe({
      next: () => {
        console.log(`Palabra seleccionada: ${palabra}`);
        alert(`Has seleccionado: ${palabra}`);
        this.continueGame();
      },
      error: (error) => {
        console.error('Error al seleccionar la palabra:', error);
      }
    });
  }

  continueGame() {
    if (this.codigoPartida) {
      // Redirigir a la página de la partida con el código
      this.router.navigate(['/partida'], {
        queryParams: { codigo_partida: this.codigoPartida, nombre_jugador: this.nombreJugador },
      });
    }
  }
}