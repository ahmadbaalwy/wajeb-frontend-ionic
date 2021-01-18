import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../services/quizz.service';


@Component({
  selector: 'app-quizz-add',
  templateUrl: './quizz-add.page.html',
  styleUrls: ['./quizz-add.page.scss'],
})
export class QuizzAddPage implements OnInit {

  @Input() quizzData = { quizzName: '', active: true, maxChances: 1, grade: 0, classroomId: 0};

  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizzService) { }

  ngOnInit() {
  }

  addQuizz(){
    this.route.queryParams.subscribe(
      params => this.quizzData.classroomId = (params['classroomId']));
    this.quizzService.addQuizz(this.quizzData).subscribe(
      data => {
        this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.quizzData.classroomId} });
      },
      err => {
        console.log(err);
      }
     );
  }

}
