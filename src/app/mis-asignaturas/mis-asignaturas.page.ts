import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {
  userId: string | null = null;
  userType: string | null = null;
  asignaturas: any[] = []; // Array para almacenar asignaturas
  userAsignaturas: any[] = []; // Array para almacenar las asignaturas del usuario

  constructor(private router: Router, private toastController: ToastController, private http: HttpClient) {}

  ngOnInit() {
    // Obtener el tipo de usuario y el ID del usuario desde localStorage
    this.userType = localStorage.getItem('userType');
    this.userId = localStorage.getItem('userId');

    // Redirigir al login si no hay tipo de usuario
    if (!this.userType || !this.userId) {
      this.router.navigate(['/login']);
    } else {
      this.loadAsignaturas(); // Cargar las asignaturas
    }
  }

  loadAsignaturas() {
    this.http.get<any[]>('http://localhost:3000/asignaturas').subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas;
        this.filterUserAsignaturas(); // Filtrar asignaturas según el tipo de usuario
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
      }
    );
  }

  filterUserAsignaturas() {
    if (this.userType === 'estudiante') {
      const estudiante = JSON.parse(localStorage.getItem('userId')!); // Obtener estudiante
      this.userAsignaturas = this.asignaturas.filter(asignatura => 
        asignatura.codigo === estudiante.asignaturasInscritas
      );
    } else if (this.userType === 'docente') {
      this.userAsignaturas = this.asignaturas.filter(asignatura => 
        asignatura.docenteId.toString() === this.userId
      );
    }
  }
}
