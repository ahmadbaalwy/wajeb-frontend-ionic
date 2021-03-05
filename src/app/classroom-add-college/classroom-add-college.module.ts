import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomAddCollegePageRoutingModule } from './classroom-add-college-routing.module';

import { ClassroomAddCollegePage } from './classroom-add-college.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomAddCollegePageRoutingModule
  ],
  declarations: [ClassroomAddCollegePage]
})
export class ClassroomAddCollegePageModule {}
