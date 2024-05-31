import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardSongsService } from 'src/shared/services/dashboardSongs/dashboard-songs.service';
import { Songs } from 'src/shared/interfaces/songs';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  cancionForm: FormGroup;
  selectedFile: File | null = null;
  song: Songs | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewSongComponent>,
    private fb: FormBuilder,
    private songService: DashboardSongsService
  ) {
    this.song = data.song;
    this.cancionForm = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      duracion: [{ value: '', disabled: true }, Validators.required],
      fecha_lanzamiento: ['', Validators.required],
      genero: ['', Validators.required],
      portada: [null, Validators.required],
      archivo_mp3: [null, Validators.required]
    });
    if (this.song) {
      this.cancionForm.patchValue({
        nombre: this.song.nombre,
        autor: this.song.autor,
        duracion: this.song.duracion,
        fecha_lanzamiento: this.song.fecha_lanzamiento,
        genero: this.song.genero,
        portada: this.song.portada,
        archivo_mp3: this.song.archivo_mp3
      });
    }
  }

  ngOnInit() {
    this.cancionForm.valueChanges.subscribe(form => {
      console.log('Valores del formulario actualizados:', form);
    });
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cancionForm.patchValue({
        portada: file
      });
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const audio = new Audio(URL.createObjectURL(file));
      audio.addEventListener('loadedmetadata', () => {
        const duration = Math.round(audio.duration);
        this.cancionForm.get('duracion')?.setValue(duration);
        this.cancionForm.get('duracion')?.enable();
      });

      // Añadir el archivo al formulario
      this.cancionForm.patchValue({
        archivo_mp3: file
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.cancionForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} es requerido.`;
      }
    }
    return '';
  }
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  async onSubmit() {
    if (this.cancionForm.valid) {
      const formDataJson: { [key: string]: any } = {};

      for (const key of Object.keys(this.cancionForm.controls)) {
        const controlValue = this.cancionForm.get(key)?.value;
        if (controlValue instanceof File) {
          formDataJson[key] = await this.fileToBase64(controlValue);
        } else {
          formDataJson[key] = controlValue;
        }
      }
      if (this.data.song)  {
        this.songService.updateSong(this.data.song.id,formDataJson).subscribe(response => {
          console.log('Canción actualizada:', response);
          window.location.reload();
        })
      } 
      else {
        this.songService.addSong(formDataJson).subscribe(response => {
          console.log('Canción agregada:', response);
          this.dialogRef.close();
          window.location.reload();
        });
      }
    }
  }

  onCancel() {
    console.log('Formulario cancelado');
    this.dialogRef.close();
    window.location.reload()
  }
}