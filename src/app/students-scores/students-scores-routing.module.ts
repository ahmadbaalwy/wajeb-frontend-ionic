import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsScoresPage } from './students-scores.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsScoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsScoresPageRoutingModule {}
