import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { enrollmentDetails, EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  userToken: any;
  enrollments: enrollmentDetails[]=[];
  constructor(private router: Router, private enrollmentService: EnrollmentService, private authService:AuthService,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      duration: 10000
    });
    await loading.present();

    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        console.log(this.userToken);
        this.enrollmentService.getEnrollments(this.userToken).subscribe(
          data => {
            this.enrollments = data;
            console.log(this.enrollments);
            loading.dismiss();
          },
          err => {
            //this.courses = err.error.message;
          }
        );
      } else {
        console.log("no user");
      }
    });
  }

  goToClassroomSearch(){
    this.router.navigate(['/student-classroom-search']);
  }

  goToClassroom(classroomId){
    this.router.navigate(['/classroom-student-main'], {queryParams: {classroomId: classroomId} });

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
