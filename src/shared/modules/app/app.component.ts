import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // Implementa OnInit para usar ngOnInit()
  title = 'Misilify';
  login: boolean = false; // Esta variable almacena el estado de autenticación
  
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe(status => {
      this.login = status;
    });// Obtiene el estado de autenticación
  }
}