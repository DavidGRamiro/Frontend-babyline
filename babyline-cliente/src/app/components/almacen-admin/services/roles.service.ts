import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _http : HttpClient) { }

  private url = 'http://localhost:8000/roles';

  getRoles(){
    return this._http.get(this.url);
  }

}
