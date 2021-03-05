import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPhonePageRoutingModule } from './signup-phone-routing.module';

import { SignupPhonePage } from './signup-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPhonePageRoutingModule
  ],
  declarations: [SignupPhonePage]
})
export class SignupPhonePageModule {}
