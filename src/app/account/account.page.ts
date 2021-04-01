import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loading: any;

  constructor(private loadingController: LoadingController,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  signOut(){
    this.authService.logoutUser().then(
      () => {
             this.router.navigate(['/']);
            }
          ,
          err => {
            console.log(err);
          }
         ); 
      }

  async backToHome(){
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();


    firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
      if (user) {
        if (user.email){
          this.profileService.getRole(user.email)
          .pipe(finalize(async() => { await this.loading.dismiss()}))
          .subscribe(
            data => {
              if(data=="teacher"){
                this.router.navigate(['/home']);
              }
              if(data=="student"){
                this.router.navigate(['/student-home']);
              }
            },
            err => {
              console.log(err);
            }
           );
        }
        if (user.phoneNumber){
          this.profileService.getRole(user.phoneNumber)
          .pipe(finalize(async() => { await this.loading.dismiss()}))
          .subscribe(
            data => {
              console.log(data);
              if(data=="teacher"){
                this.router.navigate(['/home']);
              }
              else if(data=="student"){
                this.router.navigate(['/student-home']);
              }
      
            },
            err => {
              console.log(err);
            }
           );
        }
       
      } else {
        this.loading.dismiss();
        console.log("no user");
      }
    });
  }

}
