import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { InterfazDibujanteComponent } from './components/interfaz-dibujante/interfaz-dibujante.component';
import { InterfazAdivinarComponent } from './components/interfaz-adivinar/interfaz-adivinar.component';
import { InterfazAjustesComponent } from './components/interfaz-ajustes/interfaz-ajustes.component';
import { SalaEsperaComponent } from './components/sala-espera/sala-espera.component';
import { ResumenComponent } from './components/resumen/resumen.component';

const routes: Routes = [
  { path: '', component: InicioComponent }, // Ruta inicial
  { path: 'sala-espera', component: SalaEsperaComponent },
  { path: 'dibujar', component: InterfazDibujanteComponent },
  { path: 'adivinar', component: InterfazAdivinarComponent },
  { path: 'ajustes', component: InterfazAjustesComponent },
  { path: 'resumen', component: ResumenComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirección para rutas no existentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
