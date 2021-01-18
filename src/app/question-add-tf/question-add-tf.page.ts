import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { quizzAnswerService } from '../services/quizz-answer.service';

@Component({
  selector: 'app-question-add-tf',
  templateUrl: './question-add-tf.page.html',
  styleUrls: ['./question-add-tf.page.scss'],
})
export class QuestionAddTfPage implements OnInit {

  @Input() questionData = {type: 'tf', sequence:1, score:'', text:'', quizzId:0};
  @Input() quizzAnswerData1 = {text:'صح', correct: false, sequence:1, questionId:0};
  @Input() quizzAnswerData2 = {text:'خطأ', correct: false, sequence:1, questionId:0}



  constructor(private route: ActivatedRoute, private router: Router,
    private questionService: QuestionService,
    private quizzAnswerService:quizzAnswerService) { }

  ngOnInit() {
  }

  selectAnswer(event){
    this.quizzAnswerData1.correct=false;
    this.quizzAnswerData2.correct=false;
    if (event.detail.value==1){
     this.quizzAnswerData1.correct=true;
    }
    if (event.detail.value==2){
      this.quizzAnswerData2.correct=true;
    }
    
  }

  addQuestionTF(){
    this.route.queryParams.subscribe(
      params => this.questionData.quizzId = (params['quizzId']));
    this.questionService.addQuestion(this.questionData).subscribe(
      data => {
        this.quizzAnswerData1.questionId=data;
        this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData1).subscribe(
          data => {
            this.quizzAnswerData2.questionId=this.quizzAnswerData1.questionId;
            this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData2).subscribe(
              data => {
                this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
          },
          err => {
            console.log(err);
          }
        );            
      },
        err => {
          console.log(err);
        }
      );
    },
    err => {
      console.log(err);
    }
    );
  }

}
