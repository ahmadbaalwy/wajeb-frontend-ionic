import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupGooglePageRoutingModule } from './signup-google-routing.module';

import { SignupGooglePage } from './signup-google.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupGooglePageRoutingModule
  ],
  declarations: [SignupGooglePage]
})
export class SignupGooglePageModule {}
