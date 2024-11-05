import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userType: string | null = null;
  userName: string | null = null; // Para almacenar el nombre del usuario

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    // Obtén el tipo de usuario y el nombre desde localStorage
    this.userType = localStorage.getItem('userType');
    this.userName = localStorage.getItem('userName'); // Obtener el nombre

    // Redirigir al login si no hay tipo de usuario
    if (!this.userType) {
      this.router.navigate(['/login']);
    } else {
      this.presentWelcomeToast(); // Mostrar el mensaje de bienvenida
    }
  }

  async presentWelcomeToast() {
    const toast = await this.toastController.create({
      message: `Bienvenido, ${this.userName}!`, // Mensaje de bienvenida
      duration: 2000, // Duración en milisegundos
      position: 'bottom', // Posición del toast
      color: 'tertiary', // Color del toast
    });
    await toast.present(); // Presentar el toast
  }

  logout() {
    // Limpiar el localStorage y redirigir al login
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
