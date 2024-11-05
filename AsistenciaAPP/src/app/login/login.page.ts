import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: string = '';
  pswd: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Lógica para autenticación (esto es solo un ejemplo, usa tu propio método de autenticación)
    const users = [
      { username: 'docente1', password: '1234', type: 'docente' },
      { username: 'estudiante1', password: 'abcd', type: 'estudiante' },
    ];

    const foundUser = users.find(
      (user) => user.username === this.user && user.password === this.pswd
    );

    if (foundUser) {
      // Guardar el tipo de usuario en localStorage
      localStorage.setItem('userType', foundUser.type);
      // Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } else {
      // Manejar el error de inicio de sesión (ej. mostrar un mensaje)
      console.error('Credenciales incorrectas');
      // Aquí puedes agregar un mensaje de error para mostrar en el frontend
    }
  }

  restablecerContrasena() {
    // Lógica para restablecer la contraseña
  }
}
