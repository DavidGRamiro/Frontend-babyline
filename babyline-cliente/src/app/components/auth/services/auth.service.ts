import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  public url = 'http://localhost:8000/usuarios/';
  private _token: string = '';

  // Procesa la respuesta de login del usuario
  login(data: any){
    return this._http.post(`${this.url}login/`, data);
  }
  
  // Función que nos indica si tenemos el token almacenado en el localStorage
  isAuthenticated(){
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout( data = null){
    return this._http.post(`${this.url}logout/`, data);
  }

}
