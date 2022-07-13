import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HikingsDataService } from '../hikings.data.service.service';
import { User } from '../register/register.component';

export class Login {
  #username!: string
  #password!: string
  get username() { return this.#username }
  set username(username: string) { this.#username = username }
  get password() { return this.#password }
  set password(password: string) { this.#password = password }
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
  unauthorized: string = ''
  user!: User
  constructor(private hikingDataService: HikingsDataService, private _router: Router) { }

  success: boolean = false
  fail: boolean = false
  ngOnInit(): void {
  }

  loginUsers(user: User): void {
    console.log(user);

    this.hikingDataService.userLogin(user).subscribe((user) => {
      this.user = user
      this.success = true
      setTimeout(() => {
        this._router.navigate([""]);
      }, 1000);
    },
      (err) => {
        this.unauthorized = err.error
        this.fail = true
      });
  }

  closeAlert() {
    this.fail = false;
    this.success = false;
  }
}
