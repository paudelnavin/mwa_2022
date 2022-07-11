import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Hiking } from './hikings/hikings.component';
import { Login } from './login/login.component';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class HikingsDataService {

  private value = false
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private baseUrl = "http://localhost:3000/api"
  constructor(private _http:HttpClient) { }

  public getHikings(offset:number, count:number):Observable<Hiking[]>{
    const url: string = this.baseUrl + "/hikings?offset="+offset+"&count="+count;
    return this._http.get<Hiking[]>(url);
  }

  public getHiking(hikingId: string):Observable<Hiking>{
    const url : string = this.baseUrl + "/hikings/" + hikingId;
    return this._http.get<Hiking>(url);
  }

  public addHiking(hiking: Hiking):Observable<Hiking>{
    const url : string = this.baseUrl + "/hikings/";
    return this._http.post<Hiking>(url, hiking);
  }
  public registerUser(user: User):Observable<User>{
    const url : string = this.baseUrl + "/users/register";
    return this._http.post<User>(url, user);
  }
  public searchByGeo(lng:Number, lat:Number):Observable<Hiking[]>{
    const url = this.baseUrl+"/hikings?lng="+lng+"&lat="+lat
    return this._http.get<Hiking[]>(url)
  }
  public deleteHikingData(hikingId:string):Observable<Hiking>{
    const url = this.baseUrl+"/hikings/"+hikingId
    return this._http.delete<Hiking>(url)
  }
  public userLogin(user:User){
    const url : string = this.baseUrl + "/users/login";
    return this._http.post<User>(url, user).pipe(map(result =>{
      if(result){
        this.value=true
      }
      return result;
    }));
  }
  checkLoginStatus():boolean{
    if(this.value==true){
      return true;
    }
    return false;
  }

  get isLoggesIn() 
  {
    console.log("loginStatus is "+this.loginStatus);
    
      return this.loginStatus.asObservable();
  }
}
