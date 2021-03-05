import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController, 
    private profileService: ProfileService,
    private loadingController: LoadingController
  ) {}

  @Input() credentials = {email:'', password:''}

  ngOnInit() {
  }

  async ionViewWillEnter(){
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
  
  async loginUser(credentials): Promise<void> {
    this.authService.loginUser(credentials.email, credentials.password).then(
      () => {
        this.profileService.getRole(this.credentials.email).subscribe(
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
        //this.router.navigateByUrl('home');
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await alert.present();
      }
    );
  }

  loginWithPhone() {
    this.router.navigate(['/login-phone']);

}

loginWithEmail() {
  this.router.navigate(['/login-email']);

}

loginWithGoogle() {
  this.router.navigate(['/login-google']);

}

  signupUser() {
    this.router.navigate(['/signup']);

}
}