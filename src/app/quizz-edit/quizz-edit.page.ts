import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.page.html',
  styleUrls: ['./quizz-edit.page.scss'],
})
export class QuizzEditPage implements OnInit {
  loading: any;
  quizzId: number;
  quizz: Quizz[]=[];
  @Input() quizzData = { quizzName: '', active: true, maxChances: 1, allowReview: false, grade: 0, classroomId:0};
  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizzService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter(){
      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

    this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
    this.quizzService.editQuizzGet(this.quizzId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
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

  async editQuizz(){

    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.quizzService.editQuizzPost(this.quizzId, this.quizzData )
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        console.log(this.quizz);
        this.router.navigate(['/quizz-teacher-main'],  {queryParams: {quizzId: this.quizzId} });
      },
      err => {
        console.log(err);
      }
     );

  }

  backToQuizzPage(){
    this.router.navigate(['/quizz-teacher-main'],  {queryParams: {quizzId: this.quizzId} });
  }

}
