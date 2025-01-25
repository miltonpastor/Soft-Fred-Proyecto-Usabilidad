import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../../services/partida.service'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Component({
  selector: 'app-select-word-page',
  templateUrl: './select-word-page.component.html',
  styleUrls: ['./select-word-page.component.css'],
  standalone: false
})
export class SelectWordPageComponent implements OnInit {
  opciones: any[] = [];

  constructor(private partidaService: PartidaService) { }

  ngOnInit(): void {
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

  seleccionarPalabra(palabra: string): void {
    console.log(`Palabra seleccionada: ${palabra}`);
    // Aquí enviarías la selección al servidor, por ejemplo, con WebSocket o Fetch API
    alert(`Has seleccionado: ${palabra}`);
  }
}