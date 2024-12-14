import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private _http : HttpClient) { }

  private _url = 'http://localhost:8000/pedidos'

  // Obtenemos los pedidos que tenemos en el momento.
  getPedidos( params : {}){
    return this._http.get(this._url, { params })
  }

  // Actualizamos el estado de un pedido
  updatePedido(idPedido:number, data:any){
    const url = `${this._url}/${idPedido}/`
    return this._http.put(url, data)
  }

  // Creamos un nuevo pedido
  createPedido( pedido: any){
    const url = `${this._url}/`
    return this._http.post(url, pedido)
  }

}
