import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentClassroomSearchPage } from './student-classroom-search.page';

const routes: Routes = [
  {
    path: '',
    component: StudentClassroomSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentClassroomSearchPageRoutingModule {}
