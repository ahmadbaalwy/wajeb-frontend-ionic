import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string;
   //userId: any;
  constructor() { 
    //var userId: String;
    
  }
  
  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }

  async getCurrentUserToken(email: String): Promise<void>{
     firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.userId = user.uid;
        //alert(this.userId);
      }
    });
  }

}
