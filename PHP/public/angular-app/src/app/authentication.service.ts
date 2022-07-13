import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #isLoggedIn: boolean = false
  get isLoggedIn() { return this.#isLoggedIn }
  set isLoggedIn(isLoggedIn: boolean) { this.#isLoggedIn = isLoggedIn }

  // set token(token){localStorage.setItem("token", token)}
  // get token(){localStorage.getItem("token") as string;}
  // get name(){}
  // _baseUrl: string = "http://localhost:4141/api";

  // isLoggedIn():boolean {
  //   return (localStorage.getItem("token")!=null);
  // }

  getLoggedInUser(): string {
    let username = localStorage.getItem("username");
    return username || "";
  }

  constructor(private _http: HttpClient, private _router: Router, private _jwtService: JwtHelperService) { }

  _login(token: string) {
    const name = this._jwtService.decodeToken(token).name as string;
    localStorage.setItem('username', name);
    localStorage.setItem('token', token);
    setTimeout(() => {
      this._router.navigate(["/profile"]);
    }, 1000);
  }

  logout() {
    localStorage.clear();
    this._router.navigate(["/login"]);
  }


}
