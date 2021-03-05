import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzAnswer } from './quizz-answer.service';
import { API_URL } from './chance-answer.service'


export class Question{
  id: number;
  type: string;
  sequence: number;
  score: number;
  text: string;
  quizzId: number;
  quizzAnswers: QuizzAnswer[]=[];
}

//const API_URL = 'http://wajeb-project.el.r.appspot.com/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  addQuestion(questionData): Observable<any>{
    //let headers = new HttpHeaders();
    //headers.append('Accept', 'application/json');
    //headers.append('Accept', 'multipart/form-data');

    return this.http.post(API_URL + "questions/addQuestion", 
    questionData,
    { observe: 'response' });
  }

  getQuestion(questionId): Observable<any>{
    return this.http.get<Question>(API_URL + 'questions/editQuestion', {responseType: 'json', params: {questionId: questionId}});
  }

  getQuizzId(questionId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get(API_URL + 'questions/getQuizzId', {responseType: 'json', headers: headers, params: {questionId: questionId}});
  }

  getQuestionPhoto(questionId): Observable<any>{
    return this.http.get(API_URL + 'questions/getQuestionPhoto', {responseType: 'json', params: {questionId: questionId}});

  }

}
