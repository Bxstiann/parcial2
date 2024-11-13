import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../servicios/login.service'; // Asegúrate de importar el servicio

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

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService // Inyectamos el servicio
  ) {}

  async onSubmit() {
    this.errorMessage = ''; // Reset error message before each submission

    if (!this.user || !this.pswd) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    // Llamamos al servicio para obtener los usuarios
    this.loginService.getUsers().subscribe(
      (users) => {
        // Buscar el usuario con las credenciales proporcionadas
        const foundUser = users.find((user) => user.username === this.user && user.password === this.pswd);

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
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.errorMessage = 'Hubo un error al conectar con el servidor.';
        this.presentErrorToast(this.errorMessage);
      }
    );
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
