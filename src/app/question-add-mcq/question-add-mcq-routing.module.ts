import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionAddMcqPage } from './question-add-mcq.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionAddMcqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAddMcqPageRoutingModule {}
