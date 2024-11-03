import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient) { }

  public url = 'http://localhost:8000/login';


  login(data: any){
    return this._http.post(this.url, data);
  }

}
