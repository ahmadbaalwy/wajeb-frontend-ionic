import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController, 
    private profileService: ProfileService
  ) {}

  @Input() credentials = {email:'', password:''}

  ngOnInit() {
  }
  
  async loginUser(credentials): Promise<void> {
    this.authService.loginUser(credentials.email, credentials.password).then(
      () => {
        this.profileService.getRole(this.credentials.email).subscribe(
          data => {
            alert(data);
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

  signupUser() {
    this.router.navigate(['/signup']);

}
}