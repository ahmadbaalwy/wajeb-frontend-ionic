import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomStudentMainPage } from './classroom-student-main.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomStudentMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomStudentMainPageRoutingModule {}
