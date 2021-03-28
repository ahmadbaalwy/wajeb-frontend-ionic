import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.page.html',
  styleUrls: ['./login-phone.page.scss'],
})
export class LoginPhonePage implements OnInit {
  loading: any;
  codeSent: boolean = false;
  windowRef:any;
prefix:any = '+967';
line:any;
code:any;
  buttonDisabled: boolean;

  constructor(
    public windowService: WindowService,
    private profileService : ProfileService,
    public router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    //firebase.auth().useDeviceLanguage();
    firebase.auth().languageCode = 'ar';

  }

  //Initiate windowRef from WindowService
  async ionViewWillEnter(){
    this.buttonDisabled = false;
    this.windowRef=await this.windowService.windowRef;
    this.windowRef.recaptchaVerifier= await new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //this.sendLoginCode();
      }
    });
  /*this.windowRef=await this.windowService.windowRef;
  this.windowRef.recaptchaVerifier=await new firebase.auth.RecaptchaVerifier('recaptcha-container');
  await this.windowRef.recaptchaVerifier.render()*/
}

async sendLoginCode(){
  this.loading = await this.loadingController.create({
    cssClass: 'loading-class',
    message: 'الرجاء الانتظار...',
    
  });
  await this.loading.present();
  //Make sure phone number in e164 format
     const num=this.prefix.toString() + this.line.toString();
     const appVerifier=this.windowRef.recaptchaVerifier;
     this.buttonDisabled = true;
     firebase
  .auth()
  .signInWithPhoneNumber(num, appVerifier)
  
  .then(result => {
    this.codeSent = true;
    this.windowRef.confirmationResult = result;
    this.loading.dismiss();
    //var code = window.prompt("Please enter your code");
    //return confirmationResult.confirm(code);
  }
  )
  .catch(error => {
    this.loading.dismiss();
    this.buttonDisabled = false;
    this.codeSent = false;
  }
  
    )
}

async verifyCode(){
  var that= this;
  this.loading = await this.loadingController.create({
    cssClass: 'loading-class',
    message: 'الرجاء الانتظار...',
    
  });
  await this.loading.present();

  this.windowRef.confirmationResult.confirm(this.code)
  .then(result => {
    // User is signed in now.
    console.log(result.user.phoneNumber)
    this.profileService.getRole(result.user.phoneNumber)
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
        else{
          this.router.navigate(['/signup-phone'], {queryParams: {phone: result.user.phoneNumber} });
        }

      },
      err => {
        
        console.log(err);
      }
     );
  })
  .catch(function(error) {
        that.loading.dismiss();
        alert(error);
        that.router.navigate(['/login']);
    console.log("error", error);
  });
}
  /*.then(result => {
    // User is signed in now.
    console.log(result.user.phoneNumber)
    this.profileService.getRole(result.user.phoneNumber).subscribe(
      data => {
        console.log(data);
        if(data=="teacher"){
          this.router.navigate(['/home']);
        }
        else if(data=="student"){
          this.router.navigate(['/student-home']);
        }
        else{
          this.router.navigate(['/signup-phone'], {queryParams: {phone: result.user.phoneNumber} });
        }

      },
      err => {
        console.log(err);
      }
     );
  })
  .catch(function(error) {
    console.log("error", error);
  });
}*/

  /*verifyCode(){
    this.windowRef.confirmationResult.confirm(this.verifCode)
    .then(async result=>{
     alert(result.user);
     //If the result is successful...
    })
    .catch(err=>{
     console.log('err2',err)
    });
  }*/

  goHome(){
    this.router.navigate(['/login']);
  }

}
