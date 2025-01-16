import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from './login.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, FormsModule, Toast],
  providers: [LoginService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  // Método de login
  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        const token = res.access_token;
        console.log('Login bem-sucedido!', token);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login efetuado com sucesso!',
        });
        this.router.navigate(['/home']);
      },
      error: ({ error }) => {
        this.loginError = 'Credenciais inválidas. Tente novamente.';
        console.error('Erro de login:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
        });
      },
    });
  }
}
