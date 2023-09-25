import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_TYPE } from 'src/app/shared/constants';

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.scss'],
})
export class DialogConfirmacaoComponent {
  public empresa;
  public equipamento;
  public dialogType = DIALOG_TYPE;
  public id;
  public type;
  public title;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.id = data.id ? data.id : undefined;
    this.title = data.title;
    this.type = data.type;
    this.equipamento = data.equipamento ? data.equipamento : undefined;
    this.empresa = data.empresa ? data.empresa : undefined;
  }

  public onCancelClick() {
    this.dialogRef.close();
  }
}
