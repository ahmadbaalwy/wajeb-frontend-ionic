import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomTeacherMainPageRoutingModule } from './classroom-teacher-main-routing.module';

import { ClassroomTeacherMainPage } from './classroom-teacher-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomTeacherMainPageRoutingModule
  ],
  declarations: [ClassroomTeacherMainPage]
})
export class ClassroomTeacherMainPageModule {}
