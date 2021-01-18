import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.page.html',
  styleUrls: ['./quizz-edit.page.scss'],
})
export class QuizzEditPage implements OnInit {

  quizzId: number;
  quizz: Quizz[]=[];
  @Input() quizzData = { quizzName: '', active: true, maxChances: 1, grade: 0, classroomId:0};
  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizzService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
    this.quizzService.editQuizzGet(this.quizzId).subscribe(
        data => {
          this.quizz=data;
          this.quizzData = data;
          //this.classroomData.classroomName = this.classroom.classroomName;
      },
      err => {
        console.log(err);
      }
      );
  }

  editQuizz(){
    this.quizzService.editQuizzPost(this.quizzId, this.quizzData ).subscribe(
      data => {
        console.log(this.quizz);
        this.router.navigate(['/quizz-teacher-main'],  {queryParams: {quizzId: this.quizzId} });
      },
      err => {
        console.log(err);
      }
     );

  }

}
