import { Component } from '@angular/core';

@Component({
  selector: 'app-interfaz-ajustes',
  templateUrl: './interfaz-ajustes.component.html',
  standalone: false
})
export class InterfazAjustesComponent {
  soundEnabled: boolean = true;
  shortcuts: { [key: string]: string } = {
    'ctrl+z': 'Deshacer',
    'ctrl+y': 'Rehacer',
    // Añade más atajos según sea necesario
  };

}

