import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import firebase from 'firebase';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.page.html',
  styleUrls: ['./login-google.page.scss'],
})
export class LoginGooglePage implements OnInit {
  userProfile: any = null;
  constructor(private profileService: ProfileService,
    private router: Router,
    private googlePlus: GooglePlus) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.googlePlus.login({
      'webClientId': '838923708654-4nj7puc337r343c3t9qv6nv4ad5fors0.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
            const googleCredential = firebase.auth.GoogleAuthProvider
                .credential(res.idToken);
   
            firebase.auth().signInWithCredential(googleCredential)
          .then( response => {
            this.profileService.getRole(response.user.email).subscribe(
              data => {
                console.log(data);
                if(data=="teacher"){
                  this.router.navigate(['/home']);
                }
                else if(data=="student"){
                  this.router.navigate(['/student-home']);
                }
                else{
                  this.router.navigate(['/signup-google'], {queryParams: {email: response.user.email} });
                }
        
          });
    }, err => {
        console.error("Error: ", err)
    
    });

  });
  
}

}