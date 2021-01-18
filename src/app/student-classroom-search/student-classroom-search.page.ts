import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { classroomSearch, ClassroomService } from '../services/classroom.service';
import { EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-student-classroom-search',
  templateUrl: './student-classroom-search.page.html',
  styleUrls: ['./student-classroom-search.page.scss'],
})
export class StudentClassroomSearchPage implements OnInit {
  @Input() classroomSearchData = {courseName:'', schoolName:''};
  classrooms: classroomSearch[] = [];
  enrollmentData = {status:'pending', requestDate: Date.now(), username:'', classroom_id:''}
  constructor(private classroomService: ClassroomService, private enrollmentService: EnrollmentService, private router: Router) { }

  ngOnInit() {
  }

  searchForClassroom(){
    this.classroomService.searchForClassroom(this.classroomSearchData.courseName, this.classroomSearchData.schoolName).subscribe(
      data => {
        this.classrooms = data;
      },
      err => {
        console.log(err);
      }
     );
  }

  addEnrollment(classroomId){
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.enrollmentData.username = user.email;
        this.enrollmentData.classroom_id = classroomId;
        //this.enrollmentData.requestDate = Date.now();
        this.enrollmentService.addEnrollment(this.enrollmentData).subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/student-home']);
          },
          err => {
          }
        );
      } 
    });
  }

}
