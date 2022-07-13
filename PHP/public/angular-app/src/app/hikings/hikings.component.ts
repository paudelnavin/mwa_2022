import { Component, OnInit } from '@angular/core';
import { HikingsDataService } from '../hikings.data.service.service';

export class Distance {
  #length!: string;
  #length_unit!: string;
  get length() { return this.#length }
  get length_unit() { return this.#length_unit }
  set length(length: string) { this.#length = length }
  set length_unit(length_unit: string) { this.#length_unit = length_unit }
}
export class RoutePlants {
  #_id!: string;
  #name!: string;
  #description!: string;
  #location!: Location
  get _id() { return this.#_id }
  get name() { return this.#name }
  get description() { return this.#description }
  get loation() { return this.#location }
  set name(name: string) { this.#name = name }
  set description(description: string) { this.#description = description }
  set location(location: Location) { this.#location = location }
}
export class Location {
  #coordinates!: [Number, Number]
  #lng!: Number
  #lat!: Number
  get coordinates() { return this.#coordinates }
  set coordinates(coordinates: [Number, Number]) { this.#coordinates = coordinates }
  get lng() { return this.#lng }
  set lng(lng: Number) { this.#lng = lng }
  get lat() { return this.#lat }
  set lat(lat: Number) { this.#lat = lat }
}
export class Hiking {
  #_id!: string;
  #name!: string;
  #endpoint1!: string;
  #endpoint2!: string;
  #distance!: Distance;
  #state!: string;
  #route_plants!: [RoutePlants];
  get _id() { return this.#_id }
  get name() { return this.#name }
  set name(name: string) { this.#name = name }
  get endpoint1() { return this.#endpoint1 }
  set endpoint1(endpoint1: string) { this.#endpoint1 = endpoint1 }
  get endpoint2() { return this.#endpoint2 }
  set endpoint2(endpoint2: string) { this.#endpoint2 = endpoint2 }
  get state() { return this.#state }
  set state(state: string) { this.#state = state }
  get distance() { return this.#distance }
  set distance(distance: Distance) { this.#distance = distance }
  get route_plants() { return this.#route_plants }
  set route_plants(route_plants: [RoutePlants]) { this.#route_plants = route_plants }

  constructor(id: string, name: string, state: string) {
    this.#_id = id;
    this.#name = name;
    this.#state = state;
  }
}

@Component({
  selector: 'app-hikings',
  templateUrl: './hikings.component.html',
  styleUrls: ['./hikings.component.css']
})
export class HikingsComponent implements OnInit {

  hikings: Hiking[] = [];
  collection!: any;
  itemsPerPage: number = 5;
  page: number = 1;
  totalItems!: number;

  constructor(private _hikingDataService: HikingsDataService) { }

  ngOnInit(): void {
    this.getAllData()
  }

  getAllData() {
    this._hikingDataService.getHikings(this.page, this.itemsPerPage).subscribe((hikings) => {
      console.log(hikings);
      this.collection = hikings
      this.totalItems = 15
    })
  }

  getPage(page: number) {
    let offset = (page - 1) * this.itemsPerPage
    this._hikingDataService.getHikings(offset, this.itemsPerPage).subscribe(hikings => {
      this.collection = hikings
    });
  }

  onPrevious():void{

  }
  onNext():void{
    
  }
}
