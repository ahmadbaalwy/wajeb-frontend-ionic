import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Photo, PhotoService } from '../services/photo.service';
import { QuestionService } from '../services/question.service';
import { quizzAnswerService } from '../services/quizz-answer.service';

@Component({
  selector: 'app-question-add-tf',
  templateUrl: './question-add-tf.page.html',
  styleUrls: ['./question-add-tf.page.scss'],
})
export class QuestionAddTfPage implements OnInit {
  loading:any; 
  @Input() questionData = {type: 'tf', sequence:1, score:'', text:'', quizzId:''};
  @Input() quizzAnswerData1 = {text:'صح', correct: false, sequence:1, questionId:0};
  @Input() quizzAnswerData2 = {text:'خطأ', correct: false, sequence:1, questionId:0}



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

  async addQuestionTF(){
    this.route.queryParams.subscribe(
      params => this.questionData.quizzId = (params['quizzId']));
      const questionData = new FormData();
      questionData.append("type", "tf");
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
            this.quizzAnswerService.addQuizzAnswer(this.quizzAnswerData2)
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
  }

  cancel(){
    this.photoService.photo.webviewPath = null;
    this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
  }

  addQuestionPhoto(){
    this.photoService.addNewPhoto();
  }

}
