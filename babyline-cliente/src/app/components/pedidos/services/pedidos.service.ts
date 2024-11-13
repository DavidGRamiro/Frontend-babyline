import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private _http : HttpClient) { }

  private _url = 'http://localhost:8000/pedidos'

  getPedidos( params : {}){
    return this._http.get(this._url, { params })
  }

  updatePedido(idPedido:number, data:any){
    const url = `${this._url}/${idPedido}/`
    return this._http.put(url, data)
  }

}
