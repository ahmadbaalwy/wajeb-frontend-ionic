import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzAddPage } from './quizz-add.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzAddPageRoutingModule {}
