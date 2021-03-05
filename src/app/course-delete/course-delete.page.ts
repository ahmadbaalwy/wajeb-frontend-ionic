import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { Course, CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.page.html',
  styleUrls: ['./course-delete.page.scss'],
})
export class CourseDeletePage implements OnInit {
  loading: any;
  userToken: any;
  courseId: any;
  course: Course;
  courseData = { courseName: '' };
  constructor(private route:ActivatedRoute,private router: Router, private courseService: CourseService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        this.route.queryParams.subscribe(
        params => this.courseId = (params['courseId']));
        this.courseService.editCourseGet(this.userToken, this.courseId)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
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

  async deleteCourse() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.route.queryParams.subscribe(
      params => this.courseId = (params['courseId']));
    this.courseService.deleteCourse(this.userToken, this.courseId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {this.router.navigate(["/home"]);
    },
    err => {
      console.log(err);
    }
    );
  }

  cancelDelete(): void{
    this.router.navigate(["/home"]);
  }

}
