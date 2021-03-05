import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './chance-answer.service'


export interface Course {
  id: number;
  courseName: string;
  user: String;
  classrooms: Classroom[];
}

export interface Classroom {
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




//const API_URL = 'http://wajeb-project.el.r.appspot.com/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses = [];
  classrooms = [];

  constructor(private http: HttpClient) { }

  getCourses(token: any): Observable<any>{
    let params = new HttpParams().set("token",token);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    
    return this.http.get<Course>(API_URL + 'courses/myCourses', {headers: headers, params: params});
  }

  addCourse(course: any): Observable<any>{
    return this.http.post(API_URL + "courses/addCourse", course, httpOptions);
  }

  editCourseGet(token: any, courseId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Course>(API_URL + 'courses/editCourse', {responseType: 'json', headers: headers, params: {token: token, courseId: courseId}});
  }
  editCoursePost(token: any, courseId: any, courseName: any): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "courses/editCourse", {responseType: 'json'}, {headers: headers, params: {token: token, courseId: courseId, courseName: courseName}});
  }

  deleteCourse(token: any, courseId: any): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "courses/deleteCourse", {responseType: 'json'}, {headers: headers, params: {token: token, courseId: courseId}});
  }

}