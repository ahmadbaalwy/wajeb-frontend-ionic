import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question.service';
import { API_URL } from './chance-answer.service'


export class Quizz{
  id: number;
  quizzName: string;
  active: boolean;
  maxChances: number;
  grade: number;
  creationDate: Date;
  classroomId: number;
  questions: Question[];
}

//const API_URL = 'http://wajeb-project.el.r.appspot.com/api/';
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
    return this.http.post(API_URL + "quizzes/addQuizz", 
    quizzData,
    {headers: headers});
  }

  editQuizzGet(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Quizz>(API_URL + 'quizzes/editQuizz', {responseType: 'json', headers: headers, params: {quizzId: quizzId}});
  }

  editQuizzPost(quizzId: any, quizzData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "quizzes/editQuizz", 
    quizzData,
    {headers: headers, params: {quizzId: quizzId}});
  }

  deleteQuizz(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.delete(API_URL + 'quizzes/deleteQuizz', {headers: headers, params: {quizzId: quizzId}});
  }

  getMaxAllowedChances(quizzId): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(API_URL + 'quizzes/getMaxAllowedChances', {responseType: 'json', params: {quizzId: quizzId}});

  }

  getClassroomId(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Quizz>(API_URL + 'quizzes/getClassroomId', {responseType: 'json', headers: headers, params: {quizzId: quizzId}});
  }

  getMaxScore(quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Quizz>(API_URL + 'quizzes/getMaxScore', {responseType: 'json', headers: headers, params: {quizzId: quizzId}});
  
  }
}
