import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { enrollmentDetails, EnrollmentService } from '../services/enrollment.service';
import { finalize } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  loading: any;
  userToken: any;
  enrollments: enrollmentDetails[]=[];
  fullName: any;
  errorMessage: any;
  constructor(private router: Router, private enrollmentService: EnrollmentService, private authService:AuthService,
    public loadingController: LoadingController,
    private profileService: ProfileService
    ) { }

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
        console.log(this.userToken);

        if (user.email){
          this.profileService.getFullName(user.email)
          .subscribe(
            data => {
              this.fullName = data;
              console.log(this.fullName);
            },
            err => {
              this.errorMessage = err;
            }
          );
        }
        if (user.phoneNumber){
          this.profileService.getFullName(user.phoneNumber)
          .subscribe(
            data => {
              this.fullName = data;
              console.log(this.fullName);
            },
            err => {
              this.errorMessage = err;
            }
          );
        }

        this.enrollmentService.getEnrollments(this.userToken)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            this.enrollments = data;
            console.log(this.enrollments);
          },
          err => {
            alert("خطأ في الاتصال بالنت");
            this.router.navigate(['/login']);
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

  goToClassroom(classroomId, courseName){
    this.router.navigate(['/classroom-student-main'], {queryParams: {classroomId: classroomId, courseName: courseName} });

  }

  goToAccountPage(){
    this.router.navigate(['account'])
  
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
