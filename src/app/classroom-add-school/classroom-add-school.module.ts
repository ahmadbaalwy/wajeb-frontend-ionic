import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomAddSchoolPageRoutingModule } from './classroom-add-school-routing.module';

import { ClassroomAddSchoolPage } from './classroom-add-school.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomAddSchoolPageRoutingModule
  ],
  declarations: [ClassroomAddSchoolPage]
})
export class ClassroomAddSchoolPageModule {}
