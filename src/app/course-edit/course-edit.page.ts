import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { Course, CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.page.html',
  styleUrls: ['./course-edit.page.scss'],
})
export class CourseEditPage implements OnInit {
  userToken: any;
  courseId: any;
  course: Course;
  @Input() courseData = { courseName: '' };
  
  constructor(private route: ActivatedRoute,private router:Router, private courseService: CourseService) { }

  ngOnInit(): void {
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

  editCourse(): void{
    this.courseService.editCoursePost(this.userToken, this.courseId, this.courseData.courseName ).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
     );
  }



}