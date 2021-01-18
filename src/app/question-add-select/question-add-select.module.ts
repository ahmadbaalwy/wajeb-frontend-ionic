import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionAddSelectPageRoutingModule } from './question-add-select-routing.module';

import { QuestionAddSelectPage } from './question-add-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionAddSelectPageRoutingModule
  ],
  declarations: [QuestionAddSelectPage]
})
export class QuestionAddSelectPageModule {}
