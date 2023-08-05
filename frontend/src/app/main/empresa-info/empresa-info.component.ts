import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresa-info',
  templateUrl: './empresa-info.component.html',
  styleUrls: ['./empresa-info.component.scss'],
})
export class EmpresaInfoComponent implements OnInit {
  empresa;
  navigation;
  servicos = ['Limpeza', 'Conserto', 'Instalação', 'Elétrica'];
  endereco =
    'Av. Coronel Teixeira 6225, London T8-1234, Ponta Negra, Manaus - Amazonas, 69032-654';
  telefones = [
    '(11) 3214-5689',
    '(92) 98456-3216',
    '(11) 3214-5698',
    '(11) 94561-1236',
  ];
  emails = ['email@gmail.com', 'suporte@hotmail.com'];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.navigation = this._router.getCurrentNavigation();
    const { empresa } = this.navigation?.extras.state;
    this.empresa = empresa;
  }

  ngOnInit() {
    console.log(this.empresa);
  }

  goBack() {
    this._router.navigate(['_/home']);
  }
}
