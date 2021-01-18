import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzListPage } from './quizz-list.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzListPageRoutingModule {}
