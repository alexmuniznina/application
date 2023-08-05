import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Empresa } from 'src/app/dto/empresa.dto';

@Component({
  selector: 'app-card-empresa',
  templateUrl: './card-empresa.component.html',
  styleUrls: ['./card-empresa.component.scss'],
})
export class CardEmpresaComponent {
  @Input() empresa: Empresa;

  constructor(private _router: Router) {}

  abrirChamado(empresa: Empresa) {
    const navigationExtras: NavigationExtras = {
      state: {
        empresa: empresa,
      },
    };
    this._router.navigate(['_/empresa_info'], navigationExtras);
  }
}
