import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz-review',
  templateUrl: './quizz-review.page.html',
  styleUrls: ['./quizz-review.page.scss'],
})
export class QuizzReviewPage implements OnInit {
  loading: any;
  quizzId: any;
  chanceId: any;
  quizz: Quizz[]=[];

  constructor(
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private quizzService: QuizzService,
    private router:Router
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
      params => this.quizzId = (params['quizzId']));
    this.route.queryParams.subscribe(
      params => this.chanceId = (params['chanceId']));

    this.quizzService.reviewQuizz(this.quizzId, this.chanceId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        console.log(data);
        this.quizz = data;

      },
      err => {
      }
    );


  }

  backToQuizzPage(){
    this.router.navigate(['/student-chances-main'], {queryParams: {quizzId: this.quizzId } });

  }

}
