import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}

const API_URL = 'http://192.168.1.35:9000/api/classrooms/';
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

}
