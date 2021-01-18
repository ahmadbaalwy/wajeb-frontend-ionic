import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzEditPageRoutingModule } from './quizz-edit-routing.module';

import { QuizzEditPage } from './quizz-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzEditPageRoutingModule
  ],
  declarations: [QuizzEditPage]
})
export class QuizzEditPageModule {}
