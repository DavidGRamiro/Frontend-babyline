import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _hhtpClient : HttpClient) { }

  getProductos(){
    return this._hhtpClient.get('http://localhost:8000/productos/');
  }




}
