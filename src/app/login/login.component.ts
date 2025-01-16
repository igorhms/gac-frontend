import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  // Método de login
  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        const token = res.access_token;
        // this.loginService.saveToken(token); // Armazena o token no localStorage
        console.log('Login bem-sucedido!', token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loginError = 'Credenciais inválidas. Tente novamente.'; // Exibe mensagem de erro
        console.error('Erro de login:', error);
      },
    });
  }
}
