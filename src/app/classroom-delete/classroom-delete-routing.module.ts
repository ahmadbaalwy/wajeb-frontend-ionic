import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomDeletePage } from './classroom-delete.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomDeletePageRoutingModule {}
