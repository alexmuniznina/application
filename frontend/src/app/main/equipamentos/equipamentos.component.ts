import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Equipamento } from 'src/app/dto/equipamento.dto';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { DialogRemoveEquipamentoComponent } from './dialog-remove-equipamento/dialog-remove-equipamento/dialog-remove-equipamento.component';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss'],
})
export class EquipamentosComponent {
  public equipamentos: Equipamento[];
  public hasEquipamento = false;
  private usuarioId: number = Number(localStorage.getItem('usuarioId'));

  constructor(
    private router: Router,
    private equipamentosService: EquipamentosService,
    private dialog: MatDialog
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

  public openRemoverEquipConfirmacao(equip) {
    const dialogRef = this.dialog.open(DialogRemoveEquipamentoComponent, {
      data: { equipamento: equip },
      minHeight: '30vh',
      maxHeight: '30vh',
      minWidth: '55vw',
      maxWidth: '55vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.equipamentos.indexOf(equip);
        this.equipamentosService.apagarEquipamento(equip.id).subscribe();
      }
      this.getEquipamentos();
    });
  }

  public apagarEquipamento(equip) {
    this.openRemoverEquipConfirmacao(equip);
  }

  public addEquip() {
    this.router.navigate(['_/adicionar_equipamento']);
  }
}
