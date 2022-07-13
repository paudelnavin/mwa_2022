import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking, RoutePlants } from '../hikings/hikings.component';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit {
  #editForm!: FormGroup
  get editForm() { return this.#editForm };
  alert:boolean=false
  constructor(private _router: ActivatedRoute, private _hikingDataService: HikingsDataService, private _formBuilder: FormBuilder, private router: Router) { }

  hikingId = this._router.snapshot.params["hikingId"];
  plantId = this._router.snapshot.params["plantId"];
  plant!: RoutePlants
  ngOnInit(): void {
    this._hikingDataService.getHikingRoutePlant(this.hikingId, this.plantId).subscribe(plant => {
      this.#editForm = this._formBuilder.group({
        name: plant.name,
        description: plant.description,
        location: new FormGroup({
          lng: new FormControl(plant.location.coordinates[0]),
          lat: new FormControl(plant.location.coordinates[1]),
        })
      })
    });
  }

  onSubmit(form: FormGroup): void {
    this._hikingDataService.editHikingRoutePlant(this.hikingId, this.plantId, form.value).subscribe(() => {
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
