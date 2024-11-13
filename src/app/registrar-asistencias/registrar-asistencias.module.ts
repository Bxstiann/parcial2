import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAsistenciasPageRoutingModule } from './registrar-asistencias-routing.module';

import { RegistrarAsistenciasPage } from './registrar-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistenciasPageRoutingModule
  ],
  declarations: [RegistrarAsistenciasPage]
})
export class RegistrarAsistenciasPageModule {}
