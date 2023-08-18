import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.scss'],
})
export class DialogConfirmacaoComponent {
  empresa;
  id;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.id = data.id;
    this.empresa = data.empresa;
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
