import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Enrollment{
  id: number;
  approval_date: Date;
  request_date: string;
  status: string;
  username: string;
  classroomId: number;
}

export class enrollmentDetails {
  status: string;
  enrollmentId: number;
  classroomId: number;
  classroom_name: string;
  school_name: string;
  course_name: string;
  full_name: string;
}

const API_URL = 'http://wajeb-backend.azurewebsites.net/api/enrollments/';
const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

  //get Student Enrollments
  getEnrollments(token: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<enrollmentDetails>(API_URL + 'getEnrollments', {responseType: 'json', params: {token: token}});

  }

  addEnrollment(enrollmentData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "addEnrollment", 
    enrollmentData,
    {headers: headers});
  }

  //get pending enrollments for a specific classroom
  getPendingEnrollments(classroomId){
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<enrollmentDetails>(API_URL + 'getPendingEnrollments', {responseType: 'json', params: {classroomId: classroomId}});
  }

  //get approved enrollments for a specific classroom
  getApprovedEnrollments(classroomId){
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<enrollmentDetails>(API_URL + 'getApprovedEnrollments', {responseType: 'json', params: {classroomId: classroomId}});
  }

  approvePendingEnrollment(enrollmentId){
    return this.http.post<enrollmentDetails>(API_URL + 'approvePendingEnrollment',"", {params: {enrollmentId: enrollmentId}});

  }
}
