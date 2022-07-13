import { Component, OnInit } from '@angular/core';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  lat!: Number
  lng!: Number
  constructor(private hikingData: HikingsDataService) { }

  ngOnInit(): void {
    this.onSearch();
  }

  hikings: Hiking[] = []
  onSearch(): void {
    this.hikingData.searchByGeo(this.lng, this.lat).subscribe(hikings => { this.hikings = hikings })
  }

  onClear(): void {
    this.lat = 0
    this.lng = 0
  }

}
