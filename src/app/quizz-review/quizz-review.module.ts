import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzReviewPageRoutingModule } from './quizz-review-routing.module';

import { QuizzReviewPage } from './quizz-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzReviewPageRoutingModule
  ],
  declarations: [QuizzReviewPage]
})
export class QuizzReviewPageModule {}
