import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { TIPO_SERVICO } from 'src/app/shared/constants';

@Component({
  selector: 'app-empresa-info',
  templateUrl: './empresa-info.component.html',
  styleUrls: ['./empresa-info.component.scss'],
})
export class EmpresaInfoComponent implements OnInit {
  private navigation;
  public empresa;
  public servicos: any[] = [];
  public telefones: any[];

  constructor(
    private router: Router,
    private empresasServico: EmpresasService
  ) {
    this.navigation = this.router.getCurrentNavigation();
    const { empresa } = this.navigation?.extras.state;
    this.empresa = empresa;
  }

  ngOnInit() {
    this.empresasServico
      .getEmpresasWithServicos(this.empresa.id)
      .subscribe((emp) => {
        emp.servicos.map((item) => {
          const tipo = item.tipo.toUpperCase();
          this.servicos.push(TIPO_SERVICO[tipo as keyof typeof TIPO_SERVICO]);

          this.telefones = [...emp.telefone, ...emp.celular];
        });
      });
  }

  goBack() {
    this.router.navigate(['_/home']);
  }

  abrirChamado(empresa) {
    const navigationExtras: NavigationExtras = {
      state: {
        empresa: empresa,
        servicos: this.servicos,
      },
    };
    this.router.navigate(['_/abrir_chamado'], navigationExtras);
  }
}
