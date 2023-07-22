import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing/main-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AlertasComponent } from './alertas/alertas.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    FavoritosComponent,
    ChamadosComponent,
    AjustesComponent,
    AlertasComponent,
  ],
  imports: [SharedModule, MainRoutingModule],
})
export class MainModule {}
