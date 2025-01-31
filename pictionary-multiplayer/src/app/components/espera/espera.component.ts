import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { PartidaService } from '../../services/partida.service';


@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css'],
  standalone: false
})
export class EsperaComponent implements OnInit {
  @Input() esEditable: boolean = false; // Nueva propiedad para controlar los permisos de edición
  @Output() cambiarEstado = new EventEmitter<string>();
  codigoPartida: string = '';
  nombreJugador: string = '';
  public formOpciones!: FormGroup;
  tiempoDibujo: number = 5;
  rondas: number = 3;
  modalMessage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: ModalService,
    private partidaService: PartidaService
  ) {
    this.formBuild();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['esEditable']) {
      this.updateFormControls();
    }
  }

  ngOnInit(): void {
    this.modalService.codigoPartida$.subscribe(codigo => {
      this.codigoPartida = codigo || '';
    });

    this.modalService.jugadorTurno$.subscribe(nombre => {
      this.nombreJugador = nombre || '';
    });

    this.formOpciones.get('tiempoDibujo')?.valueChanges.subscribe(value => {
      this.tiempoDibujo = value;
    });

    this.formOpciones.get('rondas')?.valueChanges.subscribe(value => {
      this.rondas = value;
    });
  }

  private formBuild() {
    this.formOpciones = this._formBuilder.group({
      numeroPlayers: [{ value: 8, disabled: this.esEditable }],
      tiempoDibujo: [{ value: 5, disabled: this.esEditable }],
      rondas: [{ value: 3, disabled: this.esEditable }]
    });
  }

  private updateFormControls() {
    if (this.formOpciones) {
      Object.keys(this.formOpciones.controls).forEach(controlName => {
        const control = this.formOpciones.get(controlName);
        if (this.esEditable) {
          control?.enable();
        } else {
          control?.disable();
        }
      });
    }
  }

  iniciar() {
    if (this.esEditable) {
      this.partidaService.iniciarPartida(this.codigoPartida, this.tiempoDibujo.toString(), this.rondas.toString(), this.formOpciones.get('numeroPlayers')?.value.toString())
        .subscribe({
          next: (response) => {
            console.log('Partida iniciada:', response);
            this.cambiarEstado.emit('seleccionandoPalabra');
            this.partidaService.enviarMensajeChat(this.codigoPartida, "System", `${this.nombreJugador} esta seleccionando la palabra.`);
          },
          error: (err) => {
            console.error('Error al iniciar la partida:', err);
          }
        });
    } else {
      console.log('No tienes permisos para iniciar la partida.');
    }
  }

  copyToClipboard() {
    if (this.codigoPartida) {
      navigator.clipboard.writeText(this.codigoPartida).then(() => {
        this.modalMessage = '¡Código copiado al portapapeles!';
      }).catch(err => {
        this.modalMessage = 'Error al copiar el código al portapapeles.';
      });
    }
  }
}