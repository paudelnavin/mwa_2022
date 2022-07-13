import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private router: ActivatedRoute, private _hikingDataService: HikingsDataService, private _router: Router) {
  }

  hikingId = this.router.snapshot.params["hikingId"];
  ngOnInit(): void {
    this._hikingDataService.getHiking(this.hikingId).subscribe(hiking => { this.hiking = hiking });
  }
  onEdit(hiking: Hiking): void {
    this._router.navigate(["gethikings/:hikingId"])
  }

  onDelete(): void {
    if (confirm("Are you sure to delete ")) {
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
