import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ToolbarService } from 'src/app/services/toolbar/toolbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [SidenavService],
})
export class MainComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public username;
  public userAutenticado;

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

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private toolbarService: ToolbarService,
    private headerService: HeaderService
  ) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit() {
    this.toolbarService.setEnabled(true);
    this.headerService.getAuthState().subscribe((isAuth) => {
      this.username = this.headerService.getUsername();
      this.userAutenticado = isAuth;
    });
  }

  public sair() {
    localStorage.clear();
    this.sidenav.close();
    this.headerService.setAuthState(false);
    this.headerService.setUsername('');
    this.toolbarService.setEnabled(false);
    this.router.navigate(['_/login']);
  }
}
