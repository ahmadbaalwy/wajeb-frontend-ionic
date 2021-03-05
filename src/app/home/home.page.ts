import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Course, CourseService } from '../services/course.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: any;
  content: any;
  userEmail: any;
  userToken: any;
  courses: Course[] = [];
  fullName: any;
  errorMessage: any;

  constructor(private authService:AuthService, private courseService: CourseService, private router: Router,
    private loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private profileService: ProfileService) {
  }

ngOnInit(){}

 async ionViewWillEnter(){
  this.loading = await this.loadingController.create({
    cssClass: 'loading-class',
    message: 'الرجاء الانتظار...',
    
  });
  await this.loading.present();

  firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
    if (user) {
      this.userEmail = user.email;
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

      this.courseService.getCourses(this.userToken)
      .pipe(finalize(async() => { await this.loading.dismiss()}))
      .subscribe(
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

    async presentActionSheet(courseId) {
      const actionSheet = await this.actionSheetController.create({
        header: 'نوع الفصل أو المجموعة (المركز الدراسي)',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'فصل في مدرسة',
          handler: () => {
            this.router.navigate(['/classroom-add-school'], {queryParams: {courseId: courseId} });
          }
        }, {
          text: 'مجموعة في جامعة أو كلية',
          handler: () => {
            this.router.navigate(['/classroom-add-college'], {queryParams: {courseId: courseId} });
          }
        }, {
          text: 'فصل في مركز لغة',
          handler: () => {
            this.router.navigate(['/classroom-add-center'], {queryParams: {courseId: courseId} });
          }
        }, {
          text: 'تراجع ',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

}

