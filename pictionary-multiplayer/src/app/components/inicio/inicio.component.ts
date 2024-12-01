import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: false,
})
export class InicioComponent {
  username: string = '';
  showCreate: boolean = false;
  showJoin: boolean = false;

  codigoPartida: string | null = null;
  modalVisible: boolean = false;
  modalMessage: string | null = null; // Para almacenar el mensaje de éxito

  constructor(private router: Router, private modalService: ModalService) {
    this.modalService.codigoPartida$.subscribe((codigo) => {
      this.codigoPartida = codigo;
    });

    this.modalService.modalVisible$.subscribe((visible) => {
      this.modalVisible = visible;
    });
  }

  showCreateComponent() {
    this.showCreate = true;
    this.showJoin = false;
  }

  showJoinComponent() {
    this.showCreate = false;
    this.showJoin = true;
  }

  closeModal() {
    this.modalService.hideModal();
  }

  // Copiar el código al portapapeles
  copyToClipboard() {
    if (this.codigoPartida) {
      const el = document.createElement('textarea');
      el.value = this.codigoPartida;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      // Mostrar mensaje de éxito en el modal
      this.modalMessage = '¡Código copiado al portapapeles!';
    }
  }

  // Continuar al siguiente paso (por ejemplo, ir a la página de la partida)
  continueGame() {
    if (this.codigoPartida) {
      // Redirigir a la página de la partida con el código
      this.router.navigate(['/partida'], {
        queryParams: { codigo_partida: this.codigoPartida, nombre_jugador: this.username },
      });
    }
  }

  // Este método maneja la creación de la partida y la navegación a la página de la partida.
  onPartidaCreada(tiempoPorRonda: number | null) {
    this.showCreate = false; // Cerrar el componente de crear partida
  }

  // Este método maneja unirse a una partida y la navegación a la página de la partida.
  onPartidaUnida(codigoPartida: string | null) {
    if (codigoPartida) {
      // Redirigir a la página de la partida con el código
      this.router.navigate(['/partida'], {
        queryParams: { codigo_partida: codigoPartida, nombre_jugador: this.username },
      });
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
