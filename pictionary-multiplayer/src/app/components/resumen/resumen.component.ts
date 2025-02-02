import { Component, Input, OnInit } from '@angular/core';
import { Jugador } from '../../models/Jugador.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  standalone: false
})
export class ResumenComponent implements OnInit {
  @Input() jugadores: Jugador[] = [];

  ngOnInit(): void {
    this.ordenarJugadoresPorPuntaje();
  }

  ordenarJugadoresPorPuntaje(): void {
    this.jugadores.sort((a, b) => b.puntaje - a.puntaje);
  }
}

