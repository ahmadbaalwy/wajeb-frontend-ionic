import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Classroom, ClassroomService } from '../services/classroom.service';
import { Quizz } from '../services/quizz.service';

@Component({
  selector: 'app-classroom-student-main',
  templateUrl: './classroom-student-main.page.html',
  styleUrls: ['./classroom-student-main.page.scss'],
})
export class ClassroomStudentMainPage implements OnInit {
  classroomId: number;
  classroom: Classroom[] = [];
  quizzes: Quizz[] = [];
  classroomName: any;
  constructor(private router: Router, private route:ActivatedRoute, private classroomService: ClassroomService ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    
     this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.classroomService.editClassroomGet(this.classroomId).subscribe(
        data => {
          this.classroom=data;
          this.quizzes = data.quizzes;
      },
      err => {
        console.log(err);
      }
      );
    
  }

  openQuizz(quizzId: any){
    this.router.navigate(['/student-chances-main'], {queryParams: {quizzId: quizzId} });

  }

  goHome(){
      this.router.navigate(['/student-home']);
  }

}
