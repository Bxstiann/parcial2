import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.page.html',
  styleUrls: ['./cambiarcontrasena.page.scss'],
})
export class CambiarcontrasenaPage implements OnInit {

  claveActual: string = "";
  nuevaClave: string = "";
  confirmarClave: string = "";

  constructor(
    private alertController: AlertController,
    private usuariosService: UsuariosService
  ) {}

  async onSubmit() {
    try {
      this.usuariosService.obtenerUsuarios().subscribe(
        (usuarios) => {
          console.log('Usuarios obtenidos:', usuarios);
          if (!usuarios || usuarios.length === 0) {
            this.mostrarMensaje("No se pudieron obtener los usuarios");
            return;
          }

          const usuarioEncontrado = usuarios.find((u: { password: string }) => u.password === this.claveActual);
          console.log('Usuario encontrado:', usuarioEncontrado);

          if (!usuarioEncontrado) {
            this.mostrarMensaje("La contraseña actual es incorrecta");
            return;
          }

          if (this.nuevaClave !== this.confirmarClave) {
            this.mostrarMensaje("Las contraseñas no coinciden");
            return;
          }

          // Agregar log para verificar la URL y los datos
          console.log(`Actualizando contraseña para el usuario con ID: ${usuarioEncontrado.id}`);
          console.log(`Datos: { password: ${this.nuevaClave} }`);

          this.usuariosService.actualizarContraseña(usuarioEncontrado.id, this.nuevaClave).subscribe(
            async (response) => {
              console.log('Contraseña actualizada con éxito', response);
              this.mostrarMensaje("Clave cambiada correctamente");
              this.claveActual = '';
              this.nuevaClave = '';
              this.confirmarClave = '';
            },
            (error: HttpErrorResponse) => {
              console.error('Error al cambiar la contraseña', error);
              this.mostrarMensaje("Error al cambiar la contraseña");
            }
          );
        },
        (error: HttpErrorResponse) => {
          console.error('Error al obtener los usuarios', error);
          this.mostrarMensaje("Error al obtener los usuarios");
        }
      );
    } catch (error) {
      console.error(error);
      this.mostrarMensaje("Error inesperado");
    }
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ["Ok"]
    });

    await alert.present();
  }

  ngOnInit() {}
}
