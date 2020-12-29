import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { Course, CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  content: any;
  userEmail: any;
  userToken: any;
  courses: Course[] = [];

  constructor(private authService:AuthService, private courseService: CourseService, private router: Router) {
  }

 async ngOnInit(){
  firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
    if (user) {
      this.userEmail = user.email;
      this.userToken = await user.getIdToken();
      this.courseService.getCourses(this.userToken).subscribe(
        data => {
          this.courses = data;
        },
        err => {
          this.courses = JSON.parse(err.error).message;
        }
      );
    } else {
      this.userEmail = "no user";
    }
  });
  
}

add(): void{
  this.router.navigate(['/course-add']);
}

delete(courseId: any): void{
  this.router.navigate(['/course-delete'], {queryParams: {courseId: courseId} });
}

edit(courseId: any): void{
  this.router.navigate(['/course-edit'], {queryParams: {courseId: courseId} });}

}
