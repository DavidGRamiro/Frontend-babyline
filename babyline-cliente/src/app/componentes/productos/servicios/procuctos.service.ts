import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor( private _http : HttpClient) { }

  // TODO: Hacer algo comun para obtener la url por inyeccion de servicio
  private url = `http://localhost:8000/productos/`;

  // Obtenemos todos los productos disponibles.
  obtenerProductos(){
    return this._http.get(this.url);
  }

  // Damos de alta un nuevo producto
  altaProducto(producto:any){
    return this._http.post(this.url, producto);
  }

  // Editamos un producto en especifico
  editarProducto( id_producto:number, producto:any){
    
    const url = `${this.url}${id_producto}/`;
    return this._http.put(url, producto);
  }

  // Eliminamos un producto definitivamente.
  eliminarProducto(id:number){
    return this._http.delete(`${this.url}${id}/`);
  }

}
