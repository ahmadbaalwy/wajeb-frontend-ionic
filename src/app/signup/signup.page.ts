import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @Input() credentials = {fullName:'', email:'', password:'', role:''}
  constructor(private authService: AuthService, private router:Router, private alertCtrl: AlertController, private profileService: ProfileService) { }

  ngOnInit() {
  }

  roleSelected(event){
    this.credentials.role=event.detail.value;
  }

  async signupUser(credentials): Promise<void> {
    this.authService.signupUser(credentials.email, credentials.password).then(
      () => {
        this.profileService.setProfile(this.credentials).subscribe(
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
