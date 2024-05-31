import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router'; // Importar Router
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router
  ) { }

  login(): void {
    this.authService.setAuthStatus(false)
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.login({ email: this.username, password: this.password }).subscribe(
      response => {
        localStorage.setItem("username", this.username);
        // Navegar a la página deseada después del login
        this.router.navigate(['/dashboard']);
      },
      error => {
        // Manejar el error de login
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
  ngOnInit(): void {
    this.authService.loginStatus$.subscribe(status => {
      if (status) {
        this.router.navigate(['/dashboard']);
      }
    })
  }
}