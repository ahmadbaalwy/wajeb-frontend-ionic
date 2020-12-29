import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})
export class CourseAddPage implements OnInit {
  userToken: any;
  @Input() courseData = { courseName: '' };
  newCourseData: any;


  constructor(private courseService: CourseService, private router:Router) { }

  ngOnInit() {
    
  }

  async addCourse(){
    
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        this.newCourseData = {courseName: this.courseData.courseName, token: this.userToken}
        this.courseService.addCourse(this.newCourseData ).subscribe(
          data => {
            this.router.navigate(['/home']);
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

}
