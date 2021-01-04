import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-delete',
  templateUrl: './classroom-delete.page.html',
  styleUrls: ['./classroom-delete.page.scss'],
})
export class ClassroomDeletePage implements OnInit {
  classroom: Classroom[] = [];
  classroomId: any;
  constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.classroomService.editClassroomGet(this.classroomId).subscribe(
        data => {
          this.classroom=data;
          //this.classroomData.classroomName = this.classroom.classroomName;
      },
      err => {
        console.log(err);
      }
      );
  }

  deleteClassroom(){
    this.classroomService.deleteClassroom(this.classroomId).subscribe(
      data => {
        this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
    }
    );
  }

}
