import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz-delete',
  templateUrl: './quizz-delete.page.html',
  styleUrls: ['./quizz-delete.page.scss'],
})
export class QuizzDeletePage implements OnInit {
  quizzId: any;
  quizz: Quizz[]=[];
  classroomId: any;
  
  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizzService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
    this.quizzService.editQuizzGet(this.quizzId).subscribe(
        data => {
          this.quizz=data;
      },
      err => {
        console.log(err);
      }
      );

      this.quizzService.getClassroomId(this.quizzId).subscribe(
        data => {
          this.classroomId=data;
      },
      err => {
        console.log(err);
      }
      );
  }

  deleteQuizz(){
    this.quizzService.deleteQuizz(this.quizzId).subscribe(
      data => {
        this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.classroomId} });

    },
    err => {
      console.log(err);
    }
    );
  }

  backToQuizzPage(){
    this.router.navigate(['/quizz-teacher-main'],  {queryParams: {quizzId: this.quizzId} });
  }  

}



