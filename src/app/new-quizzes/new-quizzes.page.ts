import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { DateToIsoPipe } from '../date-to-iso.pipe';
import { newQuizzes, QuizzService } from '../services/quizz.service';

@Component({
  selector: 'app-new-quizzes',
  templateUrl: './new-quizzes.page.html',
  styleUrls: ['./new-quizzes.page.scss'],
  providers: [DateToIsoPipe]
})
export class NewQuizzesPage implements OnInit {
  loading: any;
  userToken: any;
  newQuizzesList: newQuizzes[]=[];
  constructor(private loadingController: LoadingController,
    private quizzService: QuizzService,
    private router: Router,
    private myPipe: DateToIsoPipe) { }

  ngOnInit() {
  }

  convertToIso(value: string){
    if (value===null){return ""}
    return this.myPipe.transform(value);
  }

  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        this.userToken = await user.getIdToken();
        this.quizzService.getNewQuizzes(this.userToken)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            this.newQuizzesList = data;
            console.log(this.newQuizzesList);
          },
          err => {
            alert("خطأ في الاتصال بالنت");
            this.router.navigate(['/login']);
          }
        );

      } else {
        console.log("no user");
      }
    });
  }

  goHome(){
    this.router.navigate(['/student-home']);
}

openQuizz(quizzId: any){
  this.router.navigate(['/student-chances-main'], {queryParams: {quizzId: quizzId} });

}

}
