import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { classroomSearch, ClassroomService } from '../services/classroom.service';
import { EnrollmentService } from '../services/enrollment.service';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-student-classroom-search',
  templateUrl: './student-classroom-search.page.html',
  styleUrls: ['./student-classroom-search.page.scss'],
})
export class StudentClassroomSearchPage implements OnInit {
  loading: any;
  @Input() classroomSearchData = {courseName:'', schoolName:''};
  classrooms: classroomSearch[] = [];
  username: any;
  enrollmentData = {status:'pending', requestDate: Date.now(), username:'', classroom_id:''}
  constructor(private classroomService: ClassroomService, private enrollmentService: EnrollmentService, 
    private router: Router,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  async searchForClassroom(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
    });
    await this.loading.present();

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.username = user.email;
        this.classroomService.searchForClassroom(this.classroomSearchData.courseName, this.classroomSearchData.schoolName, this.username)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            this.classrooms = data;
            console.log(this.classrooms);
          },
          err => {
            console.log(err);
          }
         );
      }
    });
    
  }

  async addEnrollment(classroomId){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();
    
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        if (user.email){
          this.enrollmentData.username = user.email;
        }
        if (!user.email){
          this.enrollmentData.username = user.phoneNumber;
        }
        
        this.enrollmentData.classroom_id = classroomId;
        //this.enrollmentData.requestDate = Date.now();
        this.enrollmentService.addEnrollment(this.enrollmentData)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/student-home']);
          },
          err => {
          }
        );
      } 
    });
  }

  backToStudentHome(){
    this.router.navigate(['/student-home']);
  }

}
