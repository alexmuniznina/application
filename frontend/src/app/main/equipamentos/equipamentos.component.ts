import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Equipamento } from 'src/app/dto/equipamento.dto';
import { Usuario } from 'src/app/dto/usuario.dto';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss'],
})
export class EquipamentosComponent {
  public equipamentos: Equipamento[];
  public hasEquipamento = false;
  private usuarioId: number = 1;

  constructor(
    private router: Router,
    private equipamentosService: EquipamentosService
  ) {}

  ngOnInit() {
    this.getEquipamentos();
  }

  public getEquipamentos() {
    this.equipamentosService
      .getEquipamentosByUserId(this.usuarioId)
      .subscribe((equipamentos) => {
        this.equipamentos = equipamentos;
        this.hasEquipamento = this.equipamentos?.length > 0;
      });
  }

  public apagarEquipamento(equip) {
    const index = this.equipamentos.indexOf(equip);
    this.equipamentosService.apagarEquipamento(equip.id).subscribe();
    this.getEquipamentos();
  }

  public addEquip() {
    const navigationExtras: NavigationExtras = {
      state: {
        usuarioId: this.usuarioId,
      },
    };
    this.router.navigate(['_/adicionar_equipamento'], navigationExtras);
  }
}
