import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { PartidaService } from '../../services/partida.service';

@Component({
  selector: 'app-espera',
  standalone: false,
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css']
})
export class EsperaComponent implements OnInit {
  @Input() codigoPartida: string = '';
  public formOpciones!: FormGroup;
  tiempoDibujo: number = 5;
  rondas: number = 3;
  modalMessage: string = '';
  mostrarSelectWord: boolean = false; // Nueva propiedad para controlar la visibilidad

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: ModalService,
    private partidaService: PartidaService
  ) {
    this.formBuild();
  }

  ngOnInit(): void {
    this.modalService.codigoPartida$.subscribe(codigo => {
      this.codigoPartida = codigo || '';
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
      numeroPlayers: [8],
      tiempoDibujo: [5],
      rondas: [3],
      ayudas: [2]
    });
  }

  iniciar() {
    // Aquí puedes usar las variables tiempoDibujo, rondas y codigoPartida
    this.partidaService.iniciarRonda(this.codigoPartida, this.tiempoDibujo, this.rondas);
  }

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

  mostrarSelectWordComponent() {
    this.mostrarSelectWord = true;
  }

  cerrarSelectWordComponent() {
    this.mostrarSelectWord = false;
  }
}