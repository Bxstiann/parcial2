import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAsistenciasPage } from './registrar-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarAsistenciasPageRoutingModule {}
