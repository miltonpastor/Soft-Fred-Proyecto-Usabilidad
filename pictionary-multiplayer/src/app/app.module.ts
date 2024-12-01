import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InterfazDibujanteComponent } from './components/interfaz-dibujante/interfaz-dibujante.component';
import { InterfazAdivinarComponent } from './components/interfaz-adivinar/interfaz-adivinar.component';
import { InterfazAjustesComponent } from './components/interfaz-ajustes/interfaz-ajustes.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CrearPartidaComponent } from './components/crear-partida/crear-partida.component';
import { UnirsePartidaComponent } from './components/unirse-partida/unirse-partida.component';
import { PartidaComponent } from './components/partida/partida.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InterfazDibujanteComponent,
    InterfazAdivinarComponent,
    InterfazAjustesComponent,
    ResumenComponent,
    CrearPartidaComponent,
    UnirsePartidaComponent,
    PartidaComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
