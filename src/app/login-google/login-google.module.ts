import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginGooglePageRoutingModule } from './login-google-routing.module';

import { LoginGooglePage } from './login-google.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginGooglePageRoutingModule
  ],
  declarations: [LoginGooglePage]
})
export class LoginGooglePageModule {}
