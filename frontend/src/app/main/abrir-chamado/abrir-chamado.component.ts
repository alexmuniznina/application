import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { DialogEquipamentoComponent } from './dialog-equipamento/dialog-equipamento.component';
import { EquipamentoChamado } from '../../dto/equipamento-chamado.dto';

@Component({
  selector: 'app-abrir-chamado',
  templateUrl: './abrir-chamado.component.html',
  styleUrls: ['./abrir-chamado.component.scss'],
})
export class AbrirChamadoComponent {
  empresa;
  navigation;
  equipamentosCliente: EquipamentoChamado = [
    ['Consul 9.000 BTU 110V', false],
    ['Consul 12.000 BTU 220V', false],
    ['Consul 18.000 BTU 110V', false],
    ['Consul 18.000 BTU 220V', false],
    ['Consul 21.000 BTU 110V', false],
    ['Consul 21.000 BTU 220V', false],
  ];
  endereco =
    'Av. Coronel Teixeira 6225, London T8-1234, Ponta Negra, Manaus - Amazonas, 69032-654';
  telefones = [
    '(11) 3214-5689',
    '(92) 98456-3216',
    '(11) 3214-5698',
    '(11) 94561-1236',
  ];
  emails = ['email@gmail.com', 'suporte@hotmail.com'];

  equipamentosChamado: EquipamentoChamado = [];
  hasEquipAdded = false;

  form: FormGroup = this._formBuilder.group({
    servicosChamado: [],
    defeitos: '',
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.navigation = this._router.getCurrentNavigation();
    const { empresa } = this.navigation?.extras?.state;
    this.empresa = empresa;
    this.equipamentosChamado = [...this.equipamentosCliente];
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

  openDialog() {
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

  abrirChamado() {
    const payloadChamado = {
      servicosChamados: this.form.controls['servicosChamado'].value.map(
        (servico) => servico.toLowerCase()
      ),
      defeitos: this.form.controls['defeitos'].value,
      equipamentos: this.getEquipamentosChamado(this.equipamentosChamado),
    };
    console.log(payloadChamado);
  }

  getEquipamentosChamado(equipArr) {
    const equips = equipArr.filter((equip) => equip[1] === true);
    return equips.map((eq) => eq[0]);
  }

  apagarEquipamento(equip) {
    const index = this.equipamentosChamado.indexOf(equip);
    this.equipamentosChamado[index][1] = false;
  }
}
