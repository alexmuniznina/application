import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import {
  FABRICANTE,
  BTU,
  COMODO,
  VOLT,
  DIALOG_TYPE,
} from 'src/app/shared/constants';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-adicionar-equipamento',
  templateUrl: './adicionar-equipamento.component.html',
  styleUrls: ['./adicionar-equipamento.component.scss'],
})
export class AdicionarEquipamentoComponent {
  @ViewChild('mesmoEndereco') checkbox;
  public isFormValid: boolean;
  public form: FormGroup;
  private usuarioId: number;
  private endereco = '';
  public fabricantes = Object.values(FABRICANTE);
  public btus = Object.keys(BTU);
  public comodos = Object.values(COMODO);
  public volts = Object.values(VOLT);

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private equipamentoService: EquipamentosService,
    private usuarioService: UsuariosService
  ) {
    this.usuarioId = Number(localStorage.getItem('usuarioId'));
  }

  ngOnInit() {
    this.form = new FormGroup({
      marca: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      btu: new FormControl({ value: '', disabled: false }, Validators.required),
      comodo: new FormControl({ value: '', disabled: false }),
      volt: new FormControl({ value: '', disabled: false }),
      endereco: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      numeroSerie: new FormControl({ value: '', disabled: false }),
    });

    this.usuarioService.getUsuarioById(this.usuarioId).subscribe((usuario) => {
      this.form.controls['endereco'].setValue(usuario.endereco);
      this.endereco = usuario.endereco;
    });

    this.form.valueChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });
  }

  public goBack() {
    this.router.navigate(['_/equipamentos']);
  }

  public limpar() {
    this.form.reset();
    this.checkbox.checked = true;
    this.setResetEndereco(true);
  }

  private getDescricao(fields) {
    return fields.marca
      .concat(' ')
      .concat(fields.btu)
      .concat(' BTU')
      .concat(fields.volt ? ` ${fields.volt}V` : '');
  }

  public setResetEndereco(checked) {
    const enderecoControl = this.form.controls['endereco'];
    if (checked) {
      enderecoControl.enable();
      this.form.controls['endereco'].setValue(this.endereco);
    } else {
      enderecoControl.reset();
      enderecoControl.disable();
    }
  }

  private openConfirmaAdicionarEquipamento(result) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: {
        title: 'Equipamento Adicionado!',
        type: DIALOG_TYPE.EQUIPAMENTO,
        equipamento: result.descricao,
      },
      minHeight: '30vh',
      maxHeight: '30vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.goBack();
    });
  }

  public salvar() {
    const fields = this.form.getRawValue();

    const payload = {
      usuario_id: this.usuarioId,
      descricao: this.getDescricao(fields),
      num_serie: fields.numeroSerie,
      btu: fields.btu,
      volt: fields.volt,
      marca: fields.marca,
      comodo: fields.comodo,
      endereco: fields.endereco,
    };

    this.equipamentoService
      .adicionarEquipamento(payload)
      .pipe(
        catchError(() => {
          return throwError(
            () => new Error('Algo deu errado ao adicionar o equipamento. :(')
          );
        })
      )
      .subscribe({
        next: (result) => {
          this.openConfirmaAdicionarEquipamento(payload);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
