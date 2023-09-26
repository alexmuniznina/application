import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipamentoChamado } from '../../../dto/equipamento-chamado.dto';

@Component({
  selector: 'app-dialog-equipamento',
  templateUrl: './dialog-equipamento.component.html',
  styleUrls: ['./dialog-equipamento.component.scss'],
})
export class DialogEquipamentoComponent {
  equipChamado: EquipamentoChamado[];
  form: FormGroup;
  checked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EquipamentoChamado[],
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      equipamentos: new FormArray([]),
    });

    this.equipChamado = data.map((item) => item);

    this.addOptionsToForm();
  }

  get equipamentosFormArray() {
    return this.form.controls['equipamentos'] as FormArray;
  }

  private addOptionsToForm() {
    this.data.forEach(() =>
      this.equipamentosFormArray.push(new FormControl(false))
    );
  }

  public getValue(event) {
    const { checked } = event;
    const { name } = event.source;

    for (let option of this.equipChamado) {
      if (name === option.name) {
        const index = this.equipChamado.indexOf(option);
        this.equipChamado[index].added = checked;
      }
    }
  }

  public onCancelClick() {
    this.dialogRef.close();
  }
}
