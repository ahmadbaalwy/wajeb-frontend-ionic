import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  @Input() credentials = {email:'', password:''}

  ngOnInit() {
  }
  
  async loginUser(credentials): Promise<void> {
    this.authService.loginUser(credentials.email, credentials.password).then(
      () => {
        this.router.navigateByUrl('home');
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

  async signupUser(credentials): Promise<void> {
    this.authService.signupUser(credentials.email, credentials.password).then(
      () => {
        
        this.router.navigateByUrl('home');
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

}
