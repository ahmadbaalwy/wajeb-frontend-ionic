import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseDeletePage } from './course-delete.page';

const routes: Routes = [
  {
    path: '',
    component: CourseDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseDeletePageRoutingModule {}
