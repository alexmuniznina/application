import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { DialogEquipamentoComponent } from './dialog-equipamento/dialog-equipamento.component';
import { EquipamentoChamado } from '../../dto/equipamento-chamado.dto';
import { Chamado } from 'src/app/dto/chamado.dto';
import { faker } from '@faker-js/faker';
import { statusChamado } from 'src/app/shared/constants';
import { ChamadosService } from 'src/app/services/chamados/chamados.service';
import { Usuario } from 'src/app/dto/usuario.dto';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { catchError, throwError } from 'rxjs';
import { DialogConfirmacaoComponent } from './dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-abrir-chamado',
  templateUrl: './abrir-chamado.component.html',
  styleUrls: ['./abrir-chamado.component.scss'],
})
export class AbrirChamadoComponent implements OnInit {
  empresa;
  navigation;
  usuario: Usuario;
  equipamentosCliente: EquipamentoChamado = [
    ['Consul 9.000 BTU 110V', false],
    ['Consul 12.000 BTU 220V', false],
    ['Consul 18.000 BTU 110V', false],
    ['Consul 18.000 BTU 220V', false],
    ['Consul 21.000 BTU 110V', false],
    ['Consul 21.000 BTU 220V', false],
  ];

  payloadChamado;
  telefones: string[] = [];
  email;
  equipamentosChamado: EquipamentoChamado = [];
  hasEquipAdded = false;
  isLoading;
  confirmacao = false;

  form: FormGroup = this._formBuilder.group({
    servicosChamado: [],
    sintomas: '',
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private chamadoService: ChamadosService,
    private usuarioService: UsuariosService
  ) {
    this.navigation = this._router.getCurrentNavigation();
    const { empresa } = this.navigation?.extras?.state;
    this.empresa = empresa;
  }

  ngOnInit() {
    this.isLoading = true;
    this.equipamentosChamado = [...this.equipamentosCliente];
    this.usuarioService
      .getUsuarioById(faker.number.int({ min: 1, max: 6 }))
      .subscribe((resp) => {
        this.usuario = resp;
        this.telefones = this.usuario.telefones;
        this.isLoading = false;
      });
  }

  goBack() {
    const navigationExtras: NavigationExtras = {
      state: {
        empresa: this.empresa,
      },
    };
    this._router.navigate(['_/empresa_info'], navigationExtras);
  }

  get servicos() {
    return ['Limpeza', 'Conserto', 'Instalação', 'Elétrica'];
  }

  openEquipDialog() {
    const dialogRef = this.dialog.open(DialogEquipamentoComponent, {
      data: [...this.equipamentosChamado],
      minHeight: '35vh',
      maxHeight: '40vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.equipamentosChamado = [...result];
      this.hasEquipAdded = this.equipamentosChamado.some(
        (equip) => equip[1] === true
      );
    });
  }

  openConfirmaChamado(payload) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: { id: payload.id, empresa: this.empresa.nomeFantasia },
      minHeight: '25vh',
      maxHeight: '40vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['_/chamados']);
    });
  }

  abrirChamado() {
    this.payloadChamado = this.getPayload({
      servicos: this.form.controls['servicosChamado'].value?.map((servico) =>
        servico.toLowerCase()
      ),
      sintomas: this.form.controls['sintomas'].value,
      equipamentos: this.getEquipamentosChamado(this.equipamentosChamado),
    });

    this.chamadoService
      .criarChamado(this.payloadChamado)
      .pipe(
        catchError(() => {
          return throwError(
            () => new Error('Algo deu errado na hora de criar o chamado :(')
          );
        })
      )
      .subscribe({
        next: (resp) => {
          this.openConfirmaChamado(this.payloadChamado);
          console.log('chamado criado com sucesso');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getEquipamentosChamado(equipArr) {
    const equips = equipArr.filter((equip) => equip[1] === true);
    return equips.map((eq) => eq[0]);
  }

  apagarEquipamento(equip) {
    const index = this.equipamentosChamado.indexOf(equip);
    this.equipamentosChamado[index][1] = false;
  }

  getPayload(payload): Chamado {
    return {
      id: faker.number.int(),
      servicos: payload.servicos,
      id_usuario: this.usuario.id,
      id_empresa: this.empresa.id,
      endereco: this.usuario.endereco,
      equipamentos: payload.equipamentos,
      criadoEm: new Date().toISOString(),
      status: statusChamado.CRIADO,
      sintomas: payload.sintomas,
    };
  }
}
