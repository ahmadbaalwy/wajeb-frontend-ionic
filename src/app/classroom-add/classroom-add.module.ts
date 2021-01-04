import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassroomAddPageRoutingModule } from './classroom-add-routing.module';

import { ClassroomAddPage } from './classroom-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassroomAddPageRoutingModule
  ],
  declarations: [ClassroomAddPage]
})
export class ClassroomAddPageModule {}
