import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./asistencias/asistencias.module').then( m => m.AsistenciasPageModule)
  },
  {
    path: 'cambiar_contrasena',
    loadChildren: () => import('./cambiarcontrasena/cambiarcontrasena.module').then( m => m.CambiarcontrasenaPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'mis_asignaturas',
    loadChildren: () => import('./mis-asignaturas/mis-asignaturas.module').then( m => m.MisAsignaturasPageModule)
  },
  {
    path: 'registrar_asistencias',
    loadChildren: () => import('./registrar-asistencias/registrar-asistencias.module').then( m => m.RegistrarAsistenciasPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
