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
      // Obtener todos los usuarios
      const usuarios = await this.usuariosService.obtenerUsuarios().toPromise();

      // Verificar que 'usuarios' no sea undefined o null
      if (!usuarios) {
        this.mostrarMensaje("No se pudieron obtener los usuarios");
        return;
      }

      // Buscar el usuario que tenga la contraseña actual
      const usuarioEncontrado = usuarios.find((u: { password: string }) => u.password === this.claveActual);

      if (!usuarioEncontrado) {
        this.mostrarMensaje("La contraseña actual es incorrecta");
        return;
      }

      if (this.nuevaClave !== this.confirmarClave) {
        this.mostrarMensaje("Las contraseñas no coinciden");
        return;
      }

      // Actualizar la contraseña del usuario en la base de datos
      this.usuariosService.actualizarContraseña(usuarioEncontrado.id, this.nuevaClave).subscribe(
        async () => {
          // Mostrar mensaje de éxito
          this.mostrarMensaje("Clave cambiada correctamente");
          this.claveActual = '';
          this.nuevaClave = '';
          this.confirmarClave = '';
        },
        async (error: HttpErrorResponse) => {
          // Mostrar mensaje de error en caso de fallo al actualizar
          console.error(error);
          this.mostrarMensaje("Error al cambiar la contraseña");
        }
      );
    } catch (error) {
      console.error(error);
      this.mostrarMensaje("Error inesperado");
    }
  }

  // Mostrar un mensaje tipo alerta
  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ["Ok"]
    });

    await alert.present();
  }

  ngOnInit() {}
}
