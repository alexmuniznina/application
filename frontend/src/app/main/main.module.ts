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
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { ChamadosService } from '../services/chamados/chamados.service';
import { CardChamadoComponent } from './chamados/card-chamado/card-chamado.component';
import { EquipamentosService } from '../services/equipamentos/equipamentos.service';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { SuporteComponent } from './suporte/suporte.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { AboutComponent } from './about/about.component';
import { AdicionarEquipamentoComponent } from './adicionar-equipamento/adicionar-equipamento.component';
import { LoginComponent } from './login/login.component';
import { DialogRemoveEquipamentoComponent } from './equipamentos/dialog-remove-equipamento/dialog-remove-equipamento/dialog-remove-equipamento.component';

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
    CardChamadoComponent,
    DadosPessoaisComponent,
    EquipamentosComponent,
    SuporteComponent,
    QuemSomosComponent,
    AboutComponent,
    AdicionarEquipamentoComponent,
    LoginComponent,
    DialogRemoveEquipamentoComponent,
  ],
  imports: [SharedModule, MainRoutingModule],
  exports: [MainComponent, CardEmpresaComponent, EmpresaInfoComponent],
  providers: [
    EmpresasService,
    ServicosService,
    UsuariosService,
    ChamadosService,
    EquipamentosService,
  ],
})
export class MainModule {}
