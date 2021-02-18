import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://wajeb-project.el.r.appspot.com/api/chanceAnswers/';
const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChanceAnswerService {

  constructor(private http: HttpClient) { }

  addChanceAnswer(chanceId): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + 'newChanceAnswers',"", {params: {chanceId: chanceId}});
  }

  getChanceAnswerData(chanceId: any, questionId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get(API_URL + 'getChanceAnswerData', {responseType: 'json', params: {chanceId: chanceId, questionId: questionId}});

  }

  editChanceAnswer(chanceAnswerId, selected): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + 'editChanceAnswer',"", {params: {chanceAnswerId: chanceAnswerId, selected: selected}});
  }
}
