import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7208/api'
  constructor(private http: HttpClient, private router: Router) { }

  login(credential: any) {
    console.log(credential);
    return this.http.post<{ token: string }>(this.apiUrl + '/Login/login', credential)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  salir() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  //Funcion para saber si el usuario esta logueado
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
