import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.page.html',
  styleUrls: ['./classroom-add.page.scss'],
})
export class ClassroomAddPage implements OnInit {
  @Input() classroomData = { classroomName: '', private: true, active: true, schoolName: '', category:'', startDate:'', endDate:'', courseId:0};
  classroom: Classroom;
  loading: any;
  constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    
  }

  async addClassroom(){
    this.route.queryParams.subscribe(
      params => this.classroomData.courseId = (params['courseId']));
    
      this.loading = await this.loadingController.create({
        cssClass: 'loading-class',
        message: 'الرجاء الانتظار...',
      });
      await this.loading.present();

    this.classroomService.addClassroom(this.classroomData)
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

  cancel(){
    this.router.navigate(['/home']);
  }

}
