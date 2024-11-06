import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {
  userId: string | null = null;
  userType: string | null = null;
  asignaturas: any[] = []; // Array para almacenar todas las asignaturas
  userAsignaturas: any[] = []; // Array para almacenar las asignaturas filtradas por usuario

  constructor(
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.userId = localStorage.getItem('userId');

    if (!this.userType || !this.userId) {
      this.router.navigate(['/login']); // Si no hay un usuario logueado, redirigir al login
    } else {
      this.loadAsignaturas(); // Cargar asignaturas solo si hay un usuario logueado
    }
  }

  // Cargar todas las asignaturas desde el servidor (JSON Server o base de datos)
  loadAsignaturas() {
    this.http.get<any[]>('http://localhost:3000/asignaturas').subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas; // Guardar todas las asignaturas
        this.filterUserAsignaturas(); // Filtrar asignaturas para el usuario
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
      }
    );
  }

  // Filtrar asignaturas según el tipo de usuario (estudiante o docente)
  filterUserAsignaturas() {
    this.userAsignaturas = []; // Limpiar las asignaturas anteriores del usuario

    if (this.userType === 'estudiante') {
      const estudianteId = Number(this.userId); // Asegurarse de que el ID sea un número
      // Filtrar asignaturas donde el ID del estudiante esté en el campo estudiantesId
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.estudiantesId.includes(estudianteId) // Verificar si el estudiante está inscrito
      );
    } else if (this.userType === 'docente') {
      const docenteId = Number(this.userId); // Asegurarse de que el ID sea un número
      // Filtrar asignaturas donde el docenteId coincida con el userId
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.docenteId === docenteId // Verificar si el docente enseña esta asignatura
      );
    }
  }

  // Función de logout
  logout() {
    localStorage.clear(); // Limpiar el localStorage
    this.router.navigate(['/login']); // Redirigir al login
  }
}
