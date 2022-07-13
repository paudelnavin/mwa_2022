import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings.data.service.service';

export class Credentials {
  #username!: string
  #password!: string
  #token!:string
  get username() { return this.#username }
  set username(username: string) { this.#username = username }
  get password() { return this.#password }
  set password(password: string) { this.#password = password }
  get token() { return this.#token }
  constructor(username: string, password: string) {
    this.#username = username
    this.#password = password
  }

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''
  #loginForm!: FormGroup
  get loginForm() { return this.#loginForm }
  unauthorized: string = ''
  credentials!: Credentials
  constructor(private hikingDataService: HikingsDataService, private _router: Router, private _authService:AuthenticationService) { }

  success: boolean = false
  fail: boolean = false
  isLoggedin: boolean = false
  name!: string
  ngOnInit(): void {
  }

  loginUsers(credential: Credentials): void {
    this.hikingDataService.userLogin(credential).subscribe(
      loginresult => {
          this._authService._login(loginresult.token)
          this.success=true    
      },
      (err) => {
        this.unauthorized = err.error
        this.fail = true
      },
      () => {
        
      }
    );
  }

  closeAlert() {
    this.fail = false;
    this.success = false;
  }
}
