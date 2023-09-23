import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Chamado } from 'src/app/dto/chamado.dto';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { STATUS_CHAMADO } from 'src/app/shared/constants';

@Component({
  selector: 'app-card-chamado',
  templateUrl: './card-chamado.component.html',
  styleUrls: ['./card-chamado.component.scss'],
})
export class CardChamadoComponent {
  @Input() chamado: Chamado;
  avaliacao;
  nomeEmpresa;
  servicos;

  constructor(
    private router: Router,
    private empresasService: EmpresasService,
    private servicosService: ServicosService
  ) {}

  ngOnInit() {
    this.empresasService
      .getEmpresaById(this.chamado.empresa_id)
      .subscribe((emp) => {
        this.nomeEmpresa = emp.nome_fantasia;
      });

    this.servicosService
      .getServicosByEmpresaId(this.chamado.empresa_id)
      .subscribe((servs) => {
        this.servicos = servs
          ?.map(
            (s) =>
              s.tipo.charAt(0).toUpperCase() + s.tipo.slice(1).toLowerCase()
          )
          .join(', ');
      });
  }

  get status() {
    return STATUS_CHAMADO[this.chamado.status];
  }

  abrirChamadoInfo(chamado: Chamado) {
    const navigationExtras: NavigationExtras = {
      state: {
        chamado: chamado,
      },
    };
    this.router.navigate(['_/chamado_info'], navigationExtras);
  }
}
