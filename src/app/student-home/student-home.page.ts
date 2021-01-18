import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { enrollmentDetails, EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  userToken: any;
  enrollments: enrollmentDetails[]=[];
  constructor(private router: Router, private enrollmentService: EnrollmentService, private authService:AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        console.log(this.userToken);
        this.enrollmentService.getEnrollments(this.userToken).subscribe(
          data => {
            this.enrollments = data;
            console.log(this.enrollments);
          },
          err => {
            //this.courses = err.error.message;
          }
        );
      } else {
        console.log("no user");
      }
    });
  }

  goToClassroomSearch(){
    this.router.navigate(['/student-classroom-search']);
  }

  goToClassroom(classroomId){
    this.router.navigate(['/classroom-student-main'], {queryParams: {classroomId: classroomId} });

  }

}
