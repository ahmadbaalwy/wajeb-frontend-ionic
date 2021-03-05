import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionService } from '../services/question.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-question-teacher',
  templateUrl: './question-teacher.page.html',
  styleUrls: ['./question-teacher.page.scss'],
})
export class QuestionTeacherPage implements OnInit {
  loading: any;
  questionId: any;
  quizzId: any;
  question: Question[]=[];
  questionPhoto: any;
  constructor(private route: ActivatedRoute, private questionService: QuestionService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){

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

}
