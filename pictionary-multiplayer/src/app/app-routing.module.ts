import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { PartidaComponent } from './components/partida/partida.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SelectWordPageComponent } from './pages/select-word-page/select-word-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Ruta inicial
  { path: 'palabra', component: SelectWordPageComponent }, // Ruta para el inicio de la partida
  { path: 'partida', component: PartidaComponent }, // Ruta para la partida, donde se gestiona el juego
  { path: 'resumen', component: ResumenComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirección para rutas no existentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
