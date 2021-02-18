import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from '../services/quizz.service';
import { Enrollment } from './enrollment.service';
//import { Classroom } from '../services/course.service';

export class Classroom {
  id: number;
  classroomName: string;
  private: boolean;
  active: boolean;
  schoolname: String;
  category: String;
  startDate: Date;
  endDate: Date;
  courseId: number;
  quizzes: Quizz[];
  enrollments: Enrollment[];
}

export class classroomSearch {
  courseId: number;
  course_name: string;
  classroomId: number;
  classroom_name: string;
  school_name: string;
  full_name: string;
  status: string;
}



const API_URL = 'http://wajeb-project.el.r.appspot.com/api/classrooms/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ClassroomService {

  constructor(private http: HttpClient) { }

  addClassroom(classroomData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "addClassroom", 
    classroomData,
    {headers: headers});
  }

  editClassroomGet(classroomId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Classroom>(API_URL + 'editClassroom', {responseType: 'json', headers: headers, params: {classroomId: classroomId}});
  }

  editClassroomPost(classroomId: any, classroomData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "editClassroom", 
    classroomData,
    {headers: headers, params: {classroomId: classroomId}});
  }

  deleteClassroom(classroomId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.delete(API_URL + 'deleteClassroom', {headers: headers, params: {classroomId: classroomId}});
  }

  searchForClassroom(courseName: any, schoolName: any, username: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<classroomSearch>(API_URL + 'searchForClassroom', {responseType: 'json', headers: headers, params: {courseName: courseName, schoolName: schoolName, username: username}});

  }

}
