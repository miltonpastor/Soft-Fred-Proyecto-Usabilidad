import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: false 
})
export class InicioComponent {
  username: string = '';
  showCreate: boolean = false; // Controlar si mostrar el componente para crear partida
  showJoin: boolean = false; // Controlar si mostrar el componente para unirse a partida

  constructor(private router: Router) {}

  showCreateComponent() {
    this.showCreate = true;
    this.showJoin = false;
  }

  showJoinComponent() {
    this.showCreate = false;
    this.showJoin = true;
  }

  // Este método maneja la creación de la partida y la navegación a la página de la partida.
  onPartidaCreada(tiempoPorRonda: number | null) {
    if (tiempoPorRonda !== null) {
      console.log('Partida creada con tiempo de ronda:', tiempoPorRonda);
      // Redirige a la página de la partida con los parámetros necesarios
      this.router.navigate(['/partida'], { queryParams: { codigo_partida: 'nuevo_codigo', nombre_jugador: this.username } });
    }
    this.showCreate = false; // Cerrar el componente de crear partida
  }

  // Este método maneja unirse a una partida y la navegación a la página de la partida.
  onPartidaUnida(codigoPartida: string | null) {
    if (codigoPartida !== null) {
      console.log('Uniéndose a la partida con código:', codigoPartida);
      // Redirige a la página de la partida con los parámetros necesarios
      this.router.navigate(['/partida'], { queryParams: { codigo_partida: codigoPartida, nombre_jugador: this.username } });
    }
    this.showJoin = false; // Cerrar el componente de unirse a partida
  }

  changeAvatar(direction: string) {
    console.log(`Cambio de avatar hacia: ${direction}`);
  }
  
  randomizeAvatar() {
    console.log('Avatar aleatorio seleccionado');
  }
  
}
