import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { DialogEquipamentoComponent } from './dialog-equipamento/dialog-equipamento.component';
import { EquipamentoChamado } from '../../dto/equipamento-chamado.dto';
import { ChamadosService } from 'src/app/services/chamados/chamados.service';
import { Usuario } from 'src/app/dto/usuario.dto';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { catchError, throwError } from 'rxjs';
import { DialogConfirmacaoComponent } from '../../shared/dialog-confirmacao/dialog-confirmacao.component';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { ChamadoPayload } from 'src/app/dto/chamado-payload.dto';
import { DIALOG_TYPE } from 'src/app/shared/constants';

@Component({
  selector: 'app-abrir-chamado',
  templateUrl: './abrir-chamado.component.html',
  styleUrls: ['./abrir-chamado.component.scss'],
})
export class AbrirChamadoComponent implements OnInit {
  private navigation;
  public empresa;
  public servicos;
  public usuario: Usuario;
  public equipamentosCliente: EquipamentoChamado[] = [];

  payloadChamado;
  telefones: string[] = [];
  email;
  equipamentosChamado: EquipamentoChamado[] = [];
  hasEquipAdded = false;
  isLoading;
  confirmacao = false;

  form: FormGroup = this.formBuilder.group({
    servicosChamado: [],
    sintomas: '',
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private chamadoService: ChamadosService,
    private usuarioService: UsuariosService,
    private equipamentoService: EquipamentosService
  ) {
    this.navigation = this.router.getCurrentNavigation();
    const { empresa, servicos } = this.navigation?.extras?.state;
    this.empresa = empresa;
    this.servicos = servicos;
  }

  ngOnInit() {
    this.isLoading = true;
    this.equipamentoService
      .getEquipamentosByUserId(Number(localStorage.getItem('usuarioId')))
      .subscribe((equips) => {
        equips.map((item) => {
          this.equipamentosCliente.push({
            id: item.id,
            name: item.descricao,
            added: false,
          });
        });
        this.equipamentosChamado = this.equipamentosCliente.map((item) => item);
      });

    this.usuarioService
      .getUsuarioById(Number(localStorage.getItem('usuarioId')))
      .subscribe((resp) => {
        this.usuario = resp;
        this.telefones = this.getTelefonesUsuario();
        this.isLoading = false;
      });
  }

  private getTelefonesUsuario() {
    const tel = [this.usuario.celular_1];
    if (this.usuario.celular_2) tel.push(this.usuario.celular_2);
    if (this.usuario.telefone_1) tel.push(this.usuario.telefone_1);
    if (this.usuario.telefone_2) tel.push(this.usuario.telefone_2);

    return tel;
  }

  goBack() {
    const navigationExtras: NavigationExtras = {
      state: {
        empresa: this.empresa,
      },
    };
    this.router.navigate(['_/empresa_info'], navigationExtras);
  }

  openEquipDialog() {
    const dialogRef = this.dialog.open(DialogEquipamentoComponent, {
      data: this.equipamentosChamado.map((item) => item),
      minHeight: '30vh',
      maxHeight: '30vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const equips = result.map((item) => item);
      this.hasEquipAdded = equips.some((equip) => equip.added === true);
      this.equipamentosChamado = [...equips];
    });
  }

  openConfirmaChamado(result) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: {
        id: result.insertId,
        title: 'Chamado Criado!',
        type: DIALOG_TYPE.CHAMADO,
        empresa: this.empresa.nome_fantasia,
      },
      minHeight: '25vh',
      maxHeight: '40vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['_/chamados']);
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
        next: (result) => {
          this.openConfirmaChamado(result);
          console.log('Chamado criado com sucesso');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getEquipamentosChamado(equipArr) {
    return equipArr.filter((equip) => equip.added === true).map((e) => e.id);
  }

  apagarEquipamento(equip) {
    const index = this.equipamentosChamado.indexOf(equip);
    this.equipamentosChamado[index].added = false;
    this.hasEquipAdded = this.equipamentosChamado.some(
      (equip) => equip.added === true
    );
  }

  getPayload(payload): ChamadoPayload {
    return {
      servicos: payload.servicos,
      usuario_id: this.usuario.id,
      empresa_id: this.empresa.id,
      endereco: this.usuario.endereco,
      equipamentos_id: payload.equipamentos,
      sintomas: payload.sintomas,
    };
  }
}
