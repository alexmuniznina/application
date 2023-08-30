import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
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
  usuarioId = 4;
  empresas = <any>[];
  chamados;
  chamados$!: Observable<Chamado>; // talvez não precise disso
  private searchText$ = new Subject<string>(); // talvez não precise disso

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private empresasService: EmpresasService,
    private chamadosService: ChamadosService
  ) {}

  search(empresaNome: string) {
    // talvez não precise disso
    this.searchText$.next(empresaNome);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nomeEmpresa: null,
      filtros: [null],
    });

    // this.empresasService.getEmpresas().subscribe((empresas) => {
    //   this.empresas = empresas;
    // });

    this.chamadosService
      .getChamadosByUsuario(this.usuarioId)
      .subscribe((chamados) => {
        this.chamados = chamados;
        chamados.map((chamado) => this.empresas.push(chamado.empresa));
        // console.log(this.empresas);
      });

    // this.empresa$ = this.searchText$.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap((empresaNome) =>
    //     this.empresas.filter(emp => emp.nomeFantasia.includes(empresaNome))
    //   )
    // );
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
