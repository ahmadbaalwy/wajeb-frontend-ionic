import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})
export class CourseAddPage implements OnInit {
  loading: any;
  userToken: any;
  @Input() courseData = { courseName: '' };
  newCourseData: any;


  constructor(private courseService: CourseService, private router:Router
    , private loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  async addCourse(){
    
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        this.newCourseData = {courseName: this.courseData.courseName, token: this.userToken}

        this.loading = await this.loadingController.create({
          cssClass: 'loading-class',
          message: 'الرجاء الانتظار...',
          
        });
        await this.loading.present();

        this.courseService.addCourse(this.newCourseData )
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
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

  cancel(){
    this.router.navigate(['/home']);
  }

}
