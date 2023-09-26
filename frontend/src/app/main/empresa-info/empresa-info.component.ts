import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Empresa } from 'src/app/dto/empresa.dto';
import { Servico } from 'src/app/dto/servico.dto';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { TIPO_SERVICO } from 'src/app/shared/constants';

@Component({
  selector: 'app-empresa-info',
  templateUrl: './empresa-info.component.html',
  styleUrls: ['./empresa-info.component.scss'],
})
export class EmpresaInfoComponent implements OnInit {
  private navigation;
  public empresa: Empresa;
  private servicos: Servico[];
  public servicosString: string[] = [];
  public telefones: any[];

  constructor(
    private router: Router,
    private servicosServico: ServicosService
  ) {
    this.navigation = this.router.getCurrentNavigation();
    const { empresa } = this.navigation?.extras.state;
    this.empresa = empresa;
  }

  ngOnInit() {
    this.servicosServico
      .getServicosByEmpresaId(this.empresa.id)
      .subscribe((servicos) => {
        this.servicos = servicos;
        servicos.map((item) => {
          const tipo = item.tipo.toUpperCase();
          this.servicosString.push(
            TIPO_SERVICO[tipo as keyof typeof TIPO_SERVICO]
          );
          this.telefones = this.getTelefones();
        });
      });
  }

  private getTelefones() {
    const tel = [this.empresa.celular_1];
    if (this.empresa.celular_2) tel.push(this.empresa.celular_2);
    if (this.empresa.telefone_1) tel.push(this.empresa.telefone_1);
    if (this.empresa.telefone_2) tel.push(this.empresa.telefone_2);

    return tel;
  }

  goBack() {
    this.router.navigate(['_/home']);
  }

  abrirChamado(empresa) {
    const navigationExtras: NavigationExtras = {
      state: {
        empresa: empresa,
        servicos: this.servicos.map((item) => item.tipo),
      },
    };
    this.router.navigate(['_/abrir_chamado'], navigationExtras);
  }
}
