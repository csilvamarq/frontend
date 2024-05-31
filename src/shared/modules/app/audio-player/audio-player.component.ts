import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Songs } from 'src/shared/interfaces/songs';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() audioSrc: string | null = null;
  @Input() songProps: Songs | null = null
  songList:Songs[] | any[] = []
  songIndex: number = 0
  @ViewChild('audio') audio: ElementRef<HTMLAudioElement> | undefined;
  isVisible: boolean = false;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  volume: number = 1;
  duration: number = 0;
  currentTime: number = 0;

  ngAfterViewInit(): void {
    if (this.audio) {
      // El elemento de audio está disponible, puedes acceder a él de forma segura
      this.audio.nativeElement.addEventListener('timeupdate', (event) => this.updateTime(event));
      this.audio.nativeElement.addEventListener('loadedmetadata', (event) => this.loadMetadata(event));
    }
  }
  show(song: Songs[], index: number) {
    this.stop(); // Detenemos cualquier reproducción actual
    this.audioSrc = song[index].archivo_mp3;
    this.songProps = song[index];
    this.songList = song
    this.songIndex = index;
    this.isVisible = true;
    setTimeout(() => {
      if (this.audio && this.audio.nativeElement) {
        this.audio.nativeElement.src = this.audioSrc!; // Actualizamos el src del elemento de audio
        this.audio.nativeElement.load(); // Cargamos la nueva fuente
        this.audio.nativeElement.play(); // Reproducimos la nueva canción
        this.isPlaying = true;
      }
    }, 0);
  }
  hide() {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.pause();
    }
    this.isVisible = false;
    this.audioSrc = null;
  }
  togglePlayPause() {
    if (this.audio && this.audio.nativeElement) {
      if (this.isPlaying) {
        this.audio.nativeElement.pause();
      } else {
        this.audio.nativeElement.play();
      }
    }
    this.isPlaying = !this.isPlaying;
  }
  updateTime(event: Event) {
    if (this.audio && this.audio.nativeElement) {
      this.currentTime = this.audio.nativeElement.currentTime;
    }
  }
  play() {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.play();
    }
  }
  pause() {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.pause();
    }
  }
  stop() {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.pause();
      this.audio.nativeElement.currentTime = 0; // Reiniciamos el tiempo de reproducción
      this.isPlaying = false;
    }
  }
  // Eventos
  loadAudio(event: Event) {
    if (this.audio && this.audio.nativeElement) {
      this.duration = this.audio.nativeElement.duration;
    }
  }
  loadMetadata(event: Event) {
    if (this.audio && this.audio.nativeElement) {
      this.duration = this.audio.nativeElement.duration;
    }
  }

  seekAudio(event: Event) {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.currentTime = (event.target as HTMLInputElement).valueAsNumber;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.muted = this.isMuted;
    }
  }

  setVolume(event: Event) {
    this.volume = (event.target as HTMLInputElement).valueAsNumber;
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.volume = this.volume;
    }
  }
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  tenSecondsMore() {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.currentTime =
        this.audio.nativeElement.currentTime + 10;
    }
  }
  tenSecondsLess() {
    if (this.audio && this.audio.nativeElement) {
      this.audio.nativeElement.currentTime =
        this.audio.nativeElement.currentTime - 10;
    }
  }
  previousSong() {
    if (this.audio && this.audio.nativeElement) {
      this.stop()
      this.show(this.songList,this.songIndex-1)
    }
  }
  nextSong() {
    console.log(5)
    if (this.audio && this.audio.nativeElement) {
      this.stop()
      this.show(this.songList,this.songIndex+1)
    }
  }
}
