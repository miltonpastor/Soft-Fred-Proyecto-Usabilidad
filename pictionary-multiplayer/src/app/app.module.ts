import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UnirsePartidaComponent } from './components/unirse-partida/unirse-partida.component';
import { PartidaComponent } from './components/partida/partida.component';
import { AudioModalComponent } from './components/audio-modal/audio-modal.component';
import { DrawingAreaComponent } from './components/drawing-area/drawing-area.component';
import { EsperaComponent } from './components/espera/espera.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SelectWordPageComponent } from './pages/select-word-page/select-word-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ResumenComponent,
    UnirsePartidaComponent,
    PartidaComponent,
    AudioModalComponent,
    DrawingAreaComponent,
    EsperaComponent,
    HomePageComponent,
    SelectWordPageComponent,
    GamePageComponent,
    HeaderComponent
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
