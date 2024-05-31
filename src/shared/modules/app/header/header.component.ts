import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { ThemeService } from 'src/shared/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName: string = localStorage.getItem("username")! ? localStorage.getItem("username")! : '';
  darkModeEnabled: boolean = false;
  userImageUrl: string = "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  menuVisible: boolean = false; 
  private subscription: Subscription = new Subscription;
  constructor(private themeService: ThemeService,private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    // Inicializar darkModeEnabled con el valor actual y suscribirse a cambios futuros
    this.subscription = this.themeService.getDarkMode().subscribe(isDark => {
      this.darkModeEnabled = isDark;
    });
  }

  toggleDarkMode(): void {
    // Alternar el estado del modo oscuro
    this.themeService.setDarkMode(!this.darkModeEnabled);
  }
  toggleMenu() {
    this.menuVisible = !this.menuVisible; // Cambia el estado de visibilidad del menú
  }

  logout() {
   this.authService.setAuthStatus(false)
   localStorage.removeItem('token');
   localStorage.removeItem('username');
   this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
}
