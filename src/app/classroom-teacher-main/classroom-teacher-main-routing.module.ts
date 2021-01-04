import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomTeacherMainPage } from './classroom-teacher-main.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomTeacherMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomTeacherMainPageRoutingModule {}
