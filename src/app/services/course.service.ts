import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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


const API_URL = 'http://192.168.1.35:9000/api/courses/';
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

    let headers = new HttpHeaders().append('responseType', 'text');
    
    return this.http.get<Course>(API_URL + 'myCourses', {params: params,});
  }

  addCourse(course: any): Observable<any>{
    return this.http.post(API_URL + "addCourse", course, httpOptions);
  }

  editCourseGet(token: any, courseId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Course>(API_URL + 'editCourse', {responseType: 'json', headers: headers, params: {token: token, courseId: courseId}});
  }
  editCoursePost(token: any, courseId: any, courseName: any): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "editCourse", {responseType: 'json'}, {headers: headers, params: {token: token, courseId: courseId, courseName: courseName}});
  }

  deleteCourse(token: any, courseId: any): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "deleteCourse", {responseType: 'json'}, {headers: headers, params: {token: token, courseId: courseId}});
  }

}