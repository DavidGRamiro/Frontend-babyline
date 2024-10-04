import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcuctosService {

  constructor( private _http : HttpClient) { }

  // TODO: Hacer algo comun para obtener la url por inyeccion de servicio
  private url = `http://localhost:8000/productos/`;

  obtenerProductos(){
    return this._http.get(this.url);
  }

}
