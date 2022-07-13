import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #isLoggedIn: boolean = false

  _baseUrl: string = environment.Base_URL;

  isLoggedIn():boolean {
    return (localStorage.getItem("token")!=null);
  }

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
