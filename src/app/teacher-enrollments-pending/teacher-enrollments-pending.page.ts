import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Enrollment, enrollmentDetails, EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-teacher-enrollments-pending',
  templateUrl: './teacher-enrollments-pending.page.html',
  styleUrls: ['./teacher-enrollments-pending.page.scss'],
})
export class TeacherEnrollmentsPendingPage implements OnInit {
  loading: any;
  classroomId: any;
  enrollments: enrollmentDetails[] = [];
  constructor(private enrollmentService: EnrollmentService, private route: ActivatedRoute, private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    
      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

    this.enrollmentService.getPendingEnrollments(this.classroomId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.enrollments = data;
        console.log(this.enrollments);
      },
      err => {
        //this.courses = err.error.message;
      }
    );
  }

  async approvePendingEnrollment(enrollmentId){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.enrollmentService.approvePendingEnrollment(enrollmentId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/teacher-enrollments-pending'], {queryParams: {classroomId: this.classroomId} });
        this.ionViewWillEnter();
      },
      err => {
      }
    );
  }

  backToClassroomPage(){
    this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.classroomId} });
  }

}
