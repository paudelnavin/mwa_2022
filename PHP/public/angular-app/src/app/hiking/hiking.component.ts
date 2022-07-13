import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-hiking',
  templateUrl: './hiking.component.html',
  styleUrls: ['./hiking.component.css']
})
export class HikingComponent implements OnInit {

  alert: boolean = false;
  hiking!: Hiking;
  isLoggedIn:boolean = false
  constructor(private router: ActivatedRoute, private _hikingDataService: HikingsDataService, private _router: Router, private _authService:AuthenticationService) {
  }

  hikingId = this.router.snapshot.params["hikingId"];
  ngOnInit(): void {
    this._hikingDataService.getHiking(this.hikingId).subscribe(hiking => { this.hiking = hiking });
    this.isLoggedIn = this._authService.isLoggedIn()
  }
  onEdit(hiking: Hiking): void {
    this._router.navigate(["gethikings/:hikingId"])
  }

  onDelete(): void {
    if (confirm(environment.Confirmation)) {
      this._hikingDataService.deleteHikingData(this.hikingId).subscribe(() => {
        this.alert = true
        setTimeout(() => {
          this._router.navigate(["gethikings"])
        }, 1000);
        setTimeout(() => {
          this.alert = false
        }, 1000);
      })
    }
  }
}
