import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AlertasComponent } from './alertas/alertas.component';
import { EmpresasService } from '../services/empresas/empresas.service';
import { ServicosService } from '../services/servicos/servicos.service';
import { CardEmpresaComponent } from './home/card-empresa/card-empresa.component';
import { EmpresaInfoComponent } from './empresa-info/empresa-info.component';
import { AbrirChamadoComponent } from './abrir-chamado/abrir-chamado.component';
import { DialogEquipamentoComponent } from './abrir-chamado/dialog-equipamento/dialog-equipamento.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    FavoritosComponent,
    ChamadosComponent,
    AjustesComponent,
    AlertasComponent,
    CardEmpresaComponent,
    EmpresaInfoComponent,
    AbrirChamadoComponent,
    DialogEquipamentoComponent,
  ],
  imports: [SharedModule, MainRoutingModule],
  exports: [MainComponent, CardEmpresaComponent, EmpresaInfoComponent],
  providers: [EmpresasService, ServicosService],
})
export class MainModule {}
