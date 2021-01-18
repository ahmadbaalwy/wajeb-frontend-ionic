import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionAddMcqPageRoutingModule } from './question-add-mcq-routing.module';

import { QuestionAddMcqPage } from './question-add-mcq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionAddMcqPageRoutingModule
  ],
  declarations: [QuestionAddMcqPage]
})
export class QuestionAddMcqPageModule {}
