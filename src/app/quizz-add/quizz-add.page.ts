import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { QuizzService } from '../services/quizz.service';


@Component({
  selector: 'app-quizz-add',
  templateUrl: './quizz-add.page.html',
  styleUrls: ['./quizz-add.page.scss'],
})
export class QuizzAddPage implements OnInit {
  loading: any;
  @Input() quizzData = { quizzName: '', active: false, maxChances: 1, grade: 0, classroomId: 0};

  constructor(private route: ActivatedRoute, private router: Router, private quizzService: QuizzService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.quizzData.classroomId = (params['classroomId']));
  }

  async addQuizz(){
    this.route.queryParams.subscribe(
      params => this.quizzData.classroomId = (params['classroomId']));

      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

    this.quizzService.addQuizz(this.quizzData)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.quizzData.classroomId} });
      },
      err => {
        console.log(err);
      }
     );
  }

  cancel(){
    this.router.navigate(['/classroom-teacher-main'], {queryParams: {classroomId: this.quizzData.classroomId} });
  }

}
