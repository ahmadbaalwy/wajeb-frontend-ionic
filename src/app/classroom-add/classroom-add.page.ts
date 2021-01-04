import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom, ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.page.html',
  styleUrls: ['./classroom-add.page.scss'],
})
export class ClassroomAddPage implements OnInit {
  @Input() classroomData = { classroomName: '', private: true, active: true, schoolName: '', category:'', startDate:'', endDate:'', courseId:0};
  classroom: Classroom;
  constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService) { }

  ngOnInit() {
    
  }

  addClassroom(){
    this.route.queryParams.subscribe(
      params => this.classroomData.courseId = (params['courseId']));
    this.classroomService.addClassroom(this.classroomData).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
     );
  }

}
