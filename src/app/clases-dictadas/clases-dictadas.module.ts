import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesDictadasPageRoutingModule } from './clases-dictadas-routing.module';

import { ClasesDictadasPage } from './clases-dictadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesDictadasPageRoutingModule
  ],
  declarations: [ClasesDictadasPage]
})
export class ClasesDictadasPageModule {}
