import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Empresa } from 'src/app/dto/empresa.dto';
import { Servico } from 'src/app/dto/servico.dto';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { ServicosService } from 'src/app/services/servicos/servicos.service';

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
    private empresasService: EmpresasService,
    private servicosService: ServicosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      filters: [null],
    });
  }

  pesquisar() {
    const { name, filters } = this.form.getRawValue();

    // let servicos = <any>[];
    // let empresas = <any>[];

    // filtrar empresas usando filtro de nome e serviços (backend)
    // TO-DO

    if (filters !== null) {
      this.servicosService
        .getServicosByDescricao(filters)
        .subscribe((response) => {
          this.servicos = <any>response;
        });
    } else {
      this.servicosService.getServicos().subscribe((response) => {
        this.servicos = <any>response;
      });
    }

    if (name !== null) {
      this.empresasService.getEmpresasByName(name).subscribe((response) => {
        this.empresas = <any>response;
      });
    } else {
      this.empresasService.getEmpresas().subscribe((response) => {
        this.empresas = <any>response;
      });
    }
  }
}
