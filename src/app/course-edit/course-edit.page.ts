import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { Course, CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.page.html',
  styleUrls: ['./course-edit.page.scss'],
})
export class CourseEditPage implements OnInit {
  loading: any;
  userToken: any;
  courseId: any;
  course: Course;
  @Input() courseData = { courseName: '' };
  
  constructor(private route: ActivatedRoute,private router:Router, private courseService: CourseService,
    private loadingController: LoadingController) { }

  ngOnInit(): void {

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

  async editCourse(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();
    
    this.courseService.editCoursePost(this.userToken, this.courseId, this.courseData.courseName )
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
     );
  }

  cancelEdit(): void{
    this.router.navigate(["/home"]);
  }



}