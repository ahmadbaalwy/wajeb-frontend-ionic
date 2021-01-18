import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherEnrollmentsApprovedPage } from './teacher-enrollments-approved.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherEnrollmentsApprovedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherEnrollmentsApprovedPageRoutingModule {}
