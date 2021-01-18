import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { enrollmentDetails, EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-teacher-enrollments-approved',
  templateUrl: './teacher-enrollments-approved.page.html',
  styleUrls: ['./teacher-enrollments-approved.page.scss'],
})
export class TeacherEnrollmentsApprovedPage implements OnInit {
  classroomId: any;
  enrollments: enrollmentDetails;
  constructor(private enrollmentService: EnrollmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.enrollmentService.getApprovedEnrollments(this.classroomId).subscribe(
      data => {
        this.enrollments = data;
        console.log(this.enrollments);
      },
      err => {
      }
    );
  }

}
