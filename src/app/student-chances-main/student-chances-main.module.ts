import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentChancesMainPageRoutingModule } from './student-chances-main-routing.module';

import { StudentChancesMainPage } from './student-chances-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentChancesMainPageRoutingModule
  ],
  declarations: [StudentChancesMainPage]
})
export class StudentChancesMainPageModule {}
