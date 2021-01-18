import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionAddTfPageRoutingModule } from './question-add-tf-routing.module';

import { QuestionAddTfPage } from './question-add-tf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionAddTfPageRoutingModule
  ],
  declarations: [QuestionAddTfPage]
})
export class QuestionAddTfPageModule {}
