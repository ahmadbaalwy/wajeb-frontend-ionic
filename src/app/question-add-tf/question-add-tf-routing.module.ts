import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionAddTfPage } from './question-add-tf.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionAddTfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAddTfPageRoutingModule {}
