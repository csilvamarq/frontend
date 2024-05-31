import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loginStatus = new BehaviorSubject<boolean>(localStorage.getItem("token") ? true :false);
  public loginStatus$ = this.loginStatus.asObservable();
  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.setAuthStatus(true);
        }
      })
    );
  }
  // Obtener el estado de autenticación
  getAuthStatus(): boolean {
    return this.loginStatus.getValue();
  }


  // Establecer el estado de autenticación
  setAuthStatus(status: boolean): void {
    this.loginStatus.next(status);
  }
}