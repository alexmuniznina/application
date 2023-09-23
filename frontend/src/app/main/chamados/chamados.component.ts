import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  // debounceTime,
  // distinctUntilChanged,
  // switchMap,
} from 'rxjs';
import { Chamado } from 'src/app/dto/chamado.dto';
import { Empresa } from 'src/app/dto/empresa.dto';
import { Usuario } from 'src/app/dto/usuario.dto';
import { ChamadosService } from 'src/app/services/chamados/chamados.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.scss'],
})
export class ChamadosComponent {
  form: FormGroup;
  usuarioId: number = Number(localStorage.getItem('usuarioId'));
  empresas: Empresa[];
  chamados: Chamado[];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private empresasService: EmpresasService,
    private chamadosService: ChamadosService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      nomeEmpresa: null,
    });

    this.chamadosService
      .getChamadosByUsuario(this.usuarioId)
      .subscribe((chamados) => {
        this.chamados = chamados;
      });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  pesquisar() {
    const text = this.form.get('nomeEmpresa')?.value;

    this.chamadosService
      .getChamadosByEmpresaNome(this.usuarioId, text)
      .subscribe((chamados) => {
        this.chamados = chamados;
      });
  }
}
