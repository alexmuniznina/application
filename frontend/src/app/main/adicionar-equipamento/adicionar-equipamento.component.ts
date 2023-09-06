import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { EquipamentosService } from 'src/app/services/equipamentos/equipamentos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { FABRICANTE, BTU, COMODO, VOLT } from 'src/app/shared/constants';

@Component({
  selector: 'app-adicionar-equipamento',
  templateUrl: './adicionar-equipamento.component.html',
  styleUrls: ['./adicionar-equipamento.component.scss'],
})
export class AdicionarEquipamentoComponent {
  // public equipamentos;
  public form: FormGroup;
  private navigation;
  private usuarioId: number;
  private checked = false;
  private endereco = '';
  public fabricantes = Object.values(FABRICANTE);
  public btus = Object.keys(BTU);
  public comodos = Object.values(COMODO);
  public volts = Object.values(VOLT);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private equipamentoService: EquipamentosService,
    private usuarioService: UsuariosService
  ) {
    this.navigation = this.router.getCurrentNavigation();
    const { usuarioId } = this.navigation?.extras?.state;
    this.usuarioId = usuarioId;
  }

  ngOnInit() {
    this.form = new FormGroup({
      marca: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      btu: new FormControl({ value: '', disabled: false }, Validators.required),
      comodo: new FormControl({ value: '', disabled: false }),
      volt: new FormControl({ value: '', disabled: false }),
      endereco: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      numeroSerie: new FormControl({ value: '', disabled: false }),
    });

    this.usuarioService.getUsuarioById(this.usuarioId).subscribe((usuario) => {
      this.form.controls['endereco'].setValue(usuario.endereco);
      this.endereco = usuario.endereco;
    });
  }

  public goBack() {
    this.router.navigate(['_/equipamentos']);
  }

  public limpar() {
    document.getElementById('checkMesmoEnd');
    this.form.reset();
  }

  private getDescricao(fields) {
    return fields.marca
      .concat(' ')
      .concat(fields.btu)
      .concat(' BTU')
      .concat(fields.volt ? ` ${fields.volt} V` : '');
  }

  public toggleCheckbox(checked) {
    const enderecoControl = this.form.controls['endereco'];
    if (checked) {
      enderecoControl.enable();
      this.form.controls['endereco'].setValue(this.endereco);
    } else {
      enderecoControl.reset();
      enderecoControl.disable();
    }
  }

  public salvar() {
    const fields = this.form.getRawValue();

    const payload = {
      id: faker.number.int({ min: 5276354, max: 9276354 }),
      usuarioId: this.usuarioId,
      descricao: this.getDescricao(fields),
      num_serie: fields.numeroSerie,
      btu: fields.btu,
      volt: fields.volt,
      marca: fields.marca,
    };

    this.equipamentoService.criarEquipamento(payload).subscribe((equip) => {
      this.goBack();
    });
  }
}
