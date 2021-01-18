import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentChancesContinuePage } from './student-chances-continue.page';

const routes: Routes = [
  {
    path: '',
    component: StudentChancesContinuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentChancesContinuePageRoutingModule {}
