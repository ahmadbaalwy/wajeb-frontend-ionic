import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzTeacherMainPage } from './quizz-teacher-main.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzTeacherMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzTeacherMainPageRoutingModule {}
