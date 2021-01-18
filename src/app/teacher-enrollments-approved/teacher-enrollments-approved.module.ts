import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherEnrollmentsApprovedPageRoutingModule } from './teacher-enrollments-approved-routing.module';

import { TeacherEnrollmentsApprovedPage } from './teacher-enrollments-approved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherEnrollmentsApprovedPageRoutingModule
  ],
  declarations: [TeacherEnrollmentsApprovedPage]
})
export class TeacherEnrollmentsApprovedPageModule {}
