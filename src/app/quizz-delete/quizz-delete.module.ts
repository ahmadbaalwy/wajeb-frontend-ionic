import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzDeletePageRoutingModule } from './quizz-delete-routing.module';

import { QuizzDeletePage } from './quizz-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzDeletePageRoutingModule
  ],
  declarations: [QuizzDeletePage]
})
export class QuizzDeletePageModule {}
