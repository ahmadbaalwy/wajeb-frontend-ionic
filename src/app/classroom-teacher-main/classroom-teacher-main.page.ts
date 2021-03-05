import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Classroom, ClassroomService } from '../services/classroom.service';
import { Enrollment } from '../services/enrollment.service';
import { Quizz } from '../services/quizz.service';

@Component({
  selector: 'app-classroom-teacher-main',
  templateUrl: './classroom-teacher-main.page.html',
  styleUrls: ['./classroom-teacher-main.page.scss'],
})
  

export class ClassroomTeacherMainPage implements OnInit {
  loading: any;
  classroomId: number;
  classroom: Classroom[] = [];
  quizzes: Quizz[] = [];
  enrollments: Enrollment[]=[];
  classroomName: any;
  approvedRequests: number = 0;
  pendingRequests: number = 0;
  constructor(private router: Router, private route:ActivatedRoute, private menu: MenuController,
     private classroomService: ClassroomService,
     private loadingController: LoadingController ) { }

  ngOnInit(){  
  }

  async ionViewWillEnter(){
    this.menu.close();
     this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));

    this.approvedRequests = 0;
    this.pendingRequests = 0;
    this.menu.close();
     this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));

      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

    this.classroomService.editClassroomGet(this.classroomId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
        data => {
          this.classroom=data;
          this.quizzes = data.quizzes;
          this.enrollments = data.enrollments;
          this.enrollments.forEach(element => {
            if(element.status=='pending'){
              this.pendingRequests = this.pendingRequests + 1;
            }
            if(element.status=='approved'){
              this.approvedRequests = this.approvedRequests + 1;
            }
          });
      },
      err => {
        console.log(err);
      }
      );
    
  }

  goHome(){
      this.menu.close();
      this.router.navigate(['/home']);
    }

  editClassroom(classroomId: any){
    this.router.navigate(['/classroom-edit'], {queryParams: {classroomId: classroomId} });
  }

  deleteClassroom(classroomId: any){
    this.router.navigate(['/classroom-delete'], {queryParams: {classroomId: classroomId} });
  }

  addQuizz(classroomId: any){
    this.router.navigate(['/quizz-add'], {queryParams: {classroomId: classroomId} });

  }

  openQuizz(quizzId: any){
    this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: quizzId} });
  }

  goToPendingEnrollments(classroomId: any){
    this.router.navigate(['/teacher-enrollments-pending'], {queryParams: {classroomId: classroomId} });
  }

  goToApprovedEnrollments(classroomId: any){
    this.router.navigate(['/teacher-enrollments-approved'], {queryParams: {classroomId: classroomId} });
  }

  backToHome(){
    
    this.router.navigate(['/home']);

  }

}
