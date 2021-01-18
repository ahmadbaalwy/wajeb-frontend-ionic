import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzEditPage } from './quizz-edit.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzEditPageRoutingModule {}
