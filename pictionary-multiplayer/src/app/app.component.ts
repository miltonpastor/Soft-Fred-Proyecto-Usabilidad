import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  
  title = 'pictionary-multiplayer';
  @ViewChild('backgroundAudio', { static: true }) backgroundAudio!: ElementRef<HTMLAudioElement>;
  isModalOpen = false;
  isMusicPlaying = false;
  currentVolume = 1;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  /**
   * Cambiar el volumen de la música de fondo.
   * @param volume Nivel de volumen (entre 0 y 1).
   */
  setVolume(volume: number) {
    this.currentVolume = volume; // Guardar el volumen actual
    this.backgroundAudio.nativeElement.volume = volume;
  }

  toggleBackgroundMusic(isPlaying: boolean) {
    const audioElement = this.backgroundAudio.nativeElement;

    if (isPlaying) {
      audioElement.loop = true;
      audioElement.play().then(() => {
        this.isMusicPlaying = true;
        console.log('Música de fondo activada.');
      }).catch(error => {
        console.error('Error al reproducir el audio:', error);
      });
    } else {
      audioElement.pause();
      this.isMusicPlaying = false;
      console.log('Música de fondo desactivada.');
    }
  }

}

