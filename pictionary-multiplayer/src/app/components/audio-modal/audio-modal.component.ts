import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-audio-modal',
  standalone: false,
  templateUrl: './audio-modal.component.html',
  styleUrls: ['./audio-modal.component.css']
})
export class AudioModalComponent {
  @Input() isMusicPlaying = false; // Recibe el estado de la música
  @Input() currentVolume = 0.5; // Recibe el volumen actual
  
  @Output() close = new EventEmitter<void>();
  @Output() volumeChange = new EventEmitter<number>();
  @Output() toggleMusic = new EventEmitter<boolean>(); // Emitirá el estado del sonido

  /**
   * Cerrar el modal.
   */
  closeModal() {
    this.close.emit();
  }

  /**
   * Emitir el cambio de volumen.
   * @param event Evento del input de rango.
   */
  onVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentVolume = parseFloat(input.value);
    console.log(`Nuevo volumen: ${this.currentVolume}`);
    this.volumeChange.emit(this.currentVolume);
  }

  /**
   * Alternar el estado de la música (encender/apagar).
   */
  toggleMusicState() {
    this.isMusicPlaying = !this.isMusicPlaying; // Cambia el estado
    console.log(`Música ${this.isMusicPlaying ? 'encendida' : 'apagada'}`);
    this.toggleMusic.emit(this.isMusicPlaying); // Emite el nuevo estado
  }
}
