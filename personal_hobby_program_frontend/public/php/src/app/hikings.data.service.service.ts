import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hiking, RoutePlants } from './hikings/hikings.component';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class HikingsDataService {

  private value = false
  private baseUrl = "http://localhost:3000/api"
  constructor(private _http: HttpClient) { }

  public getHikings(offset: number, count: number): Observable<Hiking[]> {
    const url: string = this.baseUrl + "/hikings?offset=" + offset + "&count=" + count;
    return this._http.get<Hiking[]>(url);
  }

  public getHiking(hikingId: string): Observable<Hiking> {
    const url: string = this.baseUrl + "/hikings/" + hikingId;
    return this._http.get<Hiking>(url);
  }

  public addHiking(hiking: Hiking): Observable<Hiking> {
    const url: string = this.baseUrl + "/hikings/";
    return this._http.post<Hiking>(url, hiking);
  }
  public editHiking(hikingId: string, hiking: Hiking): Observable<Hiking> {
    const url: string = this.baseUrl + "/hikings/" + hikingId;
    return this._http.put<Hiking>(url, hiking);
  }
  public registerUser(user: User): Observable<User> {
    const url: string = this.baseUrl + "/users/register";
    return this._http.post<User>(url, user);
  }
  public searchByGeo(lng: Number, lat: Number): Observable<Hiking[]> {
    const url = this.baseUrl + "/hikings?lng=" + lng + "&lat=" + lat
    return this._http.get<Hiking[]>(url)
  }
  public deleteHikingData(hikingId: string): Observable<Hiking> {
    const url = this.baseUrl + "/hikings/" + hikingId
    return this._http.delete<Hiking>(url)
  }
  public addHikingRoutePlant(hikingId: string, hiking: Hiking): Observable<Hiking> {
    const url: string = this.baseUrl + "/hikings/" + hikingId + "/routeplants";
    return this._http.post<Hiking>(url, hiking);
  }
  public editHikingRoutePlant(hikingId: string, plantId: string, plant: RoutePlants): Observable<Hiking> {
    const url: string = this.baseUrl + "/hikings/" + hikingId + "/routeplants/" + plantId;
    return this._http.patch<Hiking>(url, plant);
  }
  public deleteHikingRoutePlant(hikingId: string, plantId: string): Observable<Hiking> {
    const url: string = this.baseUrl + "/hikings/" + hikingId + "/routeplants/" + plantId;
    return this._http.delete<Hiking>(url);
  }
  public getHikingRoutePlants(hikingId: string): Observable<RoutePlants[]> {
    const url: string = this.baseUrl + "/hikings/" + hikingId + "/routeplants";
    return this._http.get<RoutePlants[]>(url);
  }
  public getHikingRoutePlant(hikingId: string, plantId: string): Observable<RoutePlants> {
    const url: string = this.baseUrl + "/hikings/" + hikingId + "/routeplants/" + plantId;
    return this._http.get<RoutePlants>(url);
  }
  public userLogin(user: User) {
    const url: string = this.baseUrl + "/users/login";
    return this._http.post<User>(url, user).pipe(map(result => {
      if (result) {
        this.value = true
      }
      return result;
    }));
  }
}
