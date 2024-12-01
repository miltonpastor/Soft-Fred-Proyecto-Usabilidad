import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
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

  onPartidaCreada(tiempoPorRonda: number | null) {
    if (tiempoPorRonda !== null) {
      console.log('Partida creada con tiempo de ronda:', tiempoPorRonda);
      this.router.navigate(['/sala-espera']); // Navegar a la sala de espera
    }
    this.showCreate = false; // Cerrar el componente de crear partida
  }

  onPartidaUnida(codigoPartida: string | null) {
    if (codigoPartida !== null) {
      console.log('Uniéndose a la partida con código:', codigoPartida);
      this.router.navigate(['/sala-espera']); // Navegar a la sala de espera
    }
    this.showJoin = false; // Cerrar el componente de unirse a partida
  }
}
