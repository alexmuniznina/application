import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';
import { FavoritosComponent } from '../favoritos/favoritos.component';
import { ChamadosComponent } from '../chamados/chamados.component';
import { AjustesComponent } from '../ajustes/ajustes.component';
import { AlertasComponent } from '../alertas/alertas.component';

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
        path: '_/chamados',
        component: ChamadosComponent,
      },
      {
        path: '_/alertas',
        component: AlertasComponent,
      },
      {
        path: '_/ajustes',
        component: AjustesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
