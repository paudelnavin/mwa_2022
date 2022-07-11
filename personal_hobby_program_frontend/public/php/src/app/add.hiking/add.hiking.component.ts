import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-add.hiking',
  templateUrl: './add.hiking.component.html',
  styleUrls: ['./add.hiking.component.css']
})
export class AddHikingComponent implements OnInit {

  hiking!:Hiking;
  #addForm!:FormGroup;
  get addForm(){return this.#addForm};
  constructor(private _hikingDataService:HikingsDataService, private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.#addForm = this._formBuilder.group({
      name:"",
      endpoint1:"",
      endpoint2:"",
      state:"",
      distance: new FormGroup({
        length: new FormControl(''),
        length_unit:new FormControl(''),
      })
    })
  }
  onSubmit(form:FormGroup):void{
    this._hikingDataService.addHiking(form.value).subscribe(resp=>{
      console.log(resp);
      
    });
  }

}
