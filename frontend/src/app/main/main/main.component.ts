import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SidenavService],
})
export class MainComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public menuList = [
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
    },
  ];

  constructor(private sidenavService: SidenavService, private router: Router) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  public sair() {
    localStorage.clear();
    this.sidenav.close();
    this.router.navigate(['_/login']);
  }
}
