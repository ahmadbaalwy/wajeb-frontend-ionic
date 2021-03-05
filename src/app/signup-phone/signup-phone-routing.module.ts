import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPhonePage } from './signup-phone.page';

const routes: Routes = [
  {
    path: '',
    component: SignupPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPhonePageRoutingModule {}
