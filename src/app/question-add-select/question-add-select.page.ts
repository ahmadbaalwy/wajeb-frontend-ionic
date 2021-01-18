import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { quizzAnswerService } from '../services/quizz-answer.service';

@Component({
  selector: 'app-question-add-select',
  templateUrl: './question-add-select.page.html',
  styleUrls: ['./question-add-select.page.scss'],
})
export class QuestionAddSelectPage implements OnInit {

  @Input() questionData = {type: 'select', sequence:1, score:'', text:'', quizzId:0};
  @Input() quizzAnswerData1 = {text:'', correct: false, sequence:1, questionId:0};
  @Input() quizzAnswerData2 = {text:'', correct: false, sequence:1, questionId:0}
  @Input() quizzAnswerData3 = {text:'', correct: false, sequence:1, questionId:0}
  @Input() quizzAnswerData4 = {text:'', correct: false, sequence:1, questionId:0}


  constructor(private route: ActivatedRoute, private router: Router,
    private questionService: QuestionService,
    private quizzAnswerService:quizzAnswerService) { }

  ngOnInit() {
  }

  selectAnswer(event){
    this.quizzAnswerData1.correct=false;
    this.quizzAnswerData2.correct=false;
    this.quizzAnswerData3.correct=false;
    this.quizzAnswerData4.correct=false;
    if (event.detail.value==1){
     this.quizzAnswerData1.correct=true;
    }
    if (event.detail.value==2){
      this.quizzAnswerData2.correct=true;
    }
    if (event.detail.value==3){
      this.quizzAnswerData3.correct=true;
    }
    if (event.detail.value==4){
      this.quizzAnswerData4.correct=true;
    }
  }

  addQuestionSelect(){
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
                this.quizzAnswerData3.questionId=this.quizzAnswerData1.questionId;
            this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData3).subscribe(
              data => {
                this.quizzAnswerData4.questionId=this.quizzAnswerData1.questionId;
                this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData4).subscribe(
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
