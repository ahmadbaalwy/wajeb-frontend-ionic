import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {
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
  
  async loginUser(credentials): Promise<void> {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.authService.loginUser(credentials.email, credentials.password).then(
      () => {
        if (!this.credentials.email){
          //alert(null);
          this.loading.dismiss();
        }
        this.profileService.getRole(this.credentials.email)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            if(data==="teacher"){
              this.router.navigate(['/home']);
            }
            if(data==="student"){
              this.router.navigate(['/student-home']);
            }
          },
          err => {
            alert(err.message);
            console.log(err);
          }
         );
        //this.router.navigateByUrl('home');
      },
      async error => {
        this.loading.dismiss();
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

  signupUser() {
    this.router.navigate(['/signup']);

}

goHome(){
  this.router.navigate(['/login']);
}

}