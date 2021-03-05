import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-delete',
  templateUrl: './classroom-delete.page.html',
  styleUrls: ['./classroom-delete.page.scss'],
})
export class ClassroomDeletePage implements OnInit {
  loading: any;
  classroom: Classroom[] = [];
  classroomId: any;
  constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService,
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
      params => this.classroomId = (params['classroomId']));
    this.classroomService.editClassroomGet(this.classroomId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
        data => {
          this.classroom=data;
          //this.classroomData.classroomName = this.classroom.classroomName;
      },
      err => {
        console.log(err);
      }
      );
  }

  ionViewDidEnter(){
    
  }

  async deleteClassroom(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',   
    });
    await this.loading.present();
    
    this.classroomService.deleteClassroom(this.classroomId)
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
    }
    );
  }

  cancelDelete(): void{
    this.router.navigate(['/classroom-teacher-main'],  {queryParams: {classroomId: this.classroomId} });
  }

}
