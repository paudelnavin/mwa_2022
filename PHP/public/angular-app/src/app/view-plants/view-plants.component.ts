import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { HikingsDataService } from '../hikings.data.service.service';
import { RoutePlants } from '../hikings/hikings.component';

@Component({
  selector: 'app-view-plants',
  templateUrl: './view-plants.component.html',
  styleUrls: ['./view-plants.component.css']
})
export class ViewPlantsComponent implements OnInit {

  route_plants: RoutePlants[] = []
  alert: boolean = false
  isLoggedIn:boolean = false
  constructor(private router: ActivatedRoute, private _hikingDataService: HikingsDataService, private _router: Router, private _authService:AuthenticationService) { }

  hikingId = this.router.snapshot.params["hikingId"];
  ngOnInit(): void {
    this._hikingDataService.getHikingRoutePlants(this.hikingId).subscribe((route_plants) => { this.route_plants = route_plants })
    this.isLoggedIn = this._authService.isLoggedIn()
  }

  onDelete(plant: RoutePlants) {
    if (confirm(environment.Confirmation)) {
      this._hikingDataService.deleteHikingRoutePlant(this.hikingId, plant._id).subscribe(() => {
        this.alert = true
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
        setTimeout(() => {
          this.alert = false
        }, 1000);
      })
    }
  }
}
