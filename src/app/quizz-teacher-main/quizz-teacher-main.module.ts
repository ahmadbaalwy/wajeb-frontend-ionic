import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzTeacherMainPageRoutingModule } from './quizz-teacher-main-routing.module';

import { QuizzTeacherMainPage } from './quizz-teacher-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzTeacherMainPageRoutingModule
  ],
  declarations: [QuizzTeacherMainPage]
})
export class QuizzTeacherMainPageModule {}
