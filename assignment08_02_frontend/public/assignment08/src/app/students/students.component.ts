import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../student-service.service';

export class Student {
	#_id!: string;
	#name!: string;
	#studentId!: number;
	#gpa!: number;
	get _id() { return this.#_id; }
	get name() { return this.#name; }
	set name(name: string) { this.#name = name; }
	get studentId() { return this.#studentId; }
  get gpa() { return this.#gpa; }
	constructor(id: string, name: string, studentId: number, gpa:number) {
		this.#_id = id;
		this.#name = name;
		this.#studentId = studentId;
    this.#gpa = gpa;
	}
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[]=[];
  constructor(private _studentService: StudentDataService) { }

  ngOnInit(): void {
    this._studentService.getStudents().subscribe(students => {this.students=students;})
  }

}
