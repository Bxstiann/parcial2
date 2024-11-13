import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesDictadasPage } from './clases-dictadas.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesDictadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesDictadasPageRoutingModule {}
