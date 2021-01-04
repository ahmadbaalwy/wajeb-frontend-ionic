import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.page.html',
  styleUrls: ['./classroom-edit.page.scss'],
})
export class ClassroomEditPage implements OnInit {
  classroomId: any;
  classroom: Classroom;
  @Input() classroomData = { classroomName: '', private: true, active: true, schoolName: '', category:'', startDate:'', endDate:''};
  constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.classroomId = (params['classroomId']));
    this.classroomService.editClassroomGet(this.classroomId).subscribe(
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

  editClassroom(){
    this.classroomService.editClassroomPost(this.classroomId, this.classroomData ).subscribe(
      data => {
        this.router.navigate(['/classroom-teacher-main'],  {queryParams: {classroomId: this.classroomId} });
      },
      err => {
        console.log(err);
      }
     );

  }

}
