import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HikingsDataService } from '../hikings.data.service.service';
import { Hiking } from '../hikings/hikings.component';

@Component({
  selector: 'app-add.hiking',
  templateUrl: './add.hiking.component.html',
  styleUrls: ['./add.hiking.component.css']
})
export class AddHikingComponent implements OnInit {

  hiking!: Hiking;
  #addForm!: FormGroup;
  get addForm() { return this.#addForm };
  success: boolean = false
  fail: boolean = false
  internalError: string = environment.Internal_Error
  constructor(private _hikingDataService: HikingsDataService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.#addForm = this._formBuilder.group({
      name: ["", Validators.required],
      endpoint1: "",
      endpoint2: "",
      state: "",
      distance: new FormGroup({
        length: new FormControl(''),
        length_unit: new FormControl(''),
      })
    })
  }
  onSubmit(form: FormGroup): void {
    this._hikingDataService.addHiking(form.value).subscribe(resp => {
      this.success = true
      this.addForm.reset({})
    },
      (err) => {
        this.fail = true
      }
    );
  }
  get f() {
    return this.#addForm.controls;
  }
  closeAlert() {
    this.success = false;
    this.fail = false;
  }

}
