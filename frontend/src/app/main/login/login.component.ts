import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/header/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ToolbarService } from 'src/app/services/toolbar/toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toolbarService: ToolbarService,
    private AuthService: AuthService
  ) {
    localStorage.clear();
    this.toolbarService.setEnabled(false);
  }

  public visible: boolean = false;
  public isFormValid: boolean = false;
  public loginFailed: boolean = false;
  public form = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });

    const node = document.getElementsByName('passwordInput')[0];
    node.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') {
        this.login();
      }
    });
  }

  public registrar(event) {
    if (event.pointerType === 'mouse' || event.pointerType === 'touch') {
      localStorage.setItem('isCreating', 'true');
      this.router.navigate(['_/registrar']);
    }
  }

  public login() {
    if (this.form.valid) {
      const fields = this.form.getRawValue();
      this.loginService.getUserInfo(fields.email).subscribe((usuario) => {
        const user = usuario;
        if (user?.senha === fields.senha) {
          localStorage.setItem('usuarioId', user.id.toString());
          this.AuthService.setAuthState(true);
          this.toolbarService.setEnabled(true);
          this.router.navigate(['_/home']);
        } else {
          this.loginFailed = true;
        }
      });
    }
  }
}
