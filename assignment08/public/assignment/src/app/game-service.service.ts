import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private _baseUrl = "http://localhost:3000/api"
  constructor(private _http: HttpClient) { }

  public getGames():Observable<Game[]>{
    const url: string = this._baseUrl+"/games";
    return this._http.get<Game[]>(url);
  }

  public getGame(id: string):Observable<Game> {
		const url: string= this._baseUrl + "/games/" + id;
		return this._http.get<Game>(url);
	}

  public deleteGame(id: string):Observable<Game> {
		const url: string= this._baseUrl + "/games/" + id;
		return this._http.delete<Game>(url);
	}
}
