import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './students/students.component';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  private _baseurl = "http://localhost:3000/api"
  constructor(private _http:HttpClient) { 
  }

  public getStudents():Observable<Student[]>{
    const url: string = this._baseurl+"/students";
    return this._http.get<Student[]>(url);
  }

  public getStudent(id:string):Observable<Student>{
    const url: string = this._baseurl+"/students/" +id;
    return this._http.get<Student>(url);
  }
}
