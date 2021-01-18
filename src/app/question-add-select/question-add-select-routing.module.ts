import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionAddSelectPage } from './question-add-select.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionAddSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAddSelectPageRoutingModule {}
