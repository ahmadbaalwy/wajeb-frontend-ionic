import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizzListPageRoutingModule } from './quizz-list-routing.module';

import { QuizzListPage } from './quizz-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizzListPageRoutingModule
  ],
  declarations: [QuizzListPage]
})
export class QuizzListPageModule {}
