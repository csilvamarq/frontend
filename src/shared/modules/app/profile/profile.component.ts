import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment } from 'src/environment';
import { ThemeService } from 'src/shared/services/theme/theme.service';
import { NewSongComponent } from './new-song/new-song.component';
import { Songs } from 'src/shared/interfaces/songs';
import { DashboardSongsService } from 'src/shared/services/dashboardSongs/dashboard-songs.service';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  songs: Songs[] = [];
  editableRow: boolean = false;
  darkModeEnabled: boolean = false;
  @ViewChild(AudioPlayerComponent) audioPlayer!: AudioPlayerComponent;
  private subscription: Subscription = new Subscription();


  constructor(private http: HttpClient, private themeService: ThemeService, public dialog: MatDialog, private songService: DashboardSongsService) { }

  ngOnInit(): void {
    this.subscription = this.themeService.getDarkMode().subscribe(isDark => {
      this.darkModeEnabled = isDark;
    });
    this.songService.getSongs(`email=${localStorage.getItem('username')}`).subscribe(songs => {
      this.songs = songs;
    })
  }

  ngOnDestroy(): void {
    // Desuscribirse de los cambios del modo oscuro para evitar fugas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onIconClick(song?: Songs): void {
    if (song) {
      this.editableRow = true
    }
    const dialogRef = this.dialog.open(NewSongComponent, {
      width: '400px',
      data: { darkModeEnabled: this.darkModeEnabled, song }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Modal closed with success');
        // Aquí puedes actualizar la lista de canciones si es necesario
      }
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,index : number): void {
    this.editableRow = true
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {song: this.songs[index]}
    });
  }
  onAudioElementClick(index: number) {
    if (!this.editableRow) {
      this.audioPlayer.stop(); // Detenemos la canción actual
      this.audioPlayer.show(this.songs,index); // Reproducimos la nueva canción
    }
  }
}
