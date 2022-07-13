import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HikingsDataService } from '../hikings.data.service.service';

export class User {
  #_id!: string
  #firstname!: string
  #lastname!: string
  #email!: string
  #addess!: string
  #username!: string
  #password!: string
  #confirmpassword!: string
  get _id() { return this.#_id }
  get firstname() { return this.#firstname }
  get lastname() { return this.#lastname }
  get email() { return this.#email }
  get address() { return this.#addess }
  get username() { return this.#username }
  get password() { return this.#password }
  get confirmpassword() { return this.#confirmpassword }
  set firstname(firstname: string) { this.#firstname = firstname }
  set lastname(lastname: string) { this.#lastname = lastname }
  set email(email: string) { this.#email = email }
  set address(address: string) { this.#addess = address }
  set username(username: string) { this.#username = username }
  set password(password: string) { this.#password = password }
  set confirmpassword(confirmPassword: string) { this.#confirmpassword = confirmPassword }
  constructor(firstname: string, lastname: string, email: string, address: string, username: string, password: string, confirmpassword: string) {
    this.#firstname = firstname
    this.#lastname = lastname
    this.#email = email
    this.#addess = address
    this.#username = username
    this.#password = password
    this.#confirmpassword = confirmpassword

  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alert: boolean = false;
  username: string = ''
  user!: User;
  #addForm!: FormGroup;
  get addForm() { return this.#addForm }
  submitted = false;
  constructor(private hikingDataService: HikingsDataService, private _formBuilder: FormBuilder) {
    // this.#addForm = new FormGroup({
    //   name: new FormControl("Jack"),
    //   studentid: new FormControl("jj"),
    //   gpa: new FormControl("123")
    // })
  }

  ngOnInit(): void {
    this.#addForm = this._formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.email],
      address: ["", Validators.required],
      username: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmpassword: ["", Validators.required]
    }, {
      validators: this.mustMatch('password', 'confirmpassword')
    })
  }

  get f() {
    return this.#addForm.controls;
  }

  proceed(): void {
    console.log(this.#addForm.value);

  }

  mustMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPassword.errors && !confirmPassword.errors['MustMatch']) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ MustMatch: true })
      } else {
        confirmPasswordControl.setErrors(null);
      }

    }
  }

  public onSubmit(form: FormGroup): void {
    this.submitted = true
    this.hikingDataService.registerUser(form.value).subscribe()
    this.alert = true
    this.addForm.reset({})
  }

  closeAlert() {
    this.alert = false;
  }
}
