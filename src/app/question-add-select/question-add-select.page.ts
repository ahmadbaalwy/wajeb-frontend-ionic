import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { PhotoService } from '../services/photo.service';
import { QuestionService } from '../services/question.service';
import { quizzAnswerService } from '../services/quizz-answer.service';
import { QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-question-add-select',
  templateUrl: './question-add-select.page.html',
  styleUrls: ['./question-add-select.page.scss'],
})
export class QuestionAddSelectPage implements OnInit {
  loading: any;

  @Input() questionData = {type: 'select', sequence:1, score:'', text:'', picByte: this.photoService.savedFile, quizzId:''};
  @Input() quizzAnswerData1 = {text:'', correct: false, sequence:1, questionId:0};
  @Input() quizzAnswerData2 = {text:'', correct: false, sequence:1, questionId:0}
  @Input() quizzAnswerData3 = {text:'', correct: false, sequence:1, questionId:0}
  @Input() quizzAnswerData4 = {text:'', correct: false, sequence:1, questionId:0}
  activateQuizz: boolean;
  loading1: HTMLIonLoadingElement;


  constructor(private route: ActivatedRoute, private router: Router,
    private questionService: QuestionService,
    private quizzAnswerService:quizzAnswerService,
    public photoService: PhotoService,
    public quizzService: QuizzService,
    public actionSheetController: ActionSheetController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.questionData.quizzId = (params['quizzId']));
  }

  ionViewWillEnter(){
    this.photoService.savedFile = null;
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

  async addQuestionSelect(){
    this.route.queryParams.subscribe(
      params => this.questionData.quizzId = (params['quizzId']));
    const questionData = new FormData();
    questionData.append("type", "select");
    questionData.append("sequence","1");
    questionData.append("score",this.questionData.score);
    questionData.append("text", this.questionData.text);
    if (this.photoService.savedFile){
      questionData.append("picByte", this.photoService.savedFile, 'photoFile');
    }
    questionData.append("quizzId", this.questionData.quizzId);
    //this.questionData.picByte = this.photoService.savedFile;

    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.questionService.addQuestion(questionData).subscribe(
      data => {
        console.log(data.body);
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
                  async data => {
                    this.photoService.photo.webviewPath = null;
                    if (this.activateQuizz){
                      this.loading1 = await this.loadingController.create({
                        cssClass: 'loading-class',
                        message: 'تفعيل الواجب، الرجاء الانتظار...',
                        
                      });
                      await this.loading1.present();
                      
                      this.quizzService.activateQuizz(this.questionData.quizzId)
                      .pipe(finalize(async() => { await this.loading1.dismiss()}))
                      .subscribe(
                        data => {
                          console.log(data);
                          this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
                        },
                        err => {
                          console.log(err);
                          this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
                        }
                      );
                    }
                    else if(!this.activateQuizz){
                      this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
                    }
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'هل أكملت إضافة كل أسئلة الواجب ؟',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'نعم، قم بتفعيل وإظهار الواجب للطلاب',
        handler: () => {
          this.activateQuizz = true;
          this.addQuestionSelect();
        }
      }, {
        text: 'لا، سأقوم بإضافة أسئلة أخرى',
        handler: () => {
          this.activateQuizz = false;
          this.addQuestionSelect();
        }
      }, 
      {
        text: 'تراجع',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  cancel(){
    this.photoService.photo.webviewPath = null;
    this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.questionData.quizzId} });
  }

  addQuestionPhoto(){
    this.photoService.addNewPhoto();
  }

}
