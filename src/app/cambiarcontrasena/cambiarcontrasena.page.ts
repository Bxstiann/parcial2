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
      // Obtener el ID del usuario en sesión desde el localStorage
      let userId = localStorage.getItem('userId');
      if (!userId) {
        this.mostrarMensaje("No se pudo identificar al usuario actual");
        return;
      }

      console.log(`ID del usuario en sesión (antes de ajuste): ${userId}`);

      // Ajustar el ID restando 1 y convertirlo de nuevo a string (si es necesario)
      const adjustedId = (Number(userId) - 1).toString();
      userId = adjustedId;
      console.log(`ID ajustado: ${userId}`);

      // Obtener al usuario directamente por su ID
      this.usuariosService.obtenerUsuarioPorId(userId).subscribe(
        (usuario) => {
          console.log('Usuario encontrado:', usuario);

          if (!usuario) {
            this.mostrarMensaje("Usuario no encontrado");
            return;
          }

          // Verificar que la contraseña actual coincida
          if (usuario.password !== this.claveActual) {
            this.mostrarMensaje("La contraseña actual es incorrecta");
            return;
          }

          // Verificar que las nuevas contraseñas coincidan
          if (this.nuevaClave !== this.confirmarClave) {
            this.mostrarMensaje("Las contraseñas no coinciden");
            return;
          }

          // Actualizar la contraseña del usuario
          this.usuariosService.actualizarContraseña(userId, this.nuevaClave).subscribe(
            async () => {
              this.mostrarMensaje("Clave cambiada correctamente");
              // Limpiar los campos después de actualizar
              this.claveActual = '';
              this.nuevaClave = '';
              this.confirmarClave = '';
            },
            (error: HttpErrorResponse) => {
              console.error('Error al cambiar la contraseña:', error);
              this.mostrarMensaje("Error al cambiar la contraseña");
            }
          );
        },
        (error: HttpErrorResponse) => {
          console.error('Error al obtener el usuario:', error);
          this.mostrarMensaje("Error al obtener el usuario");
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
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
