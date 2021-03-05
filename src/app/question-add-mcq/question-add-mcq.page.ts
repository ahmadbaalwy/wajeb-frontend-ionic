import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { PhotoService } from '../services/photo.service';
import { QuestionService } from '../services/question.service';
import { quizzAnswerService } from '../services/quizz-answer.service';

@Component({
  selector: 'app-question-add-mcq',
  templateUrl: './question-add-mcq.page.html',
  styleUrls: ['./question-add-mcq.page.scss'],
})
export class QuestionAddMcqPage implements OnInit {
  loading: any;

  @Input() questionData = {type: 'mcq', sequence:1, score:'', text:'', quizzId:''};
  @Input() quizzAnswerData1 = {text:'', correct: false, sequence:1, questionId:0};
  @Input() quizzAnswerData2 = {text:'', correct: false, sequence:1, questionId:0}
  @Input() quizzAnswerData3 = {text:'', correct: false, sequence:1, questionId:0}
  @Input() quizzAnswerData4 = {text:'', correct: false, sequence:1, questionId:0}


  constructor(private route: ActivatedRoute, private router: Router,
    private questionService: QuestionService,
    private quizzAnswerService:quizzAnswerService,
    private photoService: PhotoService,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.photoService.savedFile = null;

  }


  async addQuestionMCQ(){
    this.route.queryParams.subscribe(
      params => this.questionData.quizzId = (params['quizzId']));
      const questionData = new FormData();
      questionData.append("type", "mcq");
      questionData.append("sequence","1");
      questionData.append("score",this.questionData.score);
      questionData.append("text", this.questionData.text);
      if (this.photoService.savedFile){
        questionData.append("picByte", this.photoService.savedFile, 'photoFile');
      }
      questionData.append("quizzId", this.questionData.quizzId);

      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

    this.questionService.addQuestion(questionData).subscribe(
      data => {
        this.quizzAnswerData1.questionId=data.body;
        this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData1).subscribe(
          data => {
            this.quizzAnswerData2.questionId=this.quizzAnswerData1.questionId;
            this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData2).subscribe(
              data => {
                this.quizzAnswerData3.questionId=this.quizzAnswerData1.questionId;
            this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData3).subscribe(
              data => {
                this.quizzAnswerData4.questionId=this.quizzAnswerData1.questionId;
                this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData4)
                .pipe(finalize(async() => { await this.loading.dismiss()}))
                .subscribe(
                  data => {
                    this.photoService.photo.webviewPath = null;
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

  addQuestionPhoto(){
    this.photoService.addNewPhoto();
  }

  cancel(){
    this.photoService.photo.webviewPath = null;
    this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
  }

}
