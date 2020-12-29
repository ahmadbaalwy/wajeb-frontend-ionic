import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDeletePageRoutingModule } from './course-delete-routing.module';

import { CourseDeletePage } from './course-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDeletePageRoutingModule
  ],
  declarations: [CourseDeletePage]
})
export class CourseDeletePageModule {}
