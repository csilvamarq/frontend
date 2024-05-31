import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Songs } from 'src/shared/interfaces/songs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardSongsService {

  private apiUrl = environment.apiUrl; // Ajusta esto a la URL de tu API

  constructor(private http: HttpClient) { }

  getSongs(filters: string = ''): Observable<Songs[]> {
    return this.http.get<Songs[]>(this.apiUrl + '/songs?' + filters);
  }
  addSong(formData: any): Observable<Songs> {
    return this.http.post<Songs>(this.apiUrl + '/addSong', { ...formData, email: localStorage.getItem('username') });
  }
  updateSong(id: string, formData: any): Observable<Songs> {
    return this.http.put<Songs>(this.apiUrl + '/updateSong/' + id, formData);
  }
  deleteSong(id: string): Observable<Songs> {
    return this.http.delete<Songs>(this.apiUrl + '/deleteSong/' + id);
  }
}