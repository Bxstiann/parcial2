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
  showPassword: boolean = false; // Controlar la visibilidad de la contraseña

  constructor(private router: Router) {}

  onSubmit() {
    // Datos de ejemplo, reemplaza esto con tu lógica de autenticación real
    const users = [
      { id: 1, username: 'docente1', password: '1234', type: 'docente', nombre: 'Juan Pérez' },
      { id: 2, username: 'estudiante1', password: 'abcd', type: 'estudiante', nombre: 'Ana López' },
    ];

    const foundUser = users.find(
      (user) => user.username === this.user && user.password === this.pswd
    );

    if (foundUser) {
      // Guardar el tipo de usuario y el nombre en localStorage
      localStorage.setItem('userType', foundUser.type);
      localStorage.setItem('userName', foundUser.nombre); // Guardar el nombre
      // Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } else {
      // Manejar el error de inicio de sesión (ej. mostrar un mensaje)
      console.error('Credenciales incorrectas');
      // Aquí puedes agregar un mensaje de error para mostrar en el frontend
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword; // Cambiar el estado de la visibilidad
  }

  restablecerContrasena() {
    // Lógica para restablecer la contraseña
  }
}
