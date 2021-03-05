import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  loading: any;
  @Input() credentials = {fullName:'', email:'', password:'', role:''}
  constructor(private authService: AuthService, private router:Router, private alertCtrl: AlertController, 
    private profileService: ProfileService,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  roleSelected(event){
    this.credentials.role=event.detail.value;
  }

  async signupUser(credentials): Promise<void> {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'الرجاء الانتظار...',
      
    });
    await this.loading.present();

    this.authService.signupUser(credentials.email, credentials.password).then(
      () => {
        this.profileService.setProfile(this.credentials)
        .pipe(finalize(async() => { await this.loading.dismiss()}))
        .subscribe(
          data => {
            if(this.credentials.role=="teacher"){
              this.router.navigate(['/home']);
            }
            if(this.credentials.role=="student"){
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

  cancel(){
    this.router.navigate(['/']);

  }


}
