import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Chamado } from 'src/app/dto/chamado.dto';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
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

  constructor(
    private router: Router,
    private empresaService: EmpresasService
  ) {}

  ngOnInit() {
    // criar esse endpoint
    this.empresaService
      .getEmpresaById(this.chamado.empresa_id)
      .subscribe((emp) => {
        this.nomeEmpresa = emp.nome_fantasia;
      });
  }

  get status() {
    return STATUS_CHAMADO[this.chamado.status];
  }

  get servicos() {
    // criar esse endpoint
    // let serv = this.chamado.servicos?.map(
    //   (s) => s.charAt(0).toUpperCase() + s.slice(1)
    // );
    // return serv ? serv?.join(', ') : '';
    return '';
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
