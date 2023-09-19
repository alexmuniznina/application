import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';
import { Usuario } from 'src/app/dto/usuario.dto';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { DialogDadosSalvosComponent } from './dialog-dados-salvos/dialog-dados-salvos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
})
export class DadosPessoaisComponent {
  form: FormGroup;

  formFields = [
    {
      controlName: 'cpf',
      label: 'CPF',
      required: true,
      maxLength: 11,
    },
    {
      controlName: 'nome',
      label: 'Nome e Sobrenome',
      required: true,
      maxLength: 70,
    },
    {
      controlName: 'endereco',
      label: 'Endereço',
      required: true,
      maxLength: 70,
    },
    {
      controlName: 'complemento',
      label: 'Complemento (Opcional)',
      required: false,
      maxLength: 50,
    },
    {
      controlName: 'bairro',
      label: 'Bairro',
      required: true,
      maxLength: 30,
    },
    {
      controlName: 'cidade',
      label: 'Cidade',
      required: true,
      maxLength: 30,
    },
    {
      controlName: 'estado',
      label: 'Estado',
      required: true,
      maxLength: 2,
    },
    {
      controlName: 'cep',
      label: 'CEP',
      required: true,
      maxLength: 8,
    },
    {
      controlName: 'telefone',
      label: 'DDD + Telefone (Opcional)',
      required: false,
      maxLength: 10, // 9236467777
    },
    {
      controlName: 'celular',
      label: 'DDD + Celular',
      required: true,
      maxLength: 11, // 92991668263
    },
    {
      controlName: 'email',
      label: 'E-mail',
      required: true,
      maxLength: 30,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      cpf: [''],
      nome: [''],
      endereco: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      cep: [''],
      telefone: [''],
      celular: [''],
      email: [''],
    });
  }

  formatCpf(value: string) {
    const cnpjCpf = value.replace(/\D/g, '');
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  formatTelefone(fone: string) {
    const telefone = fone.replace(/\D/g, '');
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
  }

  formatCelular(fone: string) {
    const telefone = fone.replace(/\D/g, '');
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  }

  formatCep(cep: string) {
    const cepNew = cep.replace(/\D/g, '');
    return cepNew.replace(/(\d{5})(\d{3})/g, '$1-$2');
  }

  getTelefones(formFields) {
    const telefones: string[] = [
      this.formatTelefone(formFields.telefone),
      this.formatCelular(formFields.celular),
    ];
    const tel = telefones.filter((num) => num !== '' && num !== undefined);
    return tel;
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(DialogDadosSalvosComponent, {
      minHeight: '25vh',
      maxHeight: '40vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['_/home']);
    });
  }

  salvar() {
    if (this.form.valid) {
      const formFields = this.form.getRawValue();
      const telefones = this.getTelefones(formFields);
      const usuario: Usuario = {
        id: faker.number.int({ min: 10, max: 300 }),
        cpf: this.formatCpf(formFields.cpf),
        nome: formFields.nome,
        endereco: formFields.endereco.concat(
          ', ',
          formFields.complemento,
          ', ',
          formFields.bairro,
          ', ',
          formFields.cidade,
          '/',
          formFields.estado,
          ', ',
          this.formatCep(formFields.cep)
        ),
        telefones,
        email: formFields.email,
        senha: '123456',
      };

      try {
        this.usuariosService.createUsuario(usuario).subscribe(() => {
          this.openConfirmationDialog();
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
}
