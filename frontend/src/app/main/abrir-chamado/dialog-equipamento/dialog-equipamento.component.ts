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
  equipChamado: EquipamentoChamado;
  form: FormGroup;
  checked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EquipamentoChamado,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      equipamentos: new FormArray([]),
    });

    this.equipChamado = [...data];

    this._addOptionsToForm();
  }

  // private _setData(data: EquipamentoChamado) {
  //   data.map((equip, index) => {
  //     this.equipChamado[index][0] = equip[0].valueOf();
  //     this.equipChamado[index][1] = equip[1].valueOf();
  //   });
  // }

  get equipamentosFormArray() {
    return this.form.controls['equipamentos'] as FormArray;
  }

  private _addOptionsToForm() {
    this.data.forEach(() =>
      this.equipamentosFormArray.push(new FormControl(false))
    );
  }

  getValue(event) {
    const { checked } = event;
    const { name } = event.source;

    for (let option of this.equipChamado) {
      if (name === option[0]) {
        const index = this.equipChamado.indexOf(option);
        this.equipChamado[index][1] = checked;
      }
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
