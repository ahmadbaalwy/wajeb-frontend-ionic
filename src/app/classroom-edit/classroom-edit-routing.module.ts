import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomEditPage } from './classroom-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomEditPageRoutingModule {}
