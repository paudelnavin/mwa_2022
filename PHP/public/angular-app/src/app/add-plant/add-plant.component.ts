import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  hiking!: Hiking;
  #addPlantForm!: FormGroup;
  get addPlantForm() { return this.#addPlantForm };
  success: boolean = false
  fail: boolean = false
  internalError: string = "Internal Server Error"
  constructor(private router: ActivatedRoute, private _hikingDataService: HikingsDataService, private _formBuilder: FormBuilder, private _router: Router) { }

  hikingId = this.router.snapshot.params["hikingId"];
  ngOnInit(): void {
    this.#addPlantForm = this._formBuilder.group({
      name: "",
      description: "",
      location: new FormGroup({
        lng: new FormControl(''),
        lat: new FormControl('')
      })
    })
  }

  onSubmit(form: FormGroup): void {
    this._hikingDataService.addHikingRoutePlant(this.hikingId, form.value).subscribe(resp => {
      this.success = true
      this.#addPlantForm.reset({})
    },
      (err) => {
        this.fail = true
      }
    );
  }
  get f() {
    return this.#addPlantForm.controls;
  }
  closeAlert() {
    this.success = false;
    this.fail = false;
  }
}
