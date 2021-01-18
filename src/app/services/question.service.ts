import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzAnswer } from './quizz-answer.service';

export class Question{
  id: number;
  type: string;
  sequence: number;
  score: number;
  text: string;
  quizzId: number;
  quizzAnswers: QuizzAnswer[]=[];
}

const API_URL = 'http://wajeb-backend.azurewebsites.net/api/questions/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  addQuestion(questionData): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "addQuestion", 
    questionData,
    {headers: headers});
  }

}
