import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzReviewPage } from './quizz-review.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzReviewPageRoutingModule {}
