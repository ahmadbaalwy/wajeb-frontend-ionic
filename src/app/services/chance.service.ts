import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISODateString } from '@capacitor/core';
import { Observable } from 'rxjs';

export class Chance{
  id: number;
  username: string;
  status: string;
  update_date: Date;
  quizz_id: number;
  grade: number;
  grade_date: ISODateString;

}
const API_URL = 'http://wajeb-backend.azurewebsites.net/api/chances/';
const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ChanceService {

  constructor(private http: HttpClient) { }

  //get Student chances for a specific quizz
  getStudentChances(token: any, quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get(API_URL + 'getStudentChances', {responseType: 'json', params: {token: token, quizzId: quizzId}});

  }

  //get Student pending chances for a specific quizz
  getStudentPendingChances(token: any, quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get(API_URL + 'getStudentPendingChances', {responseType: 'json', params: {token: token, quizzId: quizzId}});

  }

  //get Student submitted chances for a specific quizz
  getStudentSubmittedChances(token: any, quizzId: any): Observable<any>{
    let headers = new HttpHeaders().append('responseType', 'json');
    return this.http.get<Chance>(API_URL + 'getStudentSubmittedChances', {responseType: 'json', params: {token: token, quizzId: quizzId}});

  }

  addChance(chanceData): Observable<any>{
    console.log(chanceData);
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "addChance", 
    chanceData,
    {headers: headers});
  }

  gradeChance(chanceId): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Chance>(API_URL + 'gradeChance',"", {params: {chanceId: chanceId}});
  }

  getQuizzId(chanceId): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(API_URL + 'getQuizzId', {responseType: 'json', params: {chanceId: chanceId}});

  }

  


}
