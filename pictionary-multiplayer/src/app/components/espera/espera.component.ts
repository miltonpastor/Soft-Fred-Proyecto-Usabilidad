import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-espera',
  standalone: false,
  templateUrl: './espera.component.html',
  styleUrl: './espera.component.css'
})
export class EsperaComponent {
  public formOpciones!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ){
    this.formBuild();
  }

  private formBuild(){
    this.formOpciones = this._formBuilder.group({
      numeroPlayers: [8],
      tiempoDibujo: [90],
      rondas: [3],
      ayudas: [2]
    })
  }

  iniciar(){
    
  }

}
