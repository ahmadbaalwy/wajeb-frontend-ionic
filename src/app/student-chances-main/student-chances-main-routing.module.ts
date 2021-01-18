import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentChancesMainPage } from './student-chances-main.page';

const routes: Routes = [
  {
    path: '',
    component: StudentChancesMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentChancesMainPageRoutingModule {}
