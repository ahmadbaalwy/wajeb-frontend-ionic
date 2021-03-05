import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './chance-answer.service'


export class Profile{
  id: number;
  username: string;
  role: string;
}

//const API_URL = 'http://wajeb-project.el.r.appspot.com/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  setProfile(newProfile): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(API_URL + "profiles/setProfile", 
    newProfile,
    {headers: headers});
  }

  getRole(email: any): Observable<any>{
    let headers = new HttpHeaders().set('responseType', 'text');
    return this.http.get(API_URL + 'profiles/getRole', {responseType: 'text', headers: headers, params: {email: email}});
  }

  getFullName(email: any): Observable<any>{
    let headers = new HttpHeaders().set('responseType', 'text');
    return this.http.get(API_URL + 'profiles/getFullName', {responseType: 'text', headers: headers, params: {email: email}});
  }
}