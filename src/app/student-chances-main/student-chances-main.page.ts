import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { ChanceAnswerService } from '../services/chance-answer.service';
import { Chance, ChanceService } from '../services/chance.service';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-student-chances-main',
  templateUrl: './student-chances-main.page.html',
  styleUrls: ['./student-chances-main.page.scss'],
})
export class StudentChancesMainPage implements OnInit {
  loading: any;
  userToken: any;
  quizzId: any;
  chanceId: any;
  pendingChances: Chance[]=[];
  submittedChances: Chance[]=[];
  maxAllowedChances: any;
  chanceData = {token:'', quizzId:''};
  loading1: HTMLIonLoadingElement;
  loading2: HTMLIonLoadingElement;
  maxScore: any;
  loading3: HTMLIonLoadingElement;
  quizz: Quizz = new Quizz();

  constructor(private chanceService: ChanceService, 
     private ChanceAnswerService: ChanceAnswerService,
     private quizzService: QuizzService,
     private route: ActivatedRoute,
     private router: Router,
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

    this.loading1 = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading1.present();

    this.loading2 = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading2.present();

    this.loading3 = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading3.present();



    this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        console.log(this.userToken);
        this.chanceService.getStudentPendingChances(this.userToken, this.quizzId)
        .pipe(finalize(async() => { await this.loading1.dismiss()}))
        .subscribe(
          data => {
            this.pendingChances = data;
            console.log(this.pendingChances);

          },
          err => {
          }
        );
        this.chanceService.getStudentSubmittedChances(this.userToken, this.quizzId)
        .pipe(finalize(async() => { await this.loading2.dismiss()}))
        .subscribe(
          data => {
            this.submittedChances = data;
            console.log(this.submittedChances);

          },
          err => {
          }
        );
        this.quizzService.getQuizzSummary(this.quizzId)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            this.quizz=data;
            console.log(this.quizz);
            //this.maxAllowedChances = data;
            //console.log(this.maxAllowedChances);

          },
          err => {
          }
        );
        this.quizzService.getMaxScore(this.quizzId)
        .pipe(finalize(async() => { await this.loading3.dismiss()}))
        .subscribe(
          data => {
            this.maxScore = data;
            console.log(this.maxScore);

          },
          err => {
          }
        );

      } else {
        console.log("no user");
      }
    });
  }

  async newChance(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();
    
    this.chanceData.token = this.userToken;
    this.chanceData.quizzId = this.quizzId;
    console.log(this.chanceData);
    this.chanceService.addChance(this.chanceData).subscribe(
      data => {
        console.log(data);
        this.chanceId = data;
        this.ChanceAnswerService.addChanceAnswer(this.chanceId)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/student-chances-continue'], {queryParams: {chanceId: this.chanceId} });

          },
          err => {
          }
        );
      },
      err => {
      }
    );
  }

  continueChance(chanceId){
    this.router.navigate(['/student-chances-continue'], {queryParams: {chanceId: chanceId} });

  }

  reviewQuizz(chanceId){
    this.router.navigate(['/quizz-review'], {queryParams: {quizzId: this.quizzId, chanceId:chanceId } });

  }

  goToClassroomPage(){
    this.quizzService.getClassroomId(this.quizzId).subscribe(
      data => {
        this.router.navigate(['/classroom-student-main'], {queryParams: {classroomId: data} });

      },
      err => {
      }
    );
  }

}
