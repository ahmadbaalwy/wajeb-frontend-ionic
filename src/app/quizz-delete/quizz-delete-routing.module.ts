import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzDeletePage } from './quizz-delete.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzDeletePageRoutingModule {}
