import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  constructor(private _http : HttpClient) { }

  private url = 'http://localhost:8000/error-log';

  getErrors(){
    return this._http.get(this.url)
  }

  createError(body : {}){
    let url = this.url + '/'
    return this._http.post(url, body)
  }



}
