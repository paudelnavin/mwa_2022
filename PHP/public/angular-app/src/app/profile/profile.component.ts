import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = ""
  constructor(private _authService:AuthenticationService) { }

  ngOnInit(): void {
    this.username=this._authService.getLoggedInUser()
  }

}
