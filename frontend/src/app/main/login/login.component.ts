import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  public visible: boolean = false;
  public isFormValid: boolean = false;
  public loginFailed: boolean = false;
  public form = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  private ngOnInit() {
    const node = document.getElementsByName('passwordInput')[0];
    node.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') this.login();
    });

    this.form.valueChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });
  }

  public login() {
    if (this.form.valid) {
      const fields = this.form.getRawValue();
      this.usuarioService
        .getUsuarioByEmail(fields.email)
        .subscribe((usuario) => {
          const user = usuario[0]; // to-do: precisa trocar a forma como o get retorna
          if (user.senha === fields.senha) {
            console.log('Usuario logado');
            localStorage.setItem('usuarioId', user.id);
            this.router.navigate(['_/home']);
          } else {
            this.loginFailed = true;
          }
        });
    }
  }
}
