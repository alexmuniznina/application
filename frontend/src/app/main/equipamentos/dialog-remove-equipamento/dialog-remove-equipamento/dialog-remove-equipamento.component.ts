import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-equipamento',
  templateUrl: './dialog-remove-equipamento.component.html',
  styleUrls: ['./dialog-remove-equipamento.component.scss'],
})
export class DialogRemoveEquipamentoComponent {
  public equipamento;

  constructor(
    public dialogRef: MatDialogRef<DialogRemoveEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.equipamento = data.equipamento;
  }

  public onCancelClick() {
    this.dialogRef.close();
  }
}
