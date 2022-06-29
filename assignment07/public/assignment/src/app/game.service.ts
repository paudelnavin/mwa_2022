import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdrienTrackService {

  private _baseUrl = "https://openwhyd.org"
  constructor(private _http: HttpClient) { }

  public getTracks():Observable<any[]>{
    const url: string = this._baseUrl + "/adrien?format=json"
    return this._http.get<any[]>(url);
  }
}
