import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionTeacherPageRoutingModule } from './question-teacher-routing.module';

import { QuestionTeacherPage } from './question-teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionTeacherPageRoutingModule
  ],
  declarations: [QuestionTeacherPage]
})
export class QuestionTeacherPageModule {}
