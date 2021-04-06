import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewQuizzesPage } from './new-quizzes.page';

const routes: Routes = [
  {
    path: '',
    component: NewQuizzesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQuizzesPageRoutingModule {}
