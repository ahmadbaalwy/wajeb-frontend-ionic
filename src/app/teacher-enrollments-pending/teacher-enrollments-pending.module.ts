import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherEnrollmentsPendingPageRoutingModule } from './teacher-enrollments-pending-routing.module';

import { TeacherEnrollmentsPendingPage } from './teacher-enrollments-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherEnrollmentsPendingPageRoutingModule
  ],
  declarations: [TeacherEnrollmentsPendingPage]
})
export class TeacherEnrollmentsPendingPageModule {}
