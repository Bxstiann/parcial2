import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

interface Asistencia {
  asistenciaId: string;
  fecha: string;
}

interface Asignatura {
  asignaturaId: string;
  asignaturaName: string;
  fecha: string;
  asistencias: Asistencia[];
  mostrarDetalles: boolean;
}

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {
  asignaturas: Asignatura[] = []; // Lista de asignaturas con sus respectivas asistencias
  userId: string | null = null;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      console.log('ID del estudiante recuperado:', this.userId);
      this.cargarAsistencias();
    } else {
      console.log('No se encontró un ID de usuario en el almacenamiento local');
      this.mostrarToast('Usuario no autenticado');
    }
  }

  cargarAsistencias() {
    this.http
      .get<{ [key: string]: any }>('https://bd-progra-9976e-default-rtdb.firebaseio.com/asistencias.json')
      .subscribe(
        (data) => {
          if (data) {
            const asistenciasArray = Object.values(data);

            this.asignaturas = asistenciasArray
              .map((asistencia: any) => ({
                ...asistencia,
                asignaturaName: asistencia.asignaturaName || 'Sin Nombre',
                mostrarDetalles: false,
                asistencias: asistencia.asistencias || [],
              }))
              .filter((asistencia: any) => String(asistencia.estudianteId) === String(this.userId));

            console.log('Asignaturas y asistencias filtradas:', this.asignaturas); // Verifica la carga de datos
          } else {
            this.asignaturas = [];
            console.log('No se encontraron asignaturas.');
          }
        },
        (error) => {
          console.error('Error al cargar las asistencias:', error);
          this.mostrarToast('Error al cargar las asistencias.');
        }
      );
  }

  toggleDetalle(index: number) {
    this.asignaturas[index].mostrarDetalles = !this.asignaturas[index].mostrarDetalles;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'danger',
      duration: 1200,
      position: 'middle',
    });
    await toast.present();
  }
}

