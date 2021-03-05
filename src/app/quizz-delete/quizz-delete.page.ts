import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz-delete',
  templateUrl: './quizz-delete.page.html',
  styleUrls: ['./quizz-delete.page.scss'],
})
export class QuizzDeletePage implements OnInit {
  loading: any;
  quizzId: any;
  quizz: Quizz[]=[];
  classroomId: any;
  
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
      },
      err => {
        console.log(err);
      }
      );

      this.quizzService.getClassroomId(this.quizzId).subscribe(
        data => {
          this.classroomId=data;
      },
      err => {
        console.log(err);
      }
      );
  }

  async deleteQuizz(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.quizzService.deleteQuizz(this.quizzId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.classroomId} });

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



