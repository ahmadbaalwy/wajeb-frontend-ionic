import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherEnrollmentsPendingPage } from './teacher-enrollments-pending.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherEnrollmentsPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherEnrollmentsPendingPageRoutingModule {}
