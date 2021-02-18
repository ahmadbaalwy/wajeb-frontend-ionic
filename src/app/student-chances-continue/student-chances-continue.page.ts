import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chance, ChanceService } from '../services/chance.service';
import { ChanceAnswerService } from '../services/chance-answer.service';
import { Quizz, QuizzService } from '../services/quizz.service';
import { Question, QuestionService } from '../services/question.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

class questionData{
  seq: number;
  questionId: number;
  questionText: string;

  constructor (seq: number, questionId: number, questionText: string){
    this.seq = seq;
    this.questionId = questionId;
    this.questionText = questionText;
  }
  
}

class chanceAnswerData{
  chanceAnswerId: number;
  chanceAnswerText: string;
  chanceAnswerSelected: boolean;

  constructor(chanceAnswerId: number, chanceAnswerText: string, chanceAnswerSelected: boolean){
    this.chanceAnswerId=chanceAnswerId;
    this.chanceAnswerText=chanceAnswerText;
    this.chanceAnswerSelected=chanceAnswerSelected;
  }
}

@Component({
  selector: 'app-student-chances-continue',
  templateUrl: './student-chances-continue.page.html',
  styleUrls: ['./student-chances-continue.page.scss'],
})


export class StudentChancesContinuePage implements OnInit {
  quizzId: any;
  chanceId: any;
  chance: Chance;
  quizz: Quizz[]=[];
  questions: Question[]=[];
  questionsList: questionData[]=[];
  currentQuestionSeq: number = 0;
  currentQuestionText: any;
  currentQuestionId: any;
  answersList: chanceAnswerData[]=[];
  questionPhoto: any;
  @Input() chanceAnswerData1 = {chanceAnswerId:0, chanceAnswerText:'', chanceAnswerSelected:false};
  @Input() chanceAnswerData2 = {chanceAnswerId:0, chanceAnswerText:'', chanceAnswerSelected:false};
  @Input() chanceAnswerData3 = {chanceAnswerId:0, chanceAnswerText:'', chanceAnswerSelected:false};
  @Input() chanceAnswerData4 = {chanceAnswerId:0, chanceAnswerText:'', chanceAnswerSelected:false};

  constructor(private chanceService: ChanceService, private ChanceAnswerService: ChanceAnswerService,
    private route: ActivatedRoute,
    private router: Router,
    private quizzService: QuizzService,
    private questionService: QuestionService,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer) { }

  ngOnInit() {
    
  }
  

  ionViewDidEnter(){
    this.route.queryParams.subscribe(
      params => this.chanceId = (params['chanceId']));
      this.chanceService.getQuizzId(this.chanceId).subscribe(
        data => {
          this.quizzId = data;
          this.quizzService.editQuizzGet(this.quizzId).subscribe(
            data => {
              this.quizz = data;
              this.questions = data.questions;
              console.log(this.quizz);
              this.questions.forEach((element, index) => {
                this.questionsList.push(new questionData(index+1,element.id,element.text));
              });
              console.log(this.questionsList);
              this.currentQuestionId = this.questionsList[this.currentQuestionSeq].questionId;
              this.currentQuestionText = this.questionsList[this.currentQuestionSeq].questionText;
              this.ChanceAnswerService.getChanceAnswerData(this.chanceId, this.currentQuestionId).subscribe(
                data => {
                  this.answersList = data;
                  console.log(this.answersList);
                  this.questionService.getQuestionPhoto(this.currentQuestionId).subscribe(
                    data => {
                      this.questionPhoto = this.domSanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+ data.picByte);
                    },
                    err => {
                      console.log(err);
                    }
                  )

                },
                err => {
                }
              );
            },
            err => {
            }
          );  
        },
        err => {
        }
      );

    

  }

  nextQuestion(){
    this.answersList.forEach(element => {
      this.ChanceAnswerService.editChanceAnswer(element.chanceAnswerId, element.chanceAnswerSelected).subscribe(
        data => {
          console.log("chanceAnswer: " + element.chanceAnswerId + "edited successfully");
        },
        err => {
        }
      );
    });
    
    this.currentQuestionSeq = this.currentQuestionSeq + 1;
    this.currentQuestionId = this.questionsList[this.currentQuestionSeq].questionId;
    this.currentQuestionText = this.questionsList[this.currentQuestionSeq].questionText;
    this.ChanceAnswerService.getChanceAnswerData(this.chanceId, this.currentQuestionId).subscribe(
      data => {
        this.answersList = data;
        console.log(this.answersList);
        this.questionService.getQuestionPhoto(this.currentQuestionId).subscribe(
          data => {
            this.questionPhoto = this.domSanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+ data.picByte);
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
      }
    );
  }

  previousQuestion(){
    this.answersList.forEach(element => {
      this.ChanceAnswerService.editChanceAnswer(element.chanceAnswerId, element.chanceAnswerSelected).subscribe(
        data => {
          console.log("chanceAnswer: " + element.chanceAnswerId + "edited successfully");
        },
        err => {
        }
      );
    });
    this.currentQuestionSeq = this.currentQuestionSeq - 1;
    this.currentQuestionId = this.questionsList[this.currentQuestionSeq].questionId;
    this.currentQuestionText = this.questionsList[this.currentQuestionSeq].questionText;
    this.ChanceAnswerService.getChanceAnswerData(this.chanceId, this.currentQuestionId).subscribe(
      data => {
        this.answersList = data;
        console.log(this.answersList);
        this.questionService.getQuestionPhoto(this.currentQuestionId).subscribe(
          data => {
            this.questionPhoto = this.domSanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+ data.picByte);
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
      }
    );
  }

  submitChance(){
    this.answersList.forEach(element => {
      this.ChanceAnswerService.editChanceAnswer(element.chanceAnswerId, element.chanceAnswerSelected).subscribe(
        data => {
          console.log("chanceAnswer: " + element.chanceAnswerId + "edited successfully");
          this.chanceService.gradeChance(this.chanceId).subscribe(
            data => {
              this.chance = data;
              console.log(this.chance);
              this.router.navigate(['/student-chances-main'], {queryParams: {quizzId: this.quizzId} });
      
            },
            err => {
            }
          );
        },
        err => {
        }
      );
    });
    
  }

  openPhoto(){
    this.photoViewer.show(this.questionPhoto);
  }

}

