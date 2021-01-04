import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomDeletePageRoutingModule } from './classroom-delete-routing.module';

import { ClassroomDeletePage } from './classroom-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomDeletePageRoutingModule
  ],
  declarations: [ClassroomDeletePage]
})
export class ClassroomDeletePageModule {}
