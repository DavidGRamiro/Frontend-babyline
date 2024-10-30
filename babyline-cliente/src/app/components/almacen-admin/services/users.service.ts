import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject(HttpClient);
  private _url = 'http://localhost:8000/usuarios/';
  constructor() { }

  // Obtener todos los usuarios
  getUsers() {
    return this._http.get(this._url);
  }

  // Alta de un usuario
  altaUsuario(usuario: any) {
    return this._http.post(this._url, usuario);
  }

}
