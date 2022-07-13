import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HikingsDataService } from '../hikings.data.service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private routeData: HikingsDataService, private _router: Router) { }

  LoginStatus$!: Observable<boolean>;

  ngOnInit(): void {
  }

  onHome(): void {
    this._router.navigate([""])
  }
  onHikings(): void {
    this._router.navigate(["gethikings"])
  }
}
