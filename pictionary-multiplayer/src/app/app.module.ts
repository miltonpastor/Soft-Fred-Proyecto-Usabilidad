import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CrearPartidaComponent } from './components/crear-partida/crear-partida.component';
import { UnirsePartidaComponent } from './components/unirse-partida/unirse-partida.component';
import { PartidaComponent } from './components/partida/partida.component';
import { AudioModalComponent } from './components/audio-modal/audio-modal.component';
import { DrawingAreaComponent } from './components/drawing-area/drawing-area.component';
import { EsperaComponent } from './components/espera/espera.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ResumenComponent,
    CrearPartidaComponent,
    UnirsePartidaComponent,
    PartidaComponent,
    AudioModalComponent,
    DrawingAreaComponent,
    EsperaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
