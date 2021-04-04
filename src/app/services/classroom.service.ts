import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from '../services/quizz.service';
import { Enrollment } from './enrollment.service';
import { API_URL } from './chance-answer.service'

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
  college: string;
  department: string;
  branch: string;
  session: string;
  start_date: string;
  end_date: string;
}

//const API_URL = 'http://wajeb-project.el.r.appspot.com/api/';
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
    return this.http.post(API_URL + "classrooms/addClassroom", 
    classroomData,
    {headers: headers});
  }

  editClassroomGet(classroomId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Classroom>(API_URL + 'classrooms/editClassroom', {responseType: 'json', headers: headers, params: {classroomId: classroomId}});
  }

  editClassroomPost(classroomId: any, classroomData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "classrooms/editClassroom", 
    classroomData,
    {headers: headers, params: {classroomId: classroomId}});
  }

  deleteClassroom(classroomId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.delete(API_URL + 'classrooms/deleteClassroom', {headers: headers, params: {classroomId: classroomId}});
  }

  searchForClassroom(courseName: any, schoolName: any, username: any, teacherName: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<classroomSearch>(API_URL + 'classrooms/searchForClassroom', {responseType: 'json', headers: headers, params: {courseName: courseName, schoolName: schoolName, username: username, teacherName: teacherName}});

  }

}
