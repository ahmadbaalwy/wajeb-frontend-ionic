import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class QuizzAnswer{
  id: number;
  text: string;
  correct: boolean;
  sequence: number;
  questionId: number;
}

const API_URL = 'http://wajeb-backend.azurewebsites.net/api/quizzAnswers/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class quizzAnswerService {

  constructor(private http: HttpClient) { }

  addQuizzAnswer(quizzAnswerData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "addQuizzAnswer", 
    quizzAnswerData,
    {headers: headers});
  }

}
