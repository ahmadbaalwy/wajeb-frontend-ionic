import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { Course, CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.page.html',
  styleUrls: ['./course-delete.page.scss'],
})
export class CourseDeletePage implements OnInit {
  userToken: any;
  courseId: any;
  course: Course;
  courseData = { courseName: '' };
  constructor(private route:ActivatedRoute,private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        this.route.queryParams.subscribe(
        params => this.courseId = (params['courseId']));
        this.courseService.editCourseGet(this.userToken, this.courseId).subscribe(
          data => {
            this.course=data;
            this.courseData.courseName = this.course.courseName;
        },
        err => {
          console.log(err);
        }
        );
      } else {
        this.userToken = "no user";
      }
    });
  }

  deleteCourse(): void {
    this.route.queryParams.subscribe(
      params => this.courseId = (params['courseId']));
    this.courseService.deleteCourse(this.userToken, this.courseId).subscribe(
      data => {this.router.navigate(["/home"]);
    },
    err => {
      console.log(err);
    }
    );
  }

}
