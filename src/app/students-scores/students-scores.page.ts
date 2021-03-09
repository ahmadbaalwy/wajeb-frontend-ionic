import { QueryBindingType } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ChanceService } from '../services/chance.service';

@Component({
  selector: 'app-students-scores',
  templateUrl: './students-scores.page.html',
  styleUrls: ['./students-scores.page.scss'],
})
export class StudentsScoresPage implements OnInit {
  loading: any;
  quizzId: any;
  scores: [{full_name: string, score: number}] = null;

  constructor(private route: ActivatedRoute,
    private loadingController: LoadingController,
    private chanceService: ChanceService,
    private router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    
    this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

      this.chanceService.getStudentsScores(this.quizzId)
      .pipe(finalize(async() => { await this.loading.dismiss()}))
      .subscribe(
        data => {
          this.scores = data; 
          console.log(this.scores);
        },
        err => {
        }
      );
    }

    backToQuizzPage(){
      this.router.navigate(['/quizz-teacher-main'], {queryParams: {quizzId: this.quizzId} });

    }

}
