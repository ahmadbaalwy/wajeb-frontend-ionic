import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionService } from '../services/question.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { quizzAnswerService } from '../services/quizz-answer.service';

class quizzAnswerData {
  id: number;
  text: string;
  correct: boolean;
  sequence: number;
  constructor(id: number, text: string, correct: boolean, sequence: number){
    this.id = id;
    this.text=text;
    this.correct=correct;
    this.sequence=sequence;
  }
}

@Component({
  selector: 'app-question-teacher',
  templateUrl: './question-teacher.page.html',
  styleUrls: ['./question-teacher.page.scss'],
})
export class QuestionTeacherPage implements OnInit {
  loading: any;
  questionId: any;
  quizzId: any;
  question: Question[] =[];
  @Input() questionData = {id: 0, type: '', sequence:'', score:'', text:''};
  
  quizzAnswerList: quizzAnswerData[] = [];
  answerSelected: null;
  questionPhoto: any;
  constructor(private route: ActivatedRoute, private questionService: QuestionService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    private loadingController: LoadingController,
    private quizzAnswerService: quizzAnswerService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.quizzAnswerList = [];
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.route.queryParams.subscribe(
      params => this.questionId = (params['questionId']));

    this.questionService.getQuestion(this.questionId).subscribe(
      data => {
        this.question = data;
        console.log(data);
        this.questionData.id = data.id;
        this.questionData.text = data.text;
        this.questionData.type = data.type;
        this.questionData.sequence = data.sequence;
        this.questionData.score = data.score
        data.quizzAnswers.forEach(element => {
          if (element.correct){
            this.answerSelected = element.id;
          }
          this.quizzAnswerList.push(new quizzAnswerData(element.id,element.text,element.correct,element.sequence));
        });
        console.log(this.quizzAnswerList);
        this.questionService.getQuestionPhoto(this.questionId)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            this.questionPhoto = this.domSanitizer.bypassSecurityTrustUrl("data:Image/*;base64,"+ data.picByte);
            console.log(this.questionPhoto);
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
        console.log(err);
      }
    );

  }

  backToQuizzPage(){
    this.questionService.getQuizzId(this.questionId).subscribe(
      data => {
        this.quizzId = data;
        this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.quizzId} });
      },
      err => {
        console.log(err);
      }
    )
    
  }

  openPhoto(){
    this.photoViewer.show(this.questionPhoto);
  }

  async editQuestion(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'يتم تعديل نص السؤال... الرجاء الانتظار', 
    });
    await this.loading.present();
    var that = this;
    this.questionService.editQuestionPost(this.questionId, this.questionData)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.quizzAnswerList.forEach(async function(item, i, array) {
          let loading = await that.loadingController.create({
            cssClass: 'loading-class',
            message: 'يتم تعديل إجابات السؤال... الرجاء الانتظار',
            
          });
          await loading.present();
          if (that.questionData.type==="select" || that.questionData.type==="tf"){
            if (item.id === that.answerSelected){
              item.correct = true;
            }
            else{
              item.correct = false
            }
          }
          that.quizzAnswerService.editQuizzAnswerPost(item.id, item)
          .pipe(finalize(async() => { await loading.dismiss()}))
          .subscribe(
            data => {
              if (i === array.length - 1){
                that.backToQuizzPage();
              }
              
            },
            err => {
              console.log(err);
            }
          )
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  async deleteQuestion(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'تأكيد حذف!',
      message: ' <strong>هل تريد حذف السؤال مع كافة البيانات المرتبطة به ؟</strong>!!!',
      buttons: [
        {
          text: 'تراجع',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'حذف',
          handler: () => {
            this.deleteQuestionConfirmed();
          }
        }
      ]
    });

    await alert.present();
  }

    async deleteQuestionConfirmed(){
      this.questionService.getQuizzId(this.questionId).subscribe(
        data => {
          this.quizzId = data;
        },
        err => {
          console.log(err);
        }
      )

    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'يتم حذف السؤال... الرجاء الانتظار', 
    });
    await this.loading.present();

    this.questionService.deleteQuestion(this.questionData.id)
          .pipe(finalize(async() => { await this.loading.dismiss()}))
          .subscribe(
            data => {
              this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.quizzId} });
            },
            err => {
              console.log(err);
            }
          )
  }

}
