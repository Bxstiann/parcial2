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
  asignaturas: any[] = [];
  userAsignaturas: any[] = [];

  constructor(private router: Router, private toastController: ToastController, private http: HttpClient) {}

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.userId = localStorage.getItem('userId');

    if (!this.userType || !this.userId) {
      this.router.navigate(['/login']);
    } else {
      this.loadAsignaturas();
    }
  }

  loadAsignaturas() {
    this.http.get<any[]>('http://localhost:3000/asignaturas').subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas;
        this.filterUserAsignaturas();
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
      }
    );
  }

  filterUserAsignaturas() {
    if (this.userType === 'estudiante') {
      // Filtrar asignaturas por estudiantes
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.estudiantesId.includes(Number(this.userId))
      );
    } else if (this.userType === 'docente') {
      // Filtrar asignaturas por docente
      this.userAsignaturas = this.asignaturas.filter(asignatura =>
        asignatura.docenteId.includes(Number(this.userId))
      );
    }
  }
}
