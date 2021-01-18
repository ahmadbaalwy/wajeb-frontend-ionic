import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { ChanceAnswerService } from '../services/chance-answer.service';
import { Chance, ChanceService } from '../services/chance.service';
import { QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-student-chances-main',
  templateUrl: './student-chances-main.page.html',
  styleUrls: ['./student-chances-main.page.scss'],
})
export class StudentChancesMainPage implements OnInit {
  userToken: any;
  quizzId: any;
  chanceId: any;
  pendingChances: Chance[]=[];
  submittedChances: Chance[]=[];
  maxAllowedChances: any;
  chanceData = {token:'', quizzId:''};

  constructor(private chanceService: ChanceService, 
     private ChanceAnswerService: ChanceAnswerService,
     private quizzService: QuizzService,
     private route: ActivatedRoute,
     private router: Router
     ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        console.log(this.userToken);
        this.chanceService.getStudentPendingChances(this.userToken, this.quizzId).subscribe(
          data => {
            this.pendingChances = data;
            console.log(this.pendingChances);

          },
          err => {
          }
        );
        this.chanceService.getStudentSubmittedChances(this.userToken, this.quizzId).subscribe(
          data => {
            this.submittedChances = data;
            console.log(this.submittedChances);

          },
          err => {
          }
        );
        this.quizzService.getMaxAllowedChances(this.quizzId).subscribe(
          data => {
            this.maxAllowedChances = data;
            console.log(this.maxAllowedChances);

          },
          err => {
          }
        );
      } else {
        console.log("no user");
      }
    });
  }

  newChance(){
    this.chanceData.token = this.userToken;
    this.chanceData.quizzId = this.quizzId;
    console.log(this.chanceData);
    this.chanceService.addChance(this.chanceData).subscribe(
      data => {
        console.log(data);
        this.chanceId = data;
        this.ChanceAnswerService.addChanceAnswer(this.chanceId).subscribe(
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
