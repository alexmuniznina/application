import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { AlertasComponent } from './alertas/alertas.component';
import { EmpresaInfoComponent } from './empresa-info/empresa-info.component';
import { AbrirChamadoComponent } from './abrir-chamado/abrir-chamado.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { SuporteComponent } from './suporte/suporte.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { AboutComponent } from './about/about.component';
import { AdicionarEquipamentoComponent } from './adicionar-equipamento/adicionar-equipamento.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '_/home',
        component: HomeComponent,
      },
      {
        path: '_/favoritos',
        component: FavoritosComponent,
      },
      {
        path: '_/empresa_info',
        component: EmpresaInfoComponent,
      },
      {
        path: '_/chamados',
        component: ChamadosComponent,
      },
      {
        path: '_/abrir_chamado',
        component: AbrirChamadoComponent,
      },
      {
        path: '_/alertas',
        component: AlertasComponent,
      },
      {
        path: '_/ajustes',
        component: AjustesComponent,
      },
      {
        path: '_/dados_pessoais',
        component: DadosPessoaisComponent,
      },
      {
        path: '_/equipamentos',
        component: EquipamentosComponent,
      },
      {
        path: '_/suporte',
        component: SuporteComponent,
      },
      {
        path: '_/quem_somos',
        component: QuemSomosComponent,
      },
      {
        path: '_/about',
        component: AboutComponent,
      },
      {
        path: '_/adicionar_equipamento',
        component: AdicionarEquipamentoComponent,
      },
      {
        path: '_/login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
