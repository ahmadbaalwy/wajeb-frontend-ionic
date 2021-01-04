import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomAddPage } from './classroom-add.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomAddPageRoutingModule {}
