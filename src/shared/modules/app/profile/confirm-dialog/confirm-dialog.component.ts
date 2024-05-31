import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Songs } from 'src/shared/interfaces/songs';
import { DashboardSongsService } from 'src/shared/services/dashboardSongs/dashboard-songs.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  song: Songs | undefined;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private songService: DashboardSongsService) {
    this.song = data.song;
  }

  deleteSong() {
    this.songService.deleteSong(this.song?.id?.toString()!).subscribe({
      next: (res) => {
        // Handle success
        window.location.reload()
        console.log(res);
      },
      error: (error) => {
        // Handle error
        console.error(error);
      }
    })
  }
}
