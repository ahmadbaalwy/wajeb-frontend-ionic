import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentClassroomSearchPageRoutingModule } from './student-classroom-search-routing.module';

import { StudentClassroomSearchPage } from './student-classroom-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentClassroomSearchPageRoutingModule
  ],
  declarations: [StudentClassroomSearchPage]
})
export class StudentClassroomSearchPageModule {}
