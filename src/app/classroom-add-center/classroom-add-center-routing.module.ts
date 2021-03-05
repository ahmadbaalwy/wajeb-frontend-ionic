import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomAddCenterPage } from './classroom-add-center.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomAddCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomAddCenterPageRoutingModule {}
