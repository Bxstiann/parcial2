import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalUsers } from '../usuarios';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.page.html',
  styleUrls: ['./cambiarcontrasena.page.scss'],
})
export class CambiarcontrasenaPage implements OnInit {

  claveActual: string = "";
  nuevaClave: string = "";
  confirmarClave: string = "";

  constructor(private alertController: AlertController) { }

  async onSubmit() {
    const usuarioEncontrado = GlobalUsers.usuarios.find(u => u.password === this.claveActual);

    if (!usuarioEncontrado) {
      this.mostrarMensaje("La contraseña actual es incorrecta");
      return;
    }

    if (this.nuevaClave !== this.confirmarClave) {
      this.mostrarMensaje("Las contraseñas no coinciden");
      return;
    }


    usuarioEncontrado.password = this.nuevaClave;


    this.claveActual = '';
    this.nuevaClave = '';
    this.confirmarClave = '';

    this.mostrarMensaje("Clave cambiada correctamente");
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
