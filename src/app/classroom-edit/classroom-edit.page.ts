import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.page.html',
  styleUrls: ['./classroom-edit.page.scss'],
})
export class ClassroomEditPage implements OnInit {
  loading: any;
  classroomId: any;
  classroom: Classroom;
  @Input() classroomData = 
  { classroomName: '',
   private: true,
   active: true, 
   schoolName: '', 
   category:'', 
   college:'',
   department:'', 
   branch:'', 
   session:'',
   startDate:'', 
   endDate:'', 
   courseId:0 };
  constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));

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
        this.classroomData = data;
        //this.classroomData.classroomName = this.classroom.classroomName;
    },
    err => {
      console.log(err);
    }
    );

  }

  async editClassroom(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.classroomService.editClassroomPost(this.classroomId, this.classroomData )
    .pipe(finalize(async() => { await this.loading.dismiss()}))
    .subscribe(
      data => {
        this.router.navigate(['/classroom-teacher-main'],  {queryParams: {classroomId: this.classroomId} });
      },
      err => {
        console.log(err);
      }
     );

  }

  cancelEdit(): void{
    this.router.navigate(['/classroom-teacher-main'],  {queryParams: {classroomId: this.classroomId} });
  }

}
