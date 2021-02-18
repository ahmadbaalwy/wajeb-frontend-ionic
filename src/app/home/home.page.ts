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

ngOnInit(){}

 async ionViewDidEnter(){
  firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
    if (user) {
      this.userEmail = user.email;
      this.userToken = await user.getIdToken();
      console.log(this.userToken);
      this.courseService.getCourses(this.userToken).subscribe(
        data => {
          this.courses = data;
          console.log(this.courses);
        },
        err => {
          //this.courses = err.error.message;
          this.courses = [{id: 1, courseName:err.message, user:"test", classrooms:[]}];
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
  this.router.navigate(['/course-edit'], {queryParams: {courseId: courseId} });
}

goToClassroom(classroomId: any): void{
  this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: classroomId} });
}

addClassroom(courseId): void{
  this.router.navigate(['classroom-add'], {queryParams: {courseId: courseId} } )
}

signOut(){
  this.authService.logoutUser().then(
    () => {
           this.router.navigate(['/']);
          }
        ,
        err => {
          console.log(err);
        }
       ); 
    }

}

