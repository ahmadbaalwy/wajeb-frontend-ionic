import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomStudentMainPageRoutingModule } from './classroom-student-main-routing.module';

import { ClassroomStudentMainPage } from './classroom-student-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomStudentMainPageRoutingModule
  ],
  declarations: [ClassroomStudentMainPage]
})
export class ClassroomStudentMainPageModule {}
