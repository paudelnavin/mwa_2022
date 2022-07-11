import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-edithiking',
  templateUrl: './edit.hiking.component.html',
  styleUrls: ['./edit.hiking.component.css']
})
export class EditHikingComponent implements OnInit {

  #editForm!:FormGroup
  get editForm(){return this.#editForm};
  constructor(private _router:ActivatedRoute, private _hikingDataService:HikingsDataService, private _formBuilder:FormBuilder, private router:Router) { }

  hikingId = this._router.snapshot.params["routeId"];
  hiking!:Hiking
  ngOnInit(): void {
    this._hikingDataService.getHiking(this.hikingId).subscribe(hiking => {
      this.#editForm = this._formBuilder.group({
        name:hiking.name,
        endpoint1:hiking.endpoint1,
        endpoint2:hiking.endpoint2,
        state:hiking.state,
        distance: new FormGroup({
          length: new FormControl(hiking.distance.length),
          length_unit:new FormControl(hiking.distance.length_unit),
        })
      })
      console.log(hiking.name);
      
    });
  }

  onSubmit(form:FormGroup):void{    
  }
}
