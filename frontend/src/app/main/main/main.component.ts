import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SidenavService],
})
export class MainComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  menuList = [
    {
      title: 'Dados Pessoais',
      route: '_/dados_pessoais',
    },
    {
      title: 'Equipamentos',
      route: '_/equipamentos',
    },
    {
      title: 'Alertas',
      route: '_/alertas',
    },
    {
      title: 'Suporte',
      route: '_/suporte',
    },
    {
      title: 'Quem Somos',
      route: '_/quem_somos',
    },
    {
      title: 'Sobre o App',
      route: '_/about',
    },
    {
      title: 'Sair',
      route: null,
    },
  ];

  constructor(private sidenavService: SidenavService) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
