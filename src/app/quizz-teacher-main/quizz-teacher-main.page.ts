import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Classroom } from '../services/classroom.service';
import { Question } from '../services/question.service';
import { Quizz, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-quizz-teacher-main',
  templateUrl: './quizz-teacher-main.page.html',
  styleUrls: ['./quizz-teacher-main.page.scss'],
})
export class QuizzTeacherMainPage implements OnInit {
  quizzId: any;
  quizz: Quizz[]=[];
  questions: Question[]=[];
  classroomId: any;

  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizzService, public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  backToClassroomHome(quizzId: any){
    
    this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.classroomId} });

  }

  ionViewDidEnter(){
    
     this.route.queryParams.subscribe(
      params => this.quizzId = (params['quizzId']));
    this.quizzService.editQuizzGet(this.quizzId).subscribe(
        data => {
          this.quizz=data;
          this.questions = data.questions;
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

  editQuizz(quizzId){
    this.router.navigate(['/quizz-edit'], {queryParams: {quizzId: quizzId} });

  }

  deleteQuizz(quizzId){
    this.router.navigate(['/quizz-delete'], {queryParams: {quizzId: quizzId} });

  }

  async presentActionSheet(quizzId) {
    const actionSheet = await this.actionSheetController.create({
      header: 'نوع السؤال',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'سؤال اختيارات (إجابة واحدة)',
        handler: () => {
          this.router.navigate(['/question-add-select'], {queryParams: {quizzId: quizzId} });
        }
      }, {
        text: 'سؤال اختيارات (إجابات متعددة)',
        handler: () => {
          this.router.navigate(['/question-add-mcq'], {queryParams: {quizzId: quizzId} });
        }
      }, {
        text: 'سؤال صح أو خطأ',
        handler: () => {
          this.router.navigate(['/question-add-tf'], {queryParams: {quizzId: quizzId} });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
