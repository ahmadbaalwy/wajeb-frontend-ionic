import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentChancesContinuePageRoutingModule } from './student-chances-continue-routing.module';

import { StudentChancesContinuePage } from './student-chances-continue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentChancesContinuePageRoutingModule
  ],
  declarations: [StudentChancesContinuePage]
})
export class StudentChancesContinuePageModule {}
