import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enrollment, enrollmentDetails, EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-teacher-enrollments-pending',
  templateUrl: './teacher-enrollments-pending.page.html',
  styleUrls: ['./teacher-enrollments-pending.page.scss'],
})
export class TeacherEnrollmentsPendingPage implements OnInit {
  classroomId: any;
  enrollments: enrollmentDetails;
  constructor(private enrollmentService: EnrollmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.enrollmentService.getPendingEnrollments(this.classroomId).subscribe(
      data => {
        this.enrollments = data;
        console.log(this.enrollments);
      },
      err => {
        //this.courses = err.error.message;
      }
    );
  }

  approvePendingEnrollment(enrollmentId){
    this.enrollmentService.approvePendingEnrollment(enrollmentId).subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/teacher-enrollments-pending'], {queryParams: {classroomId: this.classroomId} });
        this.ionViewDidEnter();
      },
      err => {
      }
    );
  }

}
