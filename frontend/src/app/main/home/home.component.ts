import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empresa } from 'src/app/dto/empresa.dto';
import { Servico } from 'src/app/dto/servico.dto';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public response;
  public servicos: Servico[];
  public empresas: Empresa[];
  public form: FormGroup;

  constructor(
    private empresaService: EmpresasService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      filters: [null],
    });
  }

  public pesquisar() {
    const { name, filters } = this.form.getRawValue();
    const params = {};

    if (name != null) params['nome'] = name;
    if (filters != null) params['filtros'] = filters;

    this.empresaService.getEmpresasByServicos(params).subscribe((empresas) => {
      this.empresas = <any>empresas;
    });
  }
}
