import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/dto/usuario.dto';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { DIALOG_TYPE, ESTADOS } from '../../shared/constants';
import { DialogConfirmacaoComponent } from 'src/app/shared/dialog-confirmacao/dialog-confirmacao.component';
import { catchError, throwError } from 'rxjs';
import { ToolbarService } from 'src/app/services/toolbar/toolbar.service';
import { AuthService } from 'src/app/services/header/auth.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
})
export class DadosPessoaisComponent {
  public form: FormGroup;
  public isCreating: boolean = false;
  public usuario: Usuario;
  public isFormValid: boolean = false;
  public estados = Object.values(ESTADOS);
  public visible: boolean = false;
  // private navigation;

  formFields = [
    {
      controlName: 'cpf',
      label: 'CPF',
      required: true,
      maxLength: 14,
      type: 'input',
    },
    {
      controlName: 'nome',
      label: 'Nome Completo',
      required: true,
      maxLength: 255,
      type: 'input',
    },
    {
      controlName: 'email',
      label: 'E-mail',
      required: true,
      maxLength: 50,
      type: 'input',
    },
    {
      controlName: 'endereco',
      label: 'Endereço',
      required: true,
      maxLength: 255,
      type: 'input',
    },
    {
      controlName: 'complemento',
      label: 'Complemento (Opcional)',
      required: false,
      maxLength: 100,
      type: 'input',
    },
    {
      controlName: 'bairro',
      label: 'Bairro',
      required: true,
      maxLength: 100,
      type: 'input',
    },
    {
      controlName: 'cidade',
      label: 'Cidade',
      required: true,
      maxLength: 100,
      type: 'input',
    },
    {
      controlName: 'estado',
      label: 'Estado',
      required: true,
      maxLength: 2,
      type: 'dropdown',
    },
    {
      controlName: 'cep',
      label: 'CEP',
      required: true,
      maxLength: 9,
      type: 'input',
    },
    {
      controlName: 'celular_1',
      label: 'DDD + Celular 1',
      required: true,
      maxLength: 15,
      type: 'input',
    },
    {
      controlName: 'celular_2',
      label: 'DDD + Celular 2 (Opcional)',
      required: false,
      maxLength: 15,
      type: 'input',
    },
    {
      controlName: 'telefone_1',
      label: 'DDD + Telefone 1 (Opcional)',
      required: false,
      maxLength: 15,
      type: 'input',
    },
    {
      controlName: 'telefone_2',
      label: 'DDD + Telefone 2 (Opcional)',
      required: false,
      maxLength: 15,
      type: 'input',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private router: Router,
    private toolbarService: ToolbarService,
    private authService: AuthService
  ) {
    if (localStorage.getItem('isCreating') === 'true') {
      this.isCreating = true;
    }

    if (!this.authService.getAuthState()) {
      this.toolbarService.setEnabled(false);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.minLength(9)]],
      telefone_1: ['', [Validators.minLength(14)]],
      telefone_2: ['', [Validators.minLength(14)]],
      celular_1: ['', [Validators.required, Validators.minLength(15)]],
      celular_2: ['', [Validators.minLength(15)]],
      email: ['', [Validators.required]],
    });

    if (this.isCreating) {
      this.form.addControl(
        'senha',
        new FormControl('', Validators.minLength(6))
      );
    }

    if (!this.isCreating) {
      this.usuariosService
        .getUsuarioById(Number(localStorage.getItem('usuarioId')))
        .subscribe((usuario) => {
          this.usuario = usuario;
          this.form.patchValue(usuario);
          this.formatFields();
          this.disableFields();
        });
    }

    this.form.valueChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });
  }

  private disableFields() {
    this.form.controls['cpf'].disable();
    this.form.controls['nome'].disable();
    this.form.controls['email'].disable();
  }

  private formatCpf(value: string) {
    const cpf = value?.replace(/\D/g, '');
    return cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  private formatTelefone(fone: string) {
    const telefone = fone?.replace(/\D/g, '');
    return telefone?.replace(/(\d{2})(\d{5}|\d{4})(\d{4})/g, '($1) $2-$3');
  }

  private formatCelular(fone: string) {
    const telefone = fone?.replace(/\D/g, '');
    return telefone?.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  }

  private formatCep(cep: string) {
    const cepNew = cep?.replace(/\D/g, '');
    return cepNew?.replace(/(\d{5})(\d{3})/g, '$1-$2');
  }

  private formatFields() {
    this.formFields.map((field) => {
      const fieldControl = field.controlName;
      const value = this.form.get(fieldControl)?.value;
      if (value === undefined || value === null)
        this.form.controls[fieldControl].setValue('');
      this.formatField(value, fieldControl);
    });
  }

  private formatField(value, controlName) {
    switch (controlName) {
      case 'celular_1':
      case 'celular_2':
        this.form.controls[controlName].setValue(this.formatCelular(value));
        break;
      case 'telefone_1':
      case 'telefone_2':
        this.form.controls[controlName].setValue(this.formatTelefone(value));
        break;
      case 'cep':
        this.form.controls[controlName].setValue(this.formatCep(value));
        break;
      case 'cpf':
        this.form.controls[controlName].setValue(this.formatCpf(value));
        break;
      default:
        break;
    }
  }

  public onKeyUp(controlName) {
    const value = this.form.get(controlName)?.value;
    this.formatField(value, controlName);
  }

  private openConfirmationDialog(payload) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent, {
      data: { id: payload.insertId, title: payload.title, type: payload.type },
      minHeight: '30vh',
      maxHeight: '70vh',
      minWidth: '55vw',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      if (payload.type === DIALOG_TYPE.ATUALIZA_USUARIO)
        this.router.navigate(['_/home']);
      else if (payload.type === DIALOG_TYPE.NOVO_USUARIO)
        this.router.navigate(['_/login']);
    });
  }

  public cancelar() {
    if (this.authService.getAuthState()) {
      this.router.navigate(['_/home']);
    } else {
      this.router.navigate(['_/login']);
    }
  }

  public salvar() {
    if (this.form.valid) {
      const usuarioPayload = this.form.getRawValue();

      try {
        if (!this.isCreating) {
          this.usuariosService
            .updateUsuario(this.usuario.id, usuarioPayload)
            .pipe(
              catchError(() => {
                return throwError(
                  () =>
                    new Error(
                      'Algo deu errado ao atualizar os dados do usuário. :('
                    )
                );
              })
            )
            .subscribe({
              next: (result) => {
                const payload = {
                  type: DIALOG_TYPE.ATUALIZA_USUARIO,
                  title: 'Atualiza Dados de Usuário',
                  ...result,
                };
                this.openConfirmationDialog(payload);
              },
              error: (err) => {
                console.error(err);
              },
            });
        } else {
          this.usuariosService
            .criarUsuario(usuarioPayload)
            .pipe(
              catchError(() => {
                return throwError(
                  () => new Error('Algo deu errado ao criar o usuário. :(')
                );
              })
            )
            .subscribe({
              next: (result) => {
                const payload = {
                  ...result,
                  type: DIALOG_TYPE.NOVO_USUARIO,
                  title: 'Criar Usuário',
                };
                localStorage.removeItem('isCreating');
                this.isCreating = false;
                this.openConfirmationDialog(payload);
              },
              error: (err) => {
                console.error(err);
              },
            });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
