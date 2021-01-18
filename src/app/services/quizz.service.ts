import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question.service';

export class Quizz{
  id: number;
  quizzName: string;
  active: boolean;
  maxChances: number;
  grade: number;
  classroomId: number;
  questions: Question[];
}

const API_URL = 'http://wajeb-backend.azurewebsites.net/api/quizzes/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor(private http: HttpClient) { }

  addQuizz(quizzData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "addQuizz", 
    quizzData,
    {headers: headers});
  }

  editQuizzGet(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Quizz>(API_URL + 'editQuizz', {responseType: 'json', headers: headers, params: {quizzId: quizzId}});
  }

  editQuizzPost(quizzId: any, quizzData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "editQuizz", 
    quizzData,
    {headers: headers, params: {quizzId: quizzId}});
  }

  deleteQuizz(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.delete(API_URL + 'deleteQuizz', {headers: headers, params: {quizzId: quizzId}});
  }

  getMaxAllowedChances(quizzId): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(API_URL + 'getMaxAllowedChances', {responseType: 'json', params: {quizzId: quizzId}});

  }

  getClassroomId(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Quizz>(API_URL + 'getClassroomId', {responseType: 'json', headers: headers, params: {quizzId: quizzId}});
  }
}
