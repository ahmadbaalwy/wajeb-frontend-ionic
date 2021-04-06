import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewQuizzesPageRoutingModule } from './new-quizzes-routing.module';

import { NewQuizzesPage } from './new-quizzes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQuizzesPageRoutingModule
  ],
  declarations: [NewQuizzesPage]
})
export class NewQuizzesPageModule {}
