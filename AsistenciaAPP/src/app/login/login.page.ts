import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalUsers } from '../usuarios'; // Importar el array global

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  user: string = "";
  pswd: string = "";

  constructor(
    private alertController: AlertController, 
    private router: Router
  ) { }

  // Lógica de inicio de sesión
  async onSubmit() {
    const usuarioEncontrado = GlobalUsers.usuarios.find(u => u.username === this.user && u.password === this.pswd);

    if (usuarioEncontrado) {
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión Exitoso',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos, intente nuevamente.',
        buttons: ['Ok']
      });

      await alert.present();
    }
  }

  // Función de restablecer contraseña
  async restablecerContrasena() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      inputs: [
        {
          name: 'user',
          type: 'text',
          placeholder: 'Nombre de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Restablecer',
          handler: (data) => {
            const usuarioEncontrado = GlobalUsers.usuarios.find(u => u.username === data.user);

            if (usuarioEncontrado) {
              this.enviarMensaje(data.user);
            } else {
              this.mostrarMensaje("Usuario no encontrado");
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  async enviarMensaje(user: string) {
    const mensaje = `Se ha enviado un mail al correo asociado al usuario: ${user}`;
    await this.mostrarMensaje(mensaje);
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: "Notificación",
      message: mensaje,
      buttons: ["Ok"]
    });

    await alert.present();
  }
}
