import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { DateToIsoPipe } from '../date-to-iso.pipe';
import { Classroom, ClassroomService } from '../services/classroom.service';
import { Quizz } from '../services/quizz.service';

@Component({
  selector: 'app-classroom-student-main',
  templateUrl: './classroom-student-main.page.html',
  styleUrls: ['./classroom-student-main.page.scss'],
  providers: [DateToIsoPipe]
})
export class ClassroomStudentMainPage implements OnInit {
  loading: any;
  classroomId: number;
  classroom: Classroom[] = [];
  quizzes: Quizz[] = [];
  classroomName: any;
  courseName: any;
  constructor(private router: Router, private route:ActivatedRoute, private classroomService: ClassroomService,
    private loadingController: LoadingController,
    private myPipe: DateToIsoPipe ) { }

  ngOnInit() {
  }

  convertToIso(value: string){
    if (value===null){return ""}
    return this.myPipe.transform(value);
  }

  async ionViewWillEnter(){
    
     this.route.queryParams.subscribe(
      params => {
        this.classroomId = (params['classroomId']);
        this.courseName = (params['courseName']);
      });

      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
        
      });
      await this.loading.present();

    this.classroomService.editClassroomGet(this.classroomId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
        data => {
          this.classroom=data;
          console.log(this.classroom);
          this.quizzes = data.quizzes;
      },
      err => {
        console.log(err);
      }
      );
    
  }

  openQuizz(quizzId: any){
    this.router.navigate(['/student-chances-main'], {queryParams: {quizzId: quizzId} });

  }

  goHome(){
      this.router.navigate(['/student-home']);
  }

}
