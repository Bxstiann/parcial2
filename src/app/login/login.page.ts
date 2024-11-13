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
  errorMessage: string = '';

  // Definir usuarios locales
  users = [
    {
      "id": "1",
      "username": "docente1",
      "password": "1234",
      "type": "docente",
      "nombre": "Juan Pérez",
      "email": "juan.perez@ejemplo.com"
    },
    {
      "id": "2",
      "username": "estudiante1",
      "password": "1234",
      "type": "estudiante",
      "nombre": "Ana López",
      "email": "ana.lopez@ejemplo.com"
    },
    {
      "id": "3",
      "username": "docente2",
      "password": "1234",
      "type": "docente",
      "nombre": "María González",
      "email": "maria.gonzalez@ejemplo.com"
    },
    {
      "id": "4",
      "username": "estudiante2",
      "password": "1234",
      "type": "estudiante",
      "nombre": "Carlos Romero",
      "email": "carlos.romero@ejemplo.com"
    }
  ];

  constructor(private router: Router, private toastController: ToastController) {}

  async onSubmit() {
    this.errorMessage = ''; // Reset error message before each submission

    if (!this.user || !this.pswd) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    // Buscar el usuario en el array de usuarios locales
    const foundUser = this.users.find((user) => user.username === this.user && user.password === this.pswd);

    if (foundUser) {
      // Guardar la información del usuario en el localStorage
      localStorage.setItem('userType', foundUser.type);
      localStorage.setItem('userName', foundUser.nombre);
      localStorage.setItem('userId', foundUser.id.toString());

      // Redirigir a la página principal
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
      // Mostrar mensaje de error
      this.presentErrorToast(this.errorMessage);
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
    // Lógica para restablecer la contraseña (puedes agregar tu propia funcionalidad)
  }
}
