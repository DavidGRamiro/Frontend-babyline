import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject(HttpClient);
  private _url = 'http://localhost:8000/usuarios/';
  constructor() { }

  // Obtener todos los usuarios
  getUsers():Observable<any> {
    return this._http.get<any[]>(this._url);
  }

  // Alta de un usuario
  altaUsuario(usuario: any) {
    return this._http.post(this._url, usuario);
  }

  // Actualización de un usuario
  updateUsuario(usuario: any) {
    return this._http.put(this._url + usuario.id + '/', usuario);
  }

  deleteUser(id: any) {
    return this._http.delete(this._url + id + '/');
  }

}
