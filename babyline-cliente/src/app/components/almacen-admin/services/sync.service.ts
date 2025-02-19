import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private _http : HttpClient) { }

  private url = 'http://localhost:8000/sync/';

  sincronizar(){
    return this._http.post(this.url, null)
  }

}
