import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/header/auth.service';
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
    private AuthService: AuthService
  ) {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnInit() {
    this.toolbarService.setEnabled(true);
    this.AuthService.getAuthState().subscribe((isAuth) => {
      this.userAutenticado = isAuth;
    });
  }

  public sair() {
    localStorage.clear();
    this.sidenav.close();
    this.AuthService.setAuthState(false);
    this.toolbarService.setEnabled(false);
    this.router.navigate(['_/login']);
  }
}
