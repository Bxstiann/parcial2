import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarcontrasenaPage } from './cambiarcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarcontrasenaPageRoutingModule {}
