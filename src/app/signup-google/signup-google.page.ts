import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-signup-google',
  templateUrl: './signup-google.page.html',
  styleUrls: ['./signup-google.page.scss'],
})
export class SignupGooglePage implements OnInit {
  loading: any;
  @Input() credentials = {fullName:'', email:'', role:''}
  constructor(private route: ActivatedRoute, 
    private profileService: ProfileService,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.credentials.email = (params['email']));
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
