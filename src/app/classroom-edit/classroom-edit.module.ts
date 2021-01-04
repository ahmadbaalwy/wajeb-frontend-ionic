import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomEditPageRoutingModule } from './classroom-edit-routing.module';

import { ClassroomEditPage } from './classroom-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomEditPageRoutingModule
  ],
  declarations: [ClassroomEditPage]
})
export class ClassroomEditPageModule {}
