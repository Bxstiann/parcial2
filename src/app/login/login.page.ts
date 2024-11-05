import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: string = '';
  pswd: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private toastController: ToastController) {}

  async onSubmit() {
    if (!this.user || !this.pswd) {
      await this.presentErrorToast('Por favor, complete todos los campos.');
      return;
    }

    // Obtener usuarios del JSON Server
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    // Encontrar el usuario
    const foundUser = users.find((user: any) => user.username === this.user && user.password === this.pswd);

    if (foundUser) {
      localStorage.setItem('userType', foundUser.type);
      localStorage.setItem('userName', foundUser.nombre);
      localStorage.setItem('userId', foundUser.id.toString());
      this.router.navigate(['/home']);
    } else {
      await this.presentErrorToast('Usuario o contraseña incorrectos.');
    }
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  restablecerContrasena() {
    // Lógica para restablecer la contraseña
  }
}
