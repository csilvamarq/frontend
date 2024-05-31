import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Songs } from 'src/shared/interfaces/songs';
import { DashboardSongsService } from 'src/shared/services/dashboardSongs/dashboard-songs.service';
import { ThemeService } from 'src/shared/services/theme/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  darkModeEnabled: boolean = false;
  private subscription: Subscription = new Subscription;
  songs: Songs[] = [];
  liked: boolean = false;
  userName: string = '';
  constructor(private themeService: ThemeService, private songsService: DashboardSongsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Inicializar darkModeEnabled con el valor actual y suscribirse a cambios futuros
    this.subscription = this.themeService.getDarkMode().subscribe(isDark => {
      this.darkModeEnabled = isDark;
    });
    this.songsService.getSongs().subscribe({
      next: (data) => {
        this.songs = data;
      },
      error: (error: Error) => {
        console.error('There was an error!', error);
      }
    });
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('username') || '';
    });
  }

  toggleDarkMode(): void {
    // Alternar el estado del modo oscuro
    this.themeService.setDarkMode(!this.darkModeEnabled);
  }
  toggleLike(index: number) {
    this.liked = !this.liked

      const customSong = [...this.songs]
      if (this.liked) {
      customSong[index].likes = customSong[index].likes + 1;
      }
      else{
        customSong[index].likes = customSong[index].likes -1;
      }
      this.songs = customSong
  }
  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
}
