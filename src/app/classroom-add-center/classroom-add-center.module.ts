import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomAddCenterPageRoutingModule } from './classroom-add-center-routing.module';

import { ClassroomAddCenterPage } from './classroom-add-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomAddCenterPageRoutingModule
  ],
  declarations: [ClassroomAddCenterPage]
})
export class ClassroomAddCenterPageModule {}
