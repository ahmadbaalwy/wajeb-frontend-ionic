import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzAddPageRoutingModule } from './quizz-add-routing.module';

import { QuizzAddPage } from './quizz-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzAddPageRoutingModule
  ],
  declarations: [QuizzAddPage]
})
export class QuizzAddPageModule {}
