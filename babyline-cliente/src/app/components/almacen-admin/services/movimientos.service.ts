import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(private _http : HttpClient) { }

  private url = 'http://localhost:8000/trazas';

  getMovimientos(){
    return this._http.get(this.url);
  }



}
