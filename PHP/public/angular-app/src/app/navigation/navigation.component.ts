import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings.data.service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn:boolean= false
  constructor(private routeData: HikingsDataService, private _router: Router, private _authService:AuthenticationService) { }

  LoginStatus$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn()
  }

  onHome(): void {
    this._router.navigate([""])
  }
  onHikings(): void {
    this._router.navigate(["gethikings"])
  }
  onLogout():void{
    this._authService.logout()
  }
}
