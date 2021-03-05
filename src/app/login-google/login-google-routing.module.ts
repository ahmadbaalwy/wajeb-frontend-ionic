import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGooglePage } from './login-google.page';

const routes: Routes = [
  {
    path: '',
    component: LoginGooglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginGooglePageRoutingModule {}
