import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-teacher-main',
  templateUrl: './classroom-teacher-main.page.html',
  styleUrls: ['./classroom-teacher-main.page.scss'],
})
  

export class ClassroomTeacherMainPage implements OnInit {
  classroomId: any;
  classroom: Classroom[] = [];
  classroomName: any;
  constructor(private router: Router, private route:ActivatedRoute, private menu: MenuController, private classroomService: ClassroomService ) { }

  ngOnInit(){}

  ionViewDidEnter(){
    this.menu.close();
     this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.classroomService.editClassroomGet(this.classroomId).subscribe(
        data => {
          this.classroom=data;
      },
      err => {
        console.log(err);
      }
      );
    
  }

  goHome(){
      this.menu.close();
      this.router.navigate(['/home']);
    }

  editClassroom(classroomId: any){
    this.router.navigate(['/classroom-edit'], {queryParams: {classroomId: classroomId} });
  }

  deleteClassroom(classroomId: any){
    this.router.navigate(['/classroom-delete'], {queryParams: {classroomId: classroomId} });
  }

}
