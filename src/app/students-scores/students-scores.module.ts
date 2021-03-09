import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsScoresPageRoutingModule } from './students-scores-routing.module';

import { StudentsScoresPage } from './students-scores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsScoresPageRoutingModule
  ],
  declarations: [StudentsScoresPage]
})
export class StudentsScoresPageModule {}
