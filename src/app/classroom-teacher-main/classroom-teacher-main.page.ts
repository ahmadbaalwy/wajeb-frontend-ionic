import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Classroom, ClassroomService } from '../services/classroom.service';
import { Enrollment } from '../services/enrollment.service';
import { Quizz } from '../services/quizz.service';

@Component({
  selector: 'app-classroom-teacher-main',
  templateUrl: './classroom-teacher-main.page.html',
  styleUrls: ['./classroom-teacher-main.page.scss'],
})
  

export class ClassroomTeacherMainPage implements OnInit {
  classroomId: number;
  classroom: Classroom[] = [];
  quizzes: Quizz[] = [];
  enrollments: Enrollment[]=[];
  classroomName: any;
  approvedRequests: number = 0;
  pendingRequests: number;
  constructor(private router: Router, private route:ActivatedRoute, private menu: MenuController, private classroomService: ClassroomService ) { }

  ngOnInit(){
    this.menu.close();
     this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
  }

  ionViewDidEnter(){
    this.approvedRequests = 0;
    this.pendingRequests = 0;
    this.menu.close();
     this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.classroomService.editClassroomGet(this.classroomId).subscribe(
        data => {
          this.classroom=data;
          this.quizzes = data.quizzes;
          this.enrollments = data.enrollments;
          this.enrollments.forEach(element => {
            if(element.status=='pending'){
              this.pendingRequests =+1;
            }
            if(element.status=='approved'){
              this.approvedRequests =+1;
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

}
