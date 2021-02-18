import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class Profile{
  id: number;
  username: string;
  role: string;
}

const API_URL = 'http://wajeb-project.el.r.appspot.com/api/profiles/';
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
    return this.http.post(API_URL + "setProfile", 
    newProfile,
    {headers: headers});
  }

  getRole(email: any): Observable<any>{
    let headers = new HttpHeaders().set('responseType', 'text');
    return this.http.get(API_URL + 'getRole', {responseType: 'text', headers: headers, params: {email: email}});
  }
}