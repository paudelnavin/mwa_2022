import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDataService } from '../student-service.service';
import { Student } from '../students/students.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student!: Student;
  constructor(private route: ActivatedRoute, private gameService: StudentDataService, private _router:Router) {
    this.student = new Student("","", 0, 0);
   }

  studentId = this.route.snapshot.params["studentId"];
  ngOnInit(): void {
    this.gameService.getStudent(this.studentId).subscribe(student => {this.student = student;});
  }

}
