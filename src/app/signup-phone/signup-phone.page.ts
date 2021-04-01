import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LoginPhonePage } from '../login-phone/login-phone.page';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-signup-phone',
  templateUrl: './signup-phone.page.html',
  styleUrls: ['./signup-phone.page.scss'],
})
export class SignupPhonePage implements OnInit {
  loading: any;
  @Input() credentials = {fullName:'', email:'', role:'student'}

  constructor(private authService: AuthService, private router:Router, private alertCtrl: AlertController, 
  private profileService: ProfileService,
  private route:ActivatedRoute,
  private loadingController: LoadingController  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.credentials.email = (params['phone']));
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
  }

  cancel(){
    this.router.navigate(['/']);

  }

}
