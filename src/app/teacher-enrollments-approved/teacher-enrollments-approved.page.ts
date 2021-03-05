import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { enrollmentDetails, EnrollmentService } from '../services/enrollment.service';

@Component({
  selector: 'app-teacher-enrollments-approved',
  templateUrl: './teacher-enrollments-approved.page.html',
  styleUrls: ['./teacher-enrollments-approved.page.scss'],
})
export class TeacherEnrollmentsApprovedPage implements OnInit {
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

    this.enrollmentService.getApprovedEnrollments(this.classroomId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.enrollments = data; 
        console.log(this.enrollments);
      },
      err => {
      }
    );
  }

  backToClassroomPage(){
    this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.classroomId} });
  }

}
